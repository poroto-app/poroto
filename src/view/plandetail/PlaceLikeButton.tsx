import { HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type Props = {
    isLiked: boolean;
    likeCount: number;
    onUpdateLike: (like: boolean) => void;
};

export const PlaceLikeButton = ({ isLiked, likeCount, onUpdateLike }: Props) => {
    return (
        <HStack alignItems="center" marginTop="4px">
            <motion.button
                onClick={() => onUpdateLike(!isLiked)}
                style={{
                    marginRight: "10px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.6rem",
                }}
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.2 }}
            >
                {isLiked ? (
                    <MdFavorite style={{ color: "red" }} />
                ) : (
                    <MdFavoriteBorder />
                )}
            </motion.button>
            <Text
                fontSize="0.8rem"
                as="h2"
                fontWeight="bold"
                color="#222222"
            >{`いいね！${likeCount.toLocaleString()}件`}</Text>
        </HStack>
    );
};
