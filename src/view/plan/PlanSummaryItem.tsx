import { HStack, Text, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { BiYen } from "react-icons/bi"
import { MdSchedule } from "react-icons/md"
import { DateHelper } from "src/domain/util/date"

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

export const PlanDuration = ({ durationInMinutes }: { durationInMinutes: number }) => {
    const duration = `${durationInMinutes.toFixed()}分`;
    const endPlanDate = DateHelper.add(new Date(), durationInMinutes * DateHelper.Minute);
    const endPlanTime = `${DateHelper.dateToHHMM(endPlanDate)}`;
    return <PlanSummaryItem
        text={`${duration} (~ ${endPlanTime})`}
        icon={MdSchedule}
    />
}

export const PlanPrice = ({ price, priceEnd }: { price: number, priceEnd?: number }) => {
    let priceStr = `${price}`;
    if (priceEnd) {
        priceStr += ` ~ ${priceEnd}`;
    }
    
    return <PlanSummaryItem
        text={priceStr}
        icon={BiYen}
    />
}