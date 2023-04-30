import { HStack, Text, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"

type Props = {
    text: string,
    icon: IconType
}

export const PlanSummaryItem = ({ text, icon }: Props) => {
    return <HStack w="100%" px="16px" py="4px" columnGap="20px" spacing={0}>
        <Icon w="24px" h="24px" color="#BD9F8E" as={icon} />
        <Text color="rgba(0,0,0,.6)">{text}</Text>
    </HStack>
}