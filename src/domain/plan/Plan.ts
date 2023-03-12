export type Plan = {
    title: string
    imageUrls: string
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