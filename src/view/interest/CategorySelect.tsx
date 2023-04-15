import {LocationCategory} from "src/domain/models/LocationCategory";

type Props = {
    category: LocationCategory,
    onClickYes: (category: LocationCategory) => void,
    onClickNo: (category: LocationCategory) => void,
}
export const CategorySelect = ({category, onClickYes, onClickNo}: Props) => {
    return <div>
        {category.name}
        <button onClick={() => onClickYes(category)}>Yes</button>
        <button onClick={() => onClickNo(category)}>No</button>
    </div>
}