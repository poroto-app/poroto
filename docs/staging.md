# Staging
## ビルド方法
- NextJSはstaging環境を利用することができない
  - [`production`,`development`, `test`のみを認識する](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order)
- そのため、`env-cmd`というライブラリを用いてstaging用のenvファイルを読み込むようにしている

- ビルド
    ```shell
    ENV=staging yarn gcp-build
    ```

- 起動
    ```shell
    ENV=staging PORT=3000 yarn start
    ```