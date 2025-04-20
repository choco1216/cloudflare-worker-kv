// 2025-04-20完全新規テスト - hello worldではなく明確に違う応答を返すコード
export default {
  fetch() {
    return new Response("これは新しいテストです - Hello worldではありません", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
