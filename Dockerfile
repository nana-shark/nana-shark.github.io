# Node.js の公式イメージをベースにする
# LTS (長期サポート) バージョンを使用することを推奨
FROM node:20-slim

# アプリケーションの作業ディレクトリを作成
WORKDIR /usr/src/app

# package.json と package-lock.json (存在する場合) をコピーして、依存関係をインストール
# これにより、依存関係が変更されない限り、層のキャッシュが利用され、ビルドが高速化される
# このステップは、npm install を実行する前に package.json が存在することを保証します。
COPY package*.json ./
RUN npm install --omit=dev

# アプリケーションのソースコードをコピー
# 今回はindex.htmlとscript.jsもapp.jsと同じ階層に配置するため、まとめてコピー
COPY . .

# アプリケーションがリッスンするポートを公開
# Cloud Run は PORT 環境変数を使用するため、8080はデフォルトの推奨ポート
ENV PORT 8080
EXPOSE ${PORT}

# アプリケーションを起動するコマンド
CMD [ "node", "app.js" ]