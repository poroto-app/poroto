import { Text, VStack } from "@chakra-ui/react";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";

type Props = {
    plan: Plan;
};

export function PlanPageThumbnail({ plan }: Props) {
    const thumbnails = plan.places
        .map((place) =>
            place.images.length > 0
                ? getImageSizeOf(ImageSizes.Large, place.images[0])
                : null
        )
        .filter((v) => v !== null);

    return (
        <VStack w="100%" alignItems="flex-start" px="16px">
            {thumbnails.length > 0 && <PlanThumbnail imageUrls={thumbnails} />}
            <Text
                as="h1"
                color="rgb(34,34,34)"
                fontWeight="600"
                fontSize="20px"
            >
                {plan.title}
            </Text>
        </VStack>
    );
}
