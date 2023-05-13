import styled from "styled-components";
import { FaWalking } from 'react-icons/fa'
import { BiYen } from 'react-icons/bi'
import {AiOutlineClockCircle} from 'react-icons/ai'
import { IconContext } from "react-icons"

type Props = {
	title: string
	name: string
    address: string
	distance: string
	time: string
	money: string
	total_time: string
}

export const PlanScreenShotComponent = ({ title, name, address, time, distance, money, total_time}: Props) => {
	return <Block>
		<Name>{name}</Name>
		<Address>{address}</Address>

		<DistanceTime>
			<IconContext.Provider value={{ color: '#808080', size: '40px' }}>
				<h1>
					<FaWalking />
				</h1>
			</IconContext.Provider>
			<DistanceTimeCharacter>
				<Time>{time}</Time>
				<Distance>{distance}</Distance>
			</DistanceTimeCharacter>
		</DistanceTime>

		<Money>
			<IconContext.Provider value={{ color: '#808080', size: '40px' }}>
					<h2>
						<BiYen />
					</h2>
			</IconContext.Provider>
			<MoneyCharacter>{money}</MoneyCharacter>
		</Money>

		<TotalTimeBlock>
			<IconContext.Provider value={{ color: '#808080', size: '40px' }}>
					<h2>
						<AiOutlineClockCircle />
					</h2>
			</IconContext.Provider>
			<TotalTime>{total_time}</TotalTime>
		</TotalTimeBlock>
		<>
			<img src="/images/poroto.jpg" alt="poroto画像が表示されます。"></img>
		</>
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
const DistanceTime = styled.div`
	font-size: 15px;
	font-weight: 600;
	color: #808080;
	display: flex;
	flex-direction: row;
	padding-top: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #808080;
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