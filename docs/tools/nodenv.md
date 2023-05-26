# nodenv
- https://github.com/nodenv/nodenv

## nodenvを使う目的
バージョンを簡単に切り替えられるようにするため

## トラブルシューティング
### `nodenv install --list`で欲しいバージョンが見当たらない
A: nodenv, node-buildのバージョンを上げると解決することがあります。
```shell
brew upgrade nodenv node-build

git -C $HOME/.nodenv/plugins/node-build pull
```