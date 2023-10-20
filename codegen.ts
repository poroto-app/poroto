import type { CodegenConfig } from "@graphql-codegen/cli";

const schema = {
    // TODO: 自動的に全てのスキーマを検知できるようにしたい。
    repository: [
        "schema.graphqls",
        "plan.graphqls",
    ].map((schema) => ({
        [`github:poroto-app/planner#develop:graphql/schema/${schema}`]: {
            token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        },
    })),
    // MEMO: localで実行するときには必ず Planner のサーバーを起動する。
    localServer: "http://localhost:8080/graphql",
};


const config: CodegenConfig = {
    overwrite: true,
    // @ts-ignore
    schema: process.env.CONTEXT === "CI" ? schema.repository : schema.localServer,
    documents: "graphql/documents/**/**.graphql",
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
