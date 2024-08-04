import { Padding } from "src/constant/padding";
import { Spinner, XStack } from "tamagui";

export function PlanListLoadingSpinner({ grid }: { grid?: boolean }) {
    return (
        <XStack
            py={Padding.p32}
            w={grid && "100%"}
            h={!grid && "100%"}
            justifyContent="center"
            alignItems="center"
        >
            <Spinner size="large" color="$orange10" />
        </XStack>
    );
}
