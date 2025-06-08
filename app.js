const express = require('express');
const path = require('path');
const app = express();
// ここが重要：Cloud RunはPORT環境変数を使用しますが、ローカル実行時は8080がデフォルト
const port = process.env.PORT || 8080; 

// 静的ファイルを配信するためのミドルウェア
// __dirname は現在のスクリプトファイルが存在するディレクトリを指します
app.use(express.static(path.join(__dirname)));

// ルート ("/") へのGETリクエストに対して index.html を返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Access it by visiting http://localhost:${port}`);
});