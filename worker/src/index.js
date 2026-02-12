export default {
  fetch(request, env, ctx) {
    return new Response(
      JSON.stringify({
        ok: true,
        message: "Hello from Workers API",
        path: new URL(request.url).pathname
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};