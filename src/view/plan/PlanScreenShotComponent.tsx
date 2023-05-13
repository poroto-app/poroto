import styled from "styled-components";
import { FaWalking } from 'react-icons/fa'
import { BiYen } from 'react-icons/bi'
import {AiOutlineClockCircle} from 'react-icons/ai'
import { IconContext } from "react-icons"
import { Icon } from "@chakra-ui/react";
import { PlanDuration, PlanPrice } from "src/view/plan/PlanSummaryItem";


type Props = {
	title: string
	name: string
    address: string
	time: string
	money: {
		start: number
		end?: number
	}
	totalTime: number
}

export const PlanScreenShotComponent = ({ title, name, address, time, money, totalTime}: Props) => {
	return <Block>
		<Name>{name}</Name>
		<Address>{address}</Address>

		<PlanPrice price={money.start} priceEnd={money.end} />
		<PlanDuration durationInMinutes={totalTime}/>
        <img src="/images/poroto.jpg" alt="poroto画像が表示されます。"/>
	</Block>
}

const Block = styled.div`
	display: flex;
	flex-direction: column;
`;
const DistanceTimeCharacter = styled.div`
	flex-direction: column;
`;
const Name = styled.div`
	font-size: 20px;
	font-weight: 600;
	padding-top: 10px;
	border-top: 1px solid #808080;
	color: #000000;
`;
const Address = styled.div`
	font-size: 15px;
	padding-bottom: 10px;
	border-bottom: 1px solid #808080;
	color: #808080;
`;
const Time = styled.div`
	font-size: 15px;
	color: #808080;
`;
const Distance = styled.div`
	font-size: 15px;
	color: #808080;
`;
const Money = styled.div`
	padding-top: 10px;
	display: flex;
	flex-direction: row;
`;
const MoneyCharacter = styled.div`
	font-size: 15px;
	font-weight: 600;
	padding-top: 10px;
	color: #808080;
	display: flex;
	flex-direction: row;
	vertical-align: middle;
`;
const TotalTimeBlock = styled.div`
	padding-top: 10px;
	display: flex;
	flex-direction: row;
`;
const TotalTime = styled.div`
	font-size: 15px;
	font-weight: 600;
	padding-top: 10px;
	color: #808080;
	display: flex;
	flex-direction: row;
	vertical-align: middle;
`;