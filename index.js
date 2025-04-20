// force redeploy
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id') || 'client_test';
    const value = await env["ai-chat-config"].get(clientId);

    if (!value) {
      return new Response('設定が見つかりません', { status: 404 });
    }
    let config;
    try {
      config = JSON.parse(value);
    } catch (e) {
      return new Response('設定データが不正です', { status: 500 });
    }
    return new Response(JSON.stringify(config), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
