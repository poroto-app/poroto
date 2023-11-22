# 同じ階層に planner と infrastructure　があることを想定しています。
# - directory
#   - planner
#   - infrastructure

function encrypt() {
   environment=$1
   file=$2
   echo "[${environment}] Encrypting ${target} ..."
   gcloud kms encrypt \
      --location "asia-northeast1" \
      --keyring "poroto_key_ring" \
      --key "poroto_crypt_key" \
      --plaintext-file "./${file}" \
      --ciphertext-file "../infrastructure/roles/app/poroto/${environment}/${file}.enc"
   echo ">> Encrypted ${target}!"
}

# 環境設定（デフォルトはdevelopment）
env=$1
if [ -z "${env}" ]; then
  env="development"
fi

# 環境ごとのシークレットを暗号化
case "$env" in
"development")
  encrypt_targets=(".env.development.local")
  ;;
"staging")
  encrypt_targets=(".env.staging.local")
  ;;
"production")
  encrypt_targets=(".env.production.local")
  ;;
esac

for target in "${encrypt_targets[@]}"
do
  encrypt "${env}" "${target}"
done