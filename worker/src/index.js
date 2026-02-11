import { getTemplate } from './templates.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS Headers for local development support
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS Preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // --- 1. AI Moderation API (OpenAI Integration) ---
        if (path === '/api/moderate' && request.method === 'POST') {
            try {
                const { text } = await request.json();

                // Call OpenAI Moderation API
                const response = await fetch('https://api.openai.com/v1/moderations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({ input: text })
                });

                const result = await response.json();
                // Check valid response structure
                if (!result.results || result.results.length === 0) {
                    throw new Error('Invalid API response');
                }

                const flagged = result.results[0].flagged;
                const categories = result.results[0].categories;

                return new Response(JSON.stringify({ flagged, categories }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            } catch (e) {
                console.error('Moderation Error:', e);
                return new Response(JSON.stringify({ error: 'Moderation Failed' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }

        // --- 2. Save Site Data (UUID Base + 3-Way Mapping) ---
        if (path === '/api/save' && request.method === 'POST') {
            try {
                const body = await request.json();
                const { slug, data, uuid, shortId } = body;

                if (!uuid || !data) {
                    return new Response(JSON.stringify({ error: 'Missing uuid or data' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders }
                    });
                }

                if (env.SITES_STORE) {
                    // 1. Save Main Data (Key: UUID)
                    await env.SITES_STORE.put(uuid, JSON.stringify(data));

                    // 2. Map ShortID to UUID (Key: shortid:[ID])
                    if (shortId) {
                        await env.SITES_STORE.put(`shortid:${shortId}`, uuid);
                    }

                    // 3. Map Slug to UUID (Key: slug:[slug])
                    if (slug) {
                        await env.SITES_STORE.put(`slug:${slug}`, uuid);
                    }
                    console.log(`Saved site with UUID: ${uuid}`);
                } else {
                    console.warn('SITES_STORE KV not bound.');
                }

                return new Response(JSON.stringify({
                    success: true,
                    uuid,
                    shortId,
                    url: `https://${url.hostname}/${slug || uuid}`
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });

            } catch (e) {
                console.error('Save Error:', e);
                return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }

        // --- 3. View Site (Routing Logic) ---
        let targetUuid = null;

        if (env.SITES_STORE) {
            if (path.startsWith('/u/')) {
                // A. Short ID Access (/u/ABCD)
                const shortId = path.split('/')[2];
                if (shortId) {
                    targetUuid = await env.SITES_STORE.get(`shortid:${shortId}`);
                }
            } else {
                // B. Standard Slug Access (/[shop-name])
                const slug = path.slice(1);
                if (slug && !slug.includes('.') && slug !== 'favicon.ico') {
                    // Try finding via Slug Mapping
                    targetUuid = await env.SITES_STORE.get(`slug:${slug}`);

                    // Compatibility: If no mapping, try falling back to legacy (slug=key) or direct UUID
                    if (!targetUuid) {
                        // Check if the slug IS the UUID or a Legacy Key?
                        // We can try to fetch data directly with the slug to see if it exists as a key.
                        // But we need the UUID to fetch data later if logic strictly requires UUID.
                        // In this flow, we set targetUuid = slug and let the next block try to fetch it.
                        const directData = await env.SITES_STORE.get(slug);
                        if (directData) {
                            targetUuid = slug;
                        }
                    }
                }
            }
        }

        // Render if data found
        if (targetUuid && env.SITES_STORE) {
            const dataStr = await env.SITES_STORE.get(targetUuid);

            if (dataStr) {
                const data = JSON.parse(dataStr);
                // Matches user request: getTemplate(theme, data)
                // Note: templates.js definition is getTemplate(slug, data), but first arg isn't critical.
                const html = getTemplate(data.theme || 'cream', data);
                return new Response(html, {
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8',
                        ...corsHeaders
                    }
                });
            }
        }

        return new Response('Cat Chat Worker is Running! Use /api/save to publish.', { status: 200 });
    }
};
