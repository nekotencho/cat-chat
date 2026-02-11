
const FORM_CSS = `
/* Form Styles */
.p-form-container { padding: 30px 20px; background: #fff; margin: 40px auto; max-width: 500px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 2px solid #f0f0f0; }
.p-form-group { margin-bottom: 20px; text-align: left; }
.p-form-label { display: block; margin-bottom: 8px; font-size: 0.95rem; color: #444; font-weight: 700; }
.p-form-input, .p-form-textarea, .p-form-select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; background: #fafafa; transition: border 0.2s; }
.p-form-input:focus, .p-form-textarea:focus, .p-form-select:focus { border-color: #F4A261; outline: none; background: #fff; }
.p-form-btn { width: 100%; padding: 14px; background: #F4A261; color: #fff; border: none; border-radius: 50px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 4px 0 #D68C53; margin-top: 10px; }
.p-form-btn:hover { opacity: 0.9; transform: translateY(-2px); }
.p-form-select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 10px center; background-size: 1em; }
`;

const STYLES = {
    cream: `
/* CSS Variables */
:root {
    --color-bg-base: #FFF8EF;
    --color-bg-sub: #FFFDF9;
    /* ... existing vars ... */
    --color-bg-accent: #FEF0E3;
    --color-primary: #F4A261;
    --color-accent: #C97B3D;
    --color-text: #5C4A3D;
    --color-text-light: #8C7B6D;
    --color-placeholder: #EBDCCB;
    --font-base: "M PLUS Rounded 1c", sans-serif;
    --font-heading: "Kiwi Maru", serif;
    --radius-sm: 8px;
    --radius-md: 20px;
    --radius-lg: 30px;
    --width-content: 1100px;
    --width-narrow: 700px;
    --spacing-sm: 24px;
    --spacing-md: 48px;
    --spacing-lg: 80px;
}
${FORM_CSS}
    --color-bg-sub: #FFFDF9;
    --color-bg-accent: #FEF0E3;
    --color-primary: #F4A261;
    --color-accent: #C97B3D;
    --color-text: #5C4A3D;
    --color-text-light: #8C7B6D;
    --color-placeholder: #EBDCCB;
    --font-base: "M PLUS Rounded 1c", sans-serif;
    --font-heading: "Kiwi Maru", serif;
    --radius-sm: 8px;
    --radius-md: 20px;
    --radius-lg: 30px;
    --width-content: 1100px;
    --width-narrow: 700px;
    --spacing-sm: 24px;
    --spacing-md: 48px;
    --spacing-lg: 80px;
}
/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-base); color: var(--color-text); background-color: var(--color-bg-base); line-height: 1.9; font-weight: 400; letter-spacing: 0.05em; }
a { text-decoration: none; color: inherit; transition: opacity 0.3s, color 0.3s; }
ul { list-style: none; }
img { max-width: 100%; height: auto; display: block; border-radius: var(--radius-sm); }
h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: 500; line-height: 1.5; }
/* Utilities */
.container { max-width: var(--width-content); margin: 0 auto; padding: 0 32px; }
.narrow-container { max-width: var(--width-narrow); margin: 0 auto; padding: 0 32px; }
.section { padding: var(--spacing-lg) 0; }
.section-title { font-size: 1.8rem; text-align: center; margin-bottom: var(--spacing-md); color: var(--color-accent); }
/* SNS */
.info-sns { display: flex; gap: 20px; margin-top: 15px; }
.sns-icon { font-size: 1.4rem; color: var(--color-accent); transition: opacity 0.3s ease, transform 0.3s ease; display: inline-block; }
.sns-icon:hover { opacity: 0.7; transform: translateY(-2px); }
.sns-icon[href="#"], .sns-icon[href=""] { display: none; }
/* Header */
.header { height: 90px; display: flex; align-items: center; background-color: var(--color-bg-base); position: sticky; top: 0; z-index: 100; border-bottom: 2px solid rgba(244, 162, 97, 0.2); }
.header-inner { width: 100%; display: flex; justify-content: space-between; align-items: center; }
.logo { font-family: var(--font-heading); font-size: 1.6rem; color: var(--color-accent); }
.nav ul { display: flex; gap: 32px; }
.nav a { color: var(--color-text); font-size: 0.95rem; }
.nav a:hover { color: var(--color-primary); }
/* Hero */
.hero { padding: 60px 0 0; text-align: center; position: relative; overflow: hidden; }
.hero-title { font-size: 2.2rem; color: var(--color-accent); margin-bottom: 16px; }
.hero-catch { font-size: 1.1rem; color: var(--color-text-light); margin-bottom: 48px; letter-spacing: 0.1em; }
.hero-image-placeholder { width: 100%; max-width: 900px; height: 450px; background-color: var(--color-placeholder); margin: 0 auto; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; position: relative; z-index: 1; overflow: hidden; }
.hero-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.wave-separator { line-height: 0; margin-top: -60px; position: relative; z-index: 2; }
.wave-separator svg { width: 100%; height: 120px; }
/* About */
.about { text-align: center; }
.about-text { font-size: 1.05rem; text-align: center; line-height: 2.0; white-space: pre-wrap; }
/* Service */
.service { padding-bottom: 120px; }
.service-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 56px; align-items: stretch; }
.service-card { background-color: #fff; padding: 24px; border-radius: var(--radius-md); box-shadow: 0 8px 24px rgba(220, 200, 180, 0.2); text-align: center; transition: none; cursor: default; display: flex; flex-direction: column; width: 100%; min-width: 0; }
.service-image-placeholder { width: 100%; aspect-ratio: 1 / 1; background-color: var(--color-placeholder); border-radius: var(--radius-md); margin-bottom: 20px; overflow: hidden; }
.service-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.service-card-title { font-size: 1.25rem; color: var(--color-accent); margin-bottom: 12px; }
.service-desc { font-size: 0.95rem; color: var(--color-text-light); line-height: 1.8; }
/* Info */
.wave-separator-top, .wave-separator-bottom { line-height: 0; }
.wave-separator-top svg, .wave-separator-bottom svg { width: 100%; height: 80px; }
.info { background-color: rgba(246, 201, 166, 0.3); padding: 20px 0; }
.info-box { background-color: rgba(255, 255, 255, 0.6); padding: 40px; border-radius: var(--radius-lg); border: 2px dashed rgba(244, 162, 97, 0.4); max-width: 900px; margin: 0 auto; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.info-label { font-size: 1rem; color: var(--color-accent); margin-bottom: 12px; display: inline-block; border-bottom: 2px solid var(--color-primary); padding-bottom: 4px; }
.info-value { font-size: 1.05rem; white-space: pre-wrap; }
.contact-em { font-size: 1.6rem; font-family: var(--font-heading); color: var(--color-accent); letter-spacing: 0.1em; }
.note { font-size: 0.85rem; color: var(--color-text-light); }
.btn-primary { display: inline-block; margin-top: 16px; background-color: var(--color-primary); color: #fff; padding: 14px 40px; border-radius: 50px; font-size: 1rem; box-shadow: 0 4px 0 #D68C53; transition: transform 0.1s, box-shadow 0.1s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(244, 162, 97, 0.3); }
/* Access */
.access { text-align: center; }
.access-address { font-style: normal; font-size: 1.1rem; margin-bottom: 32px; display: block; white-space: pre-wrap; }
.map-placeholder { width: 100%; max-width: 900px; height: 350px; background-color: #E6E1D8; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: #fff; margin: 0 auto; }
/* Footer */
.footer { background-color: #6D5C50; color: #fff; padding: 40px 0; text-align: center; }
.footer-logo { font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 8px; }
.footer-copy { font-size: 0.8rem; opacity: 0.7; }
/* Responsive */
@media (max-width: 768px) {
  .hero-title { display: none; }
  .service-grid { grid-template-columns: 1fr; gap: 24px; justify-items: center; }
  .service-card { width: min(92%, 420px); margin: 0 auto; }
  .hero-title { font-size: 1.8rem; }
  .hero-image-placeholder { height: 300px; }
  .info-grid { grid-template-columns: 1fr; gap: 40px; }
  .header-inner { flex-direction: column; gap: 16px; padding: 16px; }
  .header-inner { align-items: center; }
  .nav { width: 100%; display: flex; justify-content: center; }
  .nav ul { width: 100%; justify-content: center; }
  .nav ul { gap: 20px; font-size: 0.9rem; }
  .wave-separator { margin-top: -30px; }
  .header { height: auto; position: static; }
}
`,

    simple: `
/* Simplified Simple Theme CSS */
:root { --color-bg: #FFFFFF; --color-text: #333333; --color-accent: #6B8E9E; --color-bg-secondary: #F8FAFB; --color-border: #EAEAEA; --color-placeholder: #E0E0E0; --font-base: "Noto Sans JP", sans-serif; --width-content: 1100px; --width-narrow: 800px; --spacing-md: 32px; --spacing-lg: 64px; }
${FORM_CSS}
/* Simple Theme Overrides for Form */
.p-form-container { background: #fff; border: 1px solid #EAEAEA; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.p-form-btn { background: var(--color-accent); box-shadow: none; border-radius: 4px; }

body { font-family: var(--font-base); color: var(--color-text); background-color: var(--color-bg); line-height: 1.8; font-weight: 400; font-size: 16px; }

a { text-decoration: none; color: inherit; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3 { font-weight: 500; letter-spacing: 0.05em; }
.container { max-width: var(--width-content); margin: 0 auto; padding: 0 var(--spacing-md); }
.narrow-container { max-width: var(--width-narrow); margin: 0 auto; padding: 0 var(--spacing-md); }
.section { padding: var(--spacing-lg) 0; }
.header { height: 80px; display: flex; align-items: center; position: sticky; top: 0; background: rgba(255, 255, 255, 0.95); z-index: 100; border-bottom: 1px solid var(--color-border); }
.header-inner { width: 100%; display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.5rem; font-weight: 700; }
.nav ul { display: flex; gap: var(--spacing-md); }
.hero { padding: var(--spacing-lg) 0; text-align: center; }
.hero-title { font-size: 2.5rem; margin-bottom: 16px; font-weight: 700; }
.hero-catch { font-size: 1.1rem; margin-bottom: 48px; color: #333; }
.hero-image-placeholder { width: 100%; height: 500px; background-color: var(--color-placeholder); display: flex; align-items: center; justify-content: center; color: #999; border-radius: 4px; overflow: hidden; }
.hero-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.about { background-color: var(--color-bg-secondary); text-align: center; }
.about-text { text-align: center; line-height: 2.0; white-space: pre-wrap; }
.service { background-color: var(--color-bg); }
.service-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 56px; align-items: stretch; }
.service-card { text-align: left; width: 100%; min-width: 0; }
.service-image-placeholder { width: 100%; aspect-ratio: 4 / 3; background-color: var(--color-placeholder); margin-bottom: 16px; border-radius: 4px; overflow: hidden; }
.service-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.service-title { font-size: 1.25rem; margin-bottom: 8px; color: var(--color-accent); }
.service-desc { font-size: 1rem; color: #333; line-height: 1.6; }
.info { background-color: var(--color-bg-secondary); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.info-title { font-size: 1.1rem; margin-bottom: 16px; text-transform: uppercase; color: #444; font-weight: 700; }
.info-content { font-size: 1rem; white-space: pre-wrap; }
.button { display: inline-block; background-color: var(--color-accent); color: #fff; padding: 12px 32px; border-radius: 2px; font-size: 0.9rem; margin-top: 16px; }
.access { text-align: center; }
.access-address { font-style: normal; margin-bottom: 32px; font-size: 1.1rem; white-space: pre-wrap; }
.map-placeholder { width: 100%; max-width: 900px; margin: 0 auto; height: 400px; background-color: #DDE2E6; display: flex; align-items: center; justify-content: center; color: #fff; }
.footer { padding: 32px 0; text-align: center; border-top: 1px solid var(--color-border); }
.footer-logo { font-weight: 700; margin-bottom: 8px; }
.footer-copy { font-size: 0.8rem; color: #666; }
.info-sns { display: flex; gap: 20px; margin-top: 15px; }
.sns-icon { font-size: 1.4rem; color: var(--color-text); }
.sns-icon:hover { opacity: 0.7; }
@media (max-width: 768px) { .hero-title { display:none; } .service-grid { grid-template-columns: 1fr; gap:24px; justify-items:center; } .service-card { width:min(92%,420px); margin:0 auto; } .info-grid { grid-template-columns: 1fr; gap: 32px; } .hero-image-placeholder { height: 300px; } .header-inner { flex-direction: column; gap: 16px; padding: 16px; align-items:center; } .nav { width:100%; display:flex; justify-content:center; } .nav ul { width:100%; justify-content:center; } .header { height: auto; position: static; } }
`,
    blue: `
/* Simplified Blue Theme CSS */
:root { --color-primary: #2F5FA7; --color-secondary: #6EC6E9; --color-bg-body: #FFFFFF; --color-bg-light: #F4F8FB; --color-text-main: #333333; --color-text-sub: #444444; --color-border: #DAE1E8; --color-placeholder: #E8EDF2; --font-base: "Noto Sans JP", sans-serif; --width-content: 1100px; --width-narrow: 800px; --spacing-md: 32px; --spacing-lg: 64px; }
body { font-family: var(--font-base); color: var(--color-text-main); background-color: var(--color-bg-body); line-height: 1.7; font-weight: 400; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; height: auto; display: block; }
h1, h2, h3, h4 { font-weight: 500; line-height: 1.4; }
.container { max-width: var(--width-content); margin: 0 auto; padding: 0 var(--spacing-md); }
.narrow-container { max-width: var(--width-narrow); margin: 0 auto; padding: 0 var(--spacing-md); }
.section { padding: 100px 0; }
.section-title { font-size: 1.5rem; text-align: center; margin-bottom: 64px; color: var(--color-primary); position: relative; letter-spacing: 0.05em; }
.section-title::after { content: ''; display: block; width: 40px; height: 2px; background-color: var(--color-secondary); margin: 16px auto 0; }
.header { height: 80px; display: flex; align-items: center; border-bottom: 2px solid var(--color-primary); background-color: #fff; position: sticky; top: 0; z-index: 100; }
.header-inner { width: 100%; display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.4rem; color: var(--color-primary); font-weight: 700; }
.nav ul { display: flex; gap: 32px; }
.nav a { font-size: 1rem; color: var(--color-text-main); }
.nav a:hover { color: var(--color-primary); }
.hero { background-color: var(--color-bg-light); padding: 64px 0; text-align: center; }
.hero-content { margin-bottom: 64px; }
.hero-title { font-size: 2.2rem; margin-bottom: 16px; color: var(--color-primary); font-weight: 700; }
.hero-catch { font-size: 1.1rem; color: var(--color-text-sub); }
.hero-image-placeholder { width: 100%; height: 480px; background-color: #E2E8EE; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #99AABB; overflow: hidden; }
.hero-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.about { background-color: #fff; text-align: center; }
.about-text { font-size: 1.05rem; line-height: 2; text-align: center; white-space: pre-wrap; }
.service { background-color: var(--color-bg-light); }
.service-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 56px; align-items: stretch; }
.service-card { background: #fff; padding: 32px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02); border: 1px solid rgba(47, 95, 167, 0.05); width: 100%; min-width: 0; }
.service-image-placeholder { width: 100%; aspect-ratio: 16 / 9; background-color: var(--color-placeholder); margin-bottom: 32px; border-radius: 2px; overflow: hidden; }
.service-image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.service-card-title { font-size: 1.2rem; color: var(--color-primary); margin-bottom: 16px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; display: inline-block; }
.service-desc { font-size: 1rem; color: var(--color-text-sub); line-height: 1.6; }
.info { padding: 64px 0; }
.info-box { border: 1px solid var(--color-primary); padding: 64px; border-radius: 4px; background-color: #fff; max-width: 900px; margin: 0 auto; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.info-label { font-size: 0.9rem; color: var(--color-secondary); text-transform: uppercase; margin-bottom: 16px; font-weight: 700; }
.info-value { font-size: 1rem; margin-bottom: 8px; white-space: pre-wrap; }
.contact-highlight { font-size: 1.4rem; font-weight: 500; color: var(--color-primary); }
.btn-primary { display: inline-block; background-color: var(--color-primary); color: #fff; padding: 12px 36px; border-radius: 50px; }
.access { background-color: var(--color-bg-light); text-align: center; }
.access-address { font-style: normal; font-size: 1.1rem; margin-bottom: 32px; white-space: pre-wrap; }
.map-placeholder { width: 100%; max-width: 900px; margin: 0 auto; height: 400px; background-color: #DDE2E6; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; }
.footer { background-color: var(--color-primary); color: #fff; padding: 64px 0 32px; text-align: center; }
.footer-logo { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.footer-copy { font-size: 0.9rem; opacity: 1; border-top: 1px solid rgba(255, 255, 255, 0.3); padding-top: 32px; display: inline-block; width: 100%; max-width: var(--width-content); }
.info-sns { display: flex; gap: 20px; margin-top: 15px; }
.sns-icon { font-size: 1.4rem; color: var(--color-primary); }
@media (max-width: 768px) { .hero-title { display:none; } .service-grid { grid-template-columns: 1fr; gap:24px; justify-items:center; } .service-card { width:min(92%,420px); margin:0 auto; } .info-grid { grid-template-columns: 1fr; gap: 40px; } .hero-image-placeholder { height: 280px; } .header-inner { flex-direction: column; gap: 16px; padding: 16px; align-items:center; } .nav { width:100%; display:flex; justify-content:center; } .nav ul { width:100%; justify-content:center; } .header { height: auto; position: static; } .info-box { padding: 24px; border: none; } }
${FORM_CSS}
/* Blue Theme Overrides */
.p-form-container { border: 2px solid var(--color-secondary); box-shadow: none; }
.p-form-btn { background: var(--color-primary); box-shadow: none; }
`
};

