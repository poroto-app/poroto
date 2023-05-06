import {Place} from "src/domain/models/place";

export type Plan = {
    id: string
    title: string
    places: Place[],
    tags: PlanTag[]
    timeInMinutes: number
}

export type PlanTag = {
    content: string
}