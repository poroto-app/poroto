import { useRouter } from "next/router";
import { AppRouter } from "src/types/hooks";

export const useAppRouter = (): AppRouter => {
    const router = useRouter();
    return {
        push: async (url, as, transitionOptions) => {
            await router.push(url, as, transitionOptions);
        },
        reload: async () => router.reload(),
    };
};
