// 2025-04-20 機能修正済みコード
const ALLOW_ORIGIN = 'https://aichatsurvice.girlfriend.jp';

function handleOptions(request) {
  // プリフライトリクエストへの応答
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': ALLOW_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }
    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id') || 'client_test';
    const value = await env["ai-chat-config"].get(clientId);

    if (!value) {
      return new Response('設定が見つかりません', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': ALLOW_ORIGIN
        }
      });
    }
    let config;
    try {
      config = JSON.parse(value);
    } catch (e) {
      return new Response('設定データが不正です', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': ALLOW_ORIGIN
        }
      });
    }
    return new Response(JSON.stringify(config, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': ALLOW_ORIGIN
      }
    });
  }
};
