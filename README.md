# poroto

## 環境構築

### nodeのインストール
- 特定のバージョンのgoを使用するために[nodenv](https://github.com/nodenv/nodenv)を利用しています。
- [インストール方法はこちらを参考にしてください](https://github.com/nodenv/nodenv#locating-the-node-installation)
```shell
# nodeをインストール
# (App Engineのバージョンに合わせたランタイムにしています)
nodenv install 20.2.0

# バージョンを指定
nodenv global 20.2.0

# バージョンを確認
nodenv version
# 20.2.0 (set by /home/zacker/.nodenv/version)

node --version
# v20.2.0
```
### yarn（パッケージマネージャー）のインストール
```shell
npm install -g yarn
```

### セットアップ方法

```shell
yarn install
```

### シークレットの復元

- `poroto`で使用するシークレットは[poroto-app/infrastructure](https://github.com/poroto-app/infrastructure)で管理されています
- `scipts/decrypt.sh`
  を実行することで復元できます
    - ※ [事前に gcloud をインストールする必要があります](https://cloud.google.com/sdk/docs/install?hl=ja）

### シークレット（.env.local等）変更時

- 暗号化し、[poroto-app/infrastructure](https://github.com/poroto-app/infrastructure)で管理してください
- `scripts/encrypt.sh` を実行することで暗号化できます

## 起動方法

```shell
yarn dev
```

### 環境を指定してビルド & 起動する
```shell
ENV=your-env yarn build-env
# ENV=staging yarn build-env

PORT=3000 yarn start
```

## ディレクトリ構造

- `src/`: アプリケーションコード
- `docs/`: 仕様書などのドキュメント

## デプロイ方法
- 本プロジェクトは Google Cloud　の App Engineにデプロイされる

1. gcloud CLIをインストールする
   - Google Cloudのリソース管理やデプロイができるCLI
2. gcloudの初期化
   ```shell
   # OAuthログイン
   gcloud auth login
   
   # gcloud cliに紐付いたアカウントを表示
   gcloud auth list
   
   # プロジェクトを管理しているアカウントをセット
   gcloud config set account XXX@poroto.app
   
   # プロジェクトを指定
   gcloud config set project プロジェクトID
   ```
3. スクリプトを実行
    ```shell
    yarn deploy
    ```