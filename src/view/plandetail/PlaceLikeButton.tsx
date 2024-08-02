import { Heart } from "@tamagui/lucide-icons";
import { Padding } from "src/constant/padding";
import { Button, Text, XStack } from "tamagui";

type Props = {
    isLiked: boolean;
    likeCount: number;
    onUpdateLike: (like: boolean) => void;
};

export const PlaceLikeButton = ({
    isLiked,
    likeCount,
    onUpdateLike,
}: Props) => {
    return (
        <Button
            unstyled
            transition="cubic-bezier(0, 0, 0.14, 0.98) 0.2s"
            hoverStyle={{
                scale: !isLiked && 1.2,
            }}
            pressStyle={{
                scale: !isLiked && 0.8,
            }}
            onPress={() => onUpdateLike(!isLiked)}
        >
            <XStack
                alignItems="center"
                shadowColor="rgba(220, 183, 141)"
                shadowOffset={{ width: 0, height: 0 }}
                shadowRadius={5}
                borderRadius={50}
                backgroundColor="white"
                px={Padding.p8}
                py={Padding.p4}
                gap={Padding.p8}
            >
                <Heart
                    size={20}
                    fill={isLiked ? "red" : "#767676"}
                    borderWidth={0}
                />
                <Text fontWeight="bold">{likeCount}</Text>
            </XStack>
        </Button>
    );
};
