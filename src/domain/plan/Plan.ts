import {Place} from "src/domain/place/place";

export type Plan = {
    id: string
    title: string
    places: Place[]
}

export type PlanEntry = {
    id: string,
    title: string
    imageUrls: string[]
    tags: PlanTag[]
}

export type PlanTag = {
    content: string
}