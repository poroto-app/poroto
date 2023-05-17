import styled from "styled-components";
import { PlanDuration, PlanPrice } from "src/view/plan/PlanSummaryItem";
import { Plan } from "src/domain/models/Plan";
import { Place } from "src/domain/models/Place";
import PlanThumbnailStories from "src/stories/plan/PlanThumbnail.stories";

type Props = {
	plan: Plan,
	money: {
		start: number
		end?: number
	}
}

export const PlanScreenShotComponent = ({ plan, money }: Props) => {
	return <Block>
		<PlanTitle>{plan.title}</PlanTitle>
		{
			plan.places.map((place, i) => <PlaceListItem key={i} place={place}/>)
		}
		<PlanSummaryContainer>
			<PlanPrice price={money.start} priceEnd={money.end} />
			<PlanDuration durationInMinutes={plan.timeInMinutes} />
		</PlanSummaryContainer>
		<img src="/images/poroto.jpg" alt="poroto画像が表示されます。" />
	</Block>
}

const PlaceListItem = ({ place }: { place: Place }) => {
	return <PlaceContainer>
		<PlaceName>{place.name}</PlaceName>
		<Address>{"住所"/*TODO: 住所を指定できるようにする*/}</Address>
	</PlaceContainer>
}

const Block = styled.div`
	display: flex;
	flex-direction: column;
	width: 360px;
`;
const PlanSummaryContainer = styled.div`
	padding: 16px 0;
`;
const PlaceContainer = styled.div`
	border-bottom: 1px solid rgba(0,0,0,.1);
	padding: 16px;
`;
const PlaceName = styled.div`
	font-size: 16px;
`;
const Address = styled.div`
	font-size: 15px;
	color: #808080;
`;
const PlanTitle = styled.div`
	padding: 16px;
	font-size: 16px;
	color: #5E6382;
	border-bottom: 1px solid rgba(0,0,0,.1);
`;