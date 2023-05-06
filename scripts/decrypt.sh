# ローカルで実行するときはこの行のコメントアウトを外す
git clone --depth 1 git@github.com:poroto-app/infrastructure.git

crypt_files_development=(".env.development.local")

echo Decrypt Secrets
for file in "${crypt_files_development[@]}"
do
  echo "[Development] Decrypting ${file} ..."
  gcloud kms decrypt \
    --location "asia-northeast1" \
    --keyring "poroto_key_ring" \
    --key "poroto_crypt_key" \
    --plaintext-file "./${file}" \
    --ciphertext-file "./infrastructure/roles/app/poroto/development/${file}.enc" || exit 1
  echo ">> Decrypted ${file}!"
done

rm -rf infrastructure
