import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    // TODO: 自動的に全てのスキーマを検知できるようにしたい。
    // @ts-ignore
    schema: [
        "schema.graphqls",
        "plan.graphqls",
    ].map((schema) => ({
        [`github:poroto-app/planner#develop:graphql/schema/${schema}`]: {
            token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
        },
    })),
    documents: "graphql/documents/**.graphql",
    generates: {
        "src/data/graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typed-document-node",
            ],
        },
    }
};

export default config;
