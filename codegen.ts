import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    // TODO: GitHubから取得できるようにする
    schema: "http://localhost:8080/graphql",
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
