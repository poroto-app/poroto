import { LinearGradient } from "@tamagui/linear-gradient";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { appImageLoader } from "src/view/image/appImageLoader";
import { Text, YStack } from "tamagui";

type Props = {
    category: CreatePlanPlaceCategory;
    onClick: () => void;
};

export function CreatePlanCategory({ category, onClick }: Props) {
    return (
        <YStack
            minWidth={Size.CreatePlanCategory.CategoryImage.width}
            w={Size.CreatePlanCategory.CategoryImage.width}
            h={Size.CreatePlanCategory.CategoryImage.height}
            overflow="hidden"
            borderRadius={10}
            position="relative"
            onPress={onClick}
        >
            <ImageWithSkeleton
                w={Size.CreatePlanCategory.CategoryImage.width}
                h={Size.CreatePlanCategory.CategoryImage.height}
                src={appImageLoader({
                    src: category.imageUrl,
                    width: Size.CreatePlanCategory.CategoryImage.width,
                })}
                alt={category.displayName}
            />
            <YStack
                userSelect="none"
                position="absolute"
                alignItems="flex-start"
                right={0}
                bottom={0}
                left={0}
            >
                <LinearGradient
                    width="100%"
                    height="100%"
                    px={Padding.p16}
                    py={Padding.p16}
                    colors={[
                        "rgba(0, 0, 0, 0.00)",
                        "rgba(0, 0, 0, 0.30)",
                        "rgba(0, 0, 0, 0.50)",
                    ]}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 0.3, 1]}
                >
                    <Text
                        color="white"
                        fontSize={16}
                        fontWeight="bold"
                        zIndex={1}
                    >
                        {category.displayName}
                    </Text>
                </LinearGradient>
            </YStack>
        </YStack>
    );
}
