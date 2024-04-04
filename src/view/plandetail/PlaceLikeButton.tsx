import { HStack, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdFavorite } from "react-icons/md";

type Props = {
    isLiked: boolean;
    likeCount: number;
    onUpdateLike: (like: boolean) => void;
};

export const PlaceLikeButton = (
    { isLiked, likeCount, onUpdateLike }: Props
) => {
    return (
        <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onUpdateLike(!isLiked)}
        >
            <HStack
                alignItems="center"
                boxShadow="0px 0px 5px 0px rgba(220, 183, 141, 1)"
                borderRadius="50px"
                backgroundColor="white"
                px="8px"
                py="4px"
                spacing="8px"
            >
                <Icon
                    w="20px"
                    h="20px"
                    color={isLiked ? "red" : "#767676"}
                    as={isLiked ? MdFavorite : MdFavorite}
                />
                <Text fontWeight="bold">{likeCount}</Text>
            </HStack>
        </motion.button>
    );
};
