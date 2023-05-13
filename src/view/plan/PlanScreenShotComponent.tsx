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

export const PlanScreenShotComponent = ({ plan, money }: Props) => {
	return <Block>
		{
			plan.places.map((place, i) => <PlaceListItem key={i} place={place}/>)
		}
		<PlanPrice price={money.start} priceEnd={money.end} />
		<PlanDuration durationInMinutes={plan.timeInMinutes} />
		<img src="/images/poroto.jpg" alt="poroto画像が表示されます。" />
	</Block>
}

const PlaceListItem = ({ place }: { place: Place }) => {
	return <PlaceContainer>
		<Name>{place.name}</Name>
		<Address>{"住所"/*TODO: 住所を指定できるようにする*/}</Address>
	</PlaceContainer>
}

const Block = styled.div`
	display: flex;
	flex-direction: column;
`;
const PlaceContainer = styled.div`
	border-bottom: 1px solid rgba(0,0,0,.1);
	padding: 10px 0;
`;
const Name = styled.div`
	font-size: 20px;
	font-weight: 600;
	color: #000000;
`;
const Address = styled.div`
	font-size: 15px;
	color: #808080;
`;
