# CIがproductionデプロイ時に復号するためのスクリプト

# ローカルで実行するときはこの行のコメントアウトを外す
# git clone --depth 1 git@github.com:poroto-app/infrastructure.git

crypt_files_production=(".env.production.local")

for file in "${crypt_files_production[@]}"
do
  echo "Decrypting ${file} ..."
  gcloud kms decrypt \
    --location "asia-northeast1" \
    --keyring "poroto_key_ring" \
    --key "poroto_crypt_key" \
    --plaintext-file "./${file}" \
    --ciphertext-file "./infrastructure/roles/app/poroto/production/${file}.enc" || exit 1
  echo ">> Decrypted ${file}!"
done

rm -rf infrastructure
