### 修正の概要
<!--　
    XXの機能を作成した
    UIの修正であればスクリーンショットがあるとわかりやすい
-->
<!--
|before| after |
|---|-------|
|||
-->

### 関連する Issue・PR
```
【マージ条件】関連する項目がすべてCloseされている
```
<!--
- close #0
- #0
-->

### 変更の種類
- [ ] バグの修正 (破壊的でない変更)
- [ ] 新しい機能の追加
- [ ] 改善 (クリーンアップや機能改善)
- [ ] 破壊的な修正 (既存の機能を修正する必要があるもの)
- [ ] ドキュメントの追加・修正

### 修正の目的・解決したこと
<!--　YYの操作を行いやすくするため -->

### どのようにテストされているか
<!--　単体テストを作成した -->
- [ ] プランが表示されていることを確認
- [ ] プランが作成できることを確認
- [ ] プランが保存できることを確認
- [ ]

```shell
# poroto
export BRANCH_POROTO=
git fetch origin $BRANCH_POROTO
git checkout $BRANCH_POROTO
git pull origin $BRANCH_POROTO
yarn install
yarn dev
```
```shell
# planner
export BRANCH_PLANNER=develop
git branch -D $BRANCH_PLANNER
git fetch origin $BRANCH_PLANNER
git checkout $BRANCH_PLANNER
go run cmd/server/main.go
````