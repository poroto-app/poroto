# 同じ階層に planner と infrastructure　があることを想定しています。
# - directory
#   - planner
#   - infrastructure

crypt_targets=(".env.local" ".env.development.local")

for target in "${crypt_targets[@]}"
do
  echo "Encrypting ${target} ..."
  gcloud kms encrypt \
     --location "asia-northeast1" \
     --keyring "poroto_key_ring" \
     --key "poroto_crypt_key" \
     --plaintext-file "./${target}" \
     --ciphertext-file "../infrastructure/roles/app/poroto/production/${target}.enc"
done