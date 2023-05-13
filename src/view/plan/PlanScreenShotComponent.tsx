import styled from "styled-components";
import { PlanDuration, PlanPrice } from "src/view/plan/PlanSummaryItem";
import { Plan } from "src/domain/models/Plan";
import { Place } from "src/domain/models/Place";

type Props = {
	plan: Plan,
	money: {
		start: number
		end?: number
	}
}

export const PlanScreenShotComponent = ({ plan, money}: Props) => {
	return <Block>
		<PlaceListItem  place={plan.places[0]}/>
		<PlanPrice price={money.start} priceEnd={money.end} />
		<PlanDuration durationInMinutes={plan.timeInMinutes}/>
        <img src="/images/poroto.jpg" alt="poroto画像が表示されます。"/>
	</Block>
}

const PlaceListItem = ({place}: { place: Place })  => {
	return <div>
		<Name>{place.name}</Name>
		<Address>{"住所"/*TODO: 住所を指定できるようにする*/}</Address>
	</div>
}

const Block = styled.div`
	display: flex;
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
