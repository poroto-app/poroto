import { reloadAsync } from "expo-updates";
import { useRouter } from "solito/router";
import { AppRouter } from "src/types/hooks";

export const useAppRouter = (): AppRouter => {
    const router = useRouter();
    return {
        push: (url, as, transitionOptions) =>
            new Promise(async (resolve) => {
                router.push(url, as, transitionOptions);
                resolve();
            }),
        reload: () =>
            new Promise(async (resolve) => {
                await reloadAsync();
                resolve();
            }),
    };
};