export function getTemplate(slug, data) {
    let theme = 'cream';
    if (data.template) {
        if (data.template.includes('blue')) theme = 'blue';
        if (data.template.includes('simple')) theme = 'simple';
    }

    const css = STYLES[theme];
    const bookingModalCss = `
.booking-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}
.booking-modal.is-open {
    display: flex;
}
.booking-modal-dialog {
    width: min(720px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 20px;
}
.booking-modal-close {
    position: sticky;
    top: 0;
    margin-left: auto;
    display: block;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #f0f0f0;
    color: #333;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    z-index: 2;
}
body.booking-modal-open {
    overflow: hidden;
}
.contact-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
}
.contact-modal.is-open {
    display: flex;
}
.contact-modal-dialog {
    width: min(720px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 20px;
}
.contact-modal-close {
    position: sticky;
    top: 0;
    margin-left: auto;
    display: block;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #f0f0f0;
    color: #333;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    z-index: 2;
}
body.contact-modal-open {
    overflow: hidden;
}
button.btn-primary {
    border: none;
    outline: none;
}
button.btn-primary:focus,
button.btn-primary:focus-visible {
    outline: none;
    box-shadow: none;
}
`;

    // Helper to render services
    const renderService = (idx) => {
        const title = data[`service${idx}Title`];
        if (!title || title === 'なし') return '';
        const desc = data[`service${idx}Desc`] || '';
        const imgParams = data[`service${idx}Image`];

        let imgHtml = '';
        if (imgParams) {
            imgHtml = `<div class="service-image-placeholder"><img src="${imgParams}" alt="${title}"></div>`;
        } else {
            imgHtml = `<div class="service-image-placeholder"></div>`;
        }

        return `
            <div class="service-card">
                ${imgHtml}
                <h4 class="service-card-title">${title}</h4>
                <p class="service-desc">${desc}</p>
            </div>
        `;
    };

    // Helper for SNS
    const renderSns = () => {
        let html = '';
        if (data.snsInstagram) html += `<a href="${data.snsInstagram}" class="sns-icon" target="_blank"><i class="fa-brands fa-instagram"></i></a>`;
        if (data.snsX) html += `<a href="${data.snsX}" class="sns-icon" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>`;
        if (data.snsFacebook) html += `<a href="${data.snsFacebook}" class="sns-icon" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>`;
        return html ? `<div class="info-sns">${html}</div>` : '';
    };

    // Helper for Contact Form
    const renderContactForm = () => {
        if (data.formContact !== '設置する') return '';
        return `
        <div id="contact-modal" class="contact-modal" aria-hidden="true">
            <div class="contact-modal-dialog" role="dialog" aria-modal="true" aria-label="お問い合わせフォーム">
                <button type="button" class="contact-modal-close" data-contact-close aria-label="閉じる">×</button>
                <div class="p-form-container" id="contact-form" style="margin-top:0;">
                    <h3 style="text-align:center; margin-bottom:20px; color:var(--color-accent); font-family:var(--font-heading);">お問い合わせ</h3>
                    <form action="#" method="post" onsubmit="event.preventDefault(); alert('デモサイトのため送信されません。');">
                        <div class="p-form-group">
                            <label class="p-form-label">お名前</label>
                            <input type="text" class="p-form-input" placeholder="例) 山田 太郎" required>
                        </div>
                        <div class="p-form-group">
                            <label class="p-form-label">メールアドレス</label>
                            <input type="email" class="p-form-input" placeholder="example@email.com" required>
                        </div>
                        <div class="p-form-group">
                            <label class="p-form-label">お問い合わせ内容</label>
                            <textarea class="p-form-textarea" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="p-form-btn">送信する</button>
                    </form>
                </div>
            </div>
        </div>
        `;
    };

    // Helper for Booking Form
    const renderBookingForm = () => {
        if (!data.isPaid || data.isPaid === 'false') return '';

        const interval = data.bookingInterval || '15分単位';
        const isMulti = data.bookingFormat === '第3希望まで聞く' || !data.bookingFormat; // Default true
        const closed = data.bookingClosedDays || 'なし';

        // Time Options Generation
        let timeInputHtml = '';
        if (interval === '1時間単位' || interval === '30分単位') {
            let hourOpts = '<option value="">--</option>';
            for (let h = 0; h < 24; h++) {
                const hh = h.toString().padStart(2, '0');
                hourOpts += `<option value="${hh}">${hh}</option>`;
            }
            let minOpts = '<option value="00">00</option>';
            if (interval === '30分単位') {
                minOpts += '<option value="30">30</option>';
            }
            timeInputHtml = `
              <div style="flex:1; display:flex; align-items:center; gap:5px;">
                 <select class="p-form-input" required style="padding:12px 5px; text-align:center;">${hourOpts}</select>
                 <span>:</span>
                 <select class="p-form-input" required style="padding:12px 5px; text-align:center;">${minOpts}</select>
              </div>`;
        } else {
            timeInputHtml = `<input type="time" class="p-form-input" required style="flex:1;">`;
        }

        // Questions Loop
        let dateInputsHtml = '';
        const count = isMulti ? 3 : 1;
        for (let i = 1; i <= count; i++) {
            dateInputsHtml += `
             <div class="p-form-group" style="padding-bottom: 20px; border-bottom: 1px dashed #eee;">
                 <label class="p-form-label">第${i}希望日時 <span style="color:red">*</span></label>
                 <div style="display:flex; gap:10px;">
                     <input type="date" class="p-form-input" required style="flex:2;">
                     ${timeInputHtml}
                 </div>
             </div>`;
        }

        return `
        <div id="booking-modal" class="booking-modal" aria-hidden="true">
            <div class="booking-modal-dialog" role="dialog" aria-modal="true" aria-label="Web予約フォーム">
                <button type="button" class="booking-modal-close" data-booking-close aria-label="閉じる">×</button>
                <div class="p-form-container" id="booking-form" style="margin-top:0;">
            <h3 style="text-align:center; margin-bottom:20px; color:var(--color-accent); font-family:var(--font-heading);">Web予約</h3>
            
            <div style="font-size:0.9em; color:#666; margin-bottom:25px; line-height:1.6; background:#f9f9f9; padding:15px; border-radius:6px;">
                 <strong>営業時間:</strong> ${data.bookingHours || data.scheduleLine1 || '9:00 - 18:00'}<br>
                 <strong>定休日:</strong> ${closed}<br>
                 <span style="display:block; margin-top:8px; font-size:0.85em; color:#888;">${(data.bookingDeadline || '').replace(/\n/g, '<br>')}</span>
            </div>
            
            ${data.reservationRules ? `
            <div style="font-size:0.9em; margin-bottom:30px; line-height:1.6; padding:0 5px;">
                ${data.reservationRules.replace(/\n/g, '<br>')}
            </div>` : ''}

            <form action="#" method="post" onsubmit="event.preventDefault(); alert('デモサイトのため送信されません。');">
                ${dateInputsHtml}

                <div class="p-form-group">
                    <label class="p-form-label">人数</label>
                    <select class="p-form-select">
                        <option>1名</option>
                        <option>2名</option>
                        <option>3名以上</option>
                    </select>
                </div>
                
                <div class="p-form-group">
                    <label class="p-form-label">お名前 <span style="color:red">*</span></label>
                    <input type="text" class="p-form-input" placeholder="例) 山田 花子" required>
                </div>
                
                <div class="p-form-group">
                    <label class="p-form-label">電話番号 <span style="color:red">*</span></label>
                    <input type="tel" class="p-form-input" placeholder="例) 090-1234-5678" required>
                </div>
                
                <div class="p-form-group">
                    <label class="p-form-label">備考欄</label>
                    <textarea class="p-form-textarea" rows="3" placeholder="ご要望などあればご記入ください"></textarea>
                </div>

                <button type="submit" class="p-form-btn">予約リクエストを送信</button>
            </form>
                </div>
            </div>
        </div>
        `;
    };

    // Helper for Address
    const address = data.address || '';
    const mapEmbedUrl = address
        ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&t=m&z=15`
        : '';
    const mapSearchUrl = address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : '';

    // Helper for Hours/Contact
    const hours = data.schedule
        || [data.scheduleLine1, data.scheduleLine2, data.scheduleLine3].filter(Boolean).join('\n');
    const phone = data.contact || '';
    const lineId = data.lineId ? `LINE: ${data.lineId}` : '';

    return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.shopName || 'Store'}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@300;400;500&family=M+PLUS+Rounded+1c:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${css}
        ${bookingModalCss}
    </style>
</head>
<body>
    <header class="header">
        <div class="container header-inner">
            <h1 class="logo">${data.shopName || 'Store Name'}</h1>
            <nav class="nav">
                <ul>
                    <li><a href="#service">Service</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#access">Access</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container hero-inner">
                ${theme === 'cream' ? '<div class="hero-content">' : ''}
                ${theme === 'blue' ? '<div class="hero-content">' : ''}
                
                <h2 class="hero-title">${data.shopName || 'Store Name'}</h2>
                <p class="hero-catch">${(data.catchCopy || '').replace(/\n/g, '<br>')}</p>
                
                ${(theme === 'cream' || theme === 'blue') ? '</div>' : ''}
                
                <div class="hero-image-placeholder">
                    ${data.heroImage ? `<img src="${data.heroImage}" alt="Main">` : '<span>Main Image</span>'}
                </div>
            </div>
            ${theme === 'cream' ? `<div class="wave-separator-top" style="margin-top:-60px; pointer-events:none;"><svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path fill="#F6C9A6" fill-opacity="0.3" d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg></div>` : ''}
        </section>

        <section id="about" class="section about">
            <div class="container narrow-container">
                <h3 class="section-title">About</h3>
                <p class="about-text">${(data.introduction || '').replace(/\n/g, '<br>')}</p>
            </div>
        </section>

        <section id="service" class="section service">
            <div class="container">
                <h3 class="section-title">Service</h3>
                <div class="service-grid">
                    ${renderService(1)}
                    ${renderService(2)}
                    ${renderService(3)}
                </div>
            </div>
        </section>

        <section id="contact" class="section info">
             ${theme === 'cream' ? '<div class="container narrow-container"><div class="info-box">' : '<div class="container narrow-container"><div class="info-box" style="border:none; padding:0; background:transparent;">'}
             ${theme === 'blue' || theme === 'simple' ? '<div class="info-box">' : ''}
             
                <div class="info-grid">
                    <div class="info-item">
                        <h4 class="info-label">Open / SNS</h4>
                        <p class="info-value">${hours.replace(/\n/g, '<br>')}</p>
                        ${renderSns()}
                    </div>
                    <div class="info-item">
                        <h4 class="info-label">Contact</h4>
                        <p class="info-value contact-em" style="${theme !== 'cream' ? 'font-size:1.4rem;' : ''}">${phone}</p>
                        <p class="info-sub">${lineId}</p>
                        <div style="display:flex; flex-direction:column; gap:10px; align-items:flex-start;">
                            ${data.formContact === '設置する' ? '<button type="button" id="contact-open-btn" class="btn-primary">お問合せ</button>' : ''}
                            ${(data.isPaid || data.isPaid === 'true') ? `<button type="button" id="booking-open-btn" class="btn-primary" style="background:${theme === 'simple' ? '#555' : '#E76F51'};">Web予約する</button>` : ''}
                        </div>
                    </div>
                </div>
                
                ${renderContactForm()}
                ${renderBookingForm()}

             ${(theme === 'cream' || theme === 'blue' || theme === 'simple') ? '</div>' : ''}
             ${theme === 'cream' ? '</div>' : ''}
        </section>
        
        ${theme === 'cream' ? `<div class="wave-separator-bottom"><svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path fill="#F6C9A6" fill-opacity="0.3" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg></div>` : ''}

        <section id="access" class="section access">
            <div class="container narrow-container">
                <h3 class="section-title">Access</h3>
                <address class="access-address">${address.replace(/\n/g, '<br>')}</address>
                <div class="map-placeholder">
                    ${mapEmbedUrl ? `
                    <div style="position:relative; width:100%; height:100%;">
                        <iframe
                            width="100%"
                            height="100%"
                            frameborder="0"
                            style="border:0;"
                            src="${mapEmbedUrl}"
                            loading="lazy"
                            allowfullscreen>
                        </iframe>
                        <div style="position:absolute; bottom:0; left:0; width:100%; background:rgba(255,255,255,0.9); padding:6px; text-align:center; border-top:1px solid #ddd;">
                            <a href="${mapSearchUrl}" target="_blank" rel="noopener" style="color:#007bff; font-weight:bold; text-decoration:none; font-size:0.9em;">
                                Googleマップで開く
                            </a>
                        </div>
                    </div>
                    ` : '<span>Google Maps Placeholder</span>'}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container footer-inner">
            <p class="footer-logo">${data.shopName || 'Store'}</p>
            <p class="footer-copy">&copy; ${new Date().getFullYear()} ${data.shopName || 'Store'}. All Rights Reserved.</p>
        </div>
    </footer>
    <script>
    (() => {
        const bindModal = (openBtnId, modalId, closeSelector, bodyClass) => {
            const openBtn = document.getElementById(openBtnId);
            const modal = document.getElementById(modalId);
            if (!openBtn || !modal) return null;

            const closeModal = () => {
                modal.classList.remove('is-open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove(bodyClass);
            };

            openBtn.addEventListener('click', () => {
                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add(bodyClass);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.closest(closeSelector)) {
                    closeModal();
                }
            });
            return { modal, closeModal };
        };

        const booking = bindModal('booking-open-btn', 'booking-modal', '[data-booking-close]', 'booking-modal-open');
        const contact = bindModal('contact-open-btn', 'contact-modal', '[data-contact-close]', 'contact-modal-open');

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (booking && booking.modal.classList.contains('is-open')) booking.closeModal();
            if (contact && contact.modal.classList.contains('is-open')) contact.closeModal();
        });
    })();
    </script>
</body>
</html>
    `;
}
