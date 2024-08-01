import { useRouter } from "next/router";
import { AppRouter } from "src/types/hooks";

export const useAppRouter = (): AppRouter => {
    const router = useRouter();
    return {
        push: (url, as, transitionOptions) =>
            new Promise(async (resolve) => {
                await router.push(url, as, transitionOptions);
                resolve();
            }),
        reload: () =>
            new Promise((resolve) => {
                router.reload();
                resolve();
            }),
    };
};
