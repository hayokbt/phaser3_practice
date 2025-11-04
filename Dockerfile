FROM node:18-alpine

WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトファイルをコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
