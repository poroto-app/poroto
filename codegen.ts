import type { CodegenConfig } from "@graphql-codegen/cli";

const schema = {
    stagingServer: "https://staging.planner.komichi.app/graphql",
    // MEMO: localで実行するときには必ず Planner のサーバーを起動する。
    localServer: "http://localhost:8080/graphql",
};


const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.CONTEXT === "CI" ? schema.stagingServer : schema.localServer,
    documents: "src/data/graphql/documents/**/**.graphql",
    generates: {
        "src/data/graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ],
        },
    },
};

export default config;
