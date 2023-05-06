# 同じ階層に planner と infrastructure　があることを想定しています。
# - directory
#   - planner
#   - infrastructure

crypt_targets_dev=(".env.development.local")
crypt_targets_prd=(".env.production.local")

for target in "${crypt_targets_dev[@]}"
do
  echo "[Development] Encrypting ${target} ..."
  gcloud kms encrypt \
     --location "asia-northeast1" \
     --keyring "poroto_key_ring" \
     --key "poroto_crypt_key" \
     --plaintext-file "./${target}" \
     --ciphertext-file "../infrastructure/roles/app/poroto/development/${target}.enc"
  echo ">> Encrypted ${target}!"
done

for target in "${crypt_targets_prd[@]}"
do
  echo "[Production] Encrypting ${target} ..."
  gcloud kms encrypt \
     --location "asia-northeast1" \
     --keyring "poroto_key_ring" \
     --key "poroto_crypt_key" \
     --plaintext-file "./${target}" \
     --ciphertext-file "../infrastructure/roles/app/poroto/production/${target}.enc"
  echo ">> Encrypted ${target}!"
done
