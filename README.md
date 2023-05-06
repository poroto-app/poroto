# poroto

## 環境構築

### セットアップ方法

```shell
yarn install
```

### シークレットの復元

- `poroto`で使用するシークレットは[poroto-app/infrastructure](https://github.com/poroto-app/infrastructure)で管理されています
- `scipts/decrypt.sh`
  を実行することで復元できます
    - ※ [事前に gcloud をインストールする必要があります](https://cloud.google.com/sdk/docs/install?hl=ja）
    - ※スクリプトの最初の行のコメントアウトを外して実行してください

### シークレット（.env.local等）変更時

- 暗号化し、[poroto-app/infrastructure](https://github.com/poroto-app/infrastructure)で管理してください
- `scripts/encrypt.sh` を実行することで暗号化できます

### 起動方法

```shell
yarn dev
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