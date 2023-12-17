import { HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdFavorite } from "react-icons/md";

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
        <HStack
            alignItems="center"
            boxShadow="0px 0px 20px 0px rgba(220, 183, 141, 0.50)"
            borderRadius="50px"
            px="8px"
            py="4px"
            spacing="12px"
        >
            <motion.button
                onClick={() => onUpdateLike(!isLiked)}
                style={{ fontSize: "1.6rem" }}
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.2 }}
            >
                {isLiked ? (
                    <MdFavorite style={{ color: "red" }} />
                ) : (
                    <MdFavorite style={{ color: "#767676" }} />
                )}
            </motion.button>
            <Text fontWeight="bold">{likeCount}</Text>
        </HStack>
    );
};
