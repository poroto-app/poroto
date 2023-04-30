import styled from "styled-components"
import {PlanDuration} from "./PlanSummaryItem"
import {Plan} from "src/domain/plan/Plan";

type Props = {
    plan: Plan
}

export const PlanScreenShotComponent = ({plan}: Props) => {
    return <div>
        {
            plan.places.map((place) => <PlaceListItem>
                <div>{place.name}</div>
            </PlaceListItem>)
        }
        <PlanDuration durationInMinutes={plan.timeInMinutes}/>
    </div>
}

const PlaceListItem = styled.div`
  display: flex;
`