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

crypt_targets_dev=(".env.development.local")
crypt_targets_stg=(".env.staging.local")
crypt_targets_prd=(".env.production.local")

for target in "${crypt_targets_dev[@]}"
do
  encrypt "development" "${target}"
done

for target in "${crypt_targets_stg[@]}"
do
  encrypt "staging" "${target}"
done

for target in "${crypt_targets_prd[@]}"
do
  encrypt "production" "${target}"
done
