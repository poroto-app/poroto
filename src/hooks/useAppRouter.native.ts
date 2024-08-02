import { reloadAsync } from "expo-updates";
import { useRouter } from "solito/router";
import { AppRouter } from "src/types/hooks";

export const useAppRouter = (): AppRouter => {
    const router = useRouter();
    return {
        push: async (url, as, transitionOptions) => {
            router.push(url, as, transitionOptions);
        },
        reload: async () => reloadAsync(),
    };
};
