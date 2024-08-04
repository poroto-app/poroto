import type { NextRouter as NextRouterType } from "next/dist/shared/lib/router/router";

export type AppRouter = {
    push: (
        url: Parameters<NextRouterType["push"]>[0],
        as?: Parameters<NextRouterType["push"]>[1],
        transitionOptions?: {
            shallow?: boolean;
            locale?: string | false;
            scroll?: boolean;
        }
    ) => Promise<void>;
    reload: () => Promise<void>;
};
