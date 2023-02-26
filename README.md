# poroto

## セットアップ方法
```shell
yarn install
```

## 起動方法
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