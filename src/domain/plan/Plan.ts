import {Place} from "src/domain/place/place";

export type Plan = {
    id: string
    title: string
    places: Place[],
    tags: PlanTag[]
}

export type PlanTag = {
    content: string
}