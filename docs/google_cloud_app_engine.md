# Google App Engine

## 概要
- poroto, plannerはGoogle App Engine上にデプロイされ、運用されている

## デプロイ先
|サービス名|バージョン|Google Cloud Project|
|---|---|---|
|poroto|production|poroto-379005|
|planner|production|poroto-staging|
|poroto|staging|poroto-staging|
|planner|staging|poroto-staging|

※ planner では無料枠を利用するために、staging環境を利用している

## Dispatch
- `xxx.komichi.app`というエンドポイントに来たリクエストをどのサービスに割り振るかを決める
- github actionsの`deploy_workflow.yaml`でこれを行っている。
- また、`dispatch.yaml`というファイルで割り当てを定義する。
- このとき、このファイルの名前を`dispatch-xxx.yaml`とすると割り当てを定義したファイルとして認識されない
- 従って、環境ごとに割り当て定義を分けるために`dispatch-env.yaml`という形式でファイルを作成し、github actionsの中で、それらのファイルを`dispatch.yaml`としてコピーして割り当てを行っている