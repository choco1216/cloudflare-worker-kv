// 2025-04-20 完全新規テスト
export default {
  fetch() {
    return new Response("これは新しいテストです - Hello worldではありません", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
