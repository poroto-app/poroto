export class PlannerApi {
    async createPlansFromLocation(request: CreatePlanFromLocationRequest): Promise<CreatePlanFromLocationResponse> {
        // TODO: implement me!
        return {
            plans: [
                {
                    id: "0",
                    title: "カフェでほっと一息",
                    tags: [
                        {content: "カフェ"}
                    ],
                    places: [
                        {
                            name: "カフェ",
                            imageUrls: ["https://picsum.photos/200"],
                            location: {latitude: 0, longitude: 0}
                        }
                    ],
                },
                {
                    id: "1",
                    title: "ゆっくり読書時間",
                    tags: [
                        {content: "カフェ"},
                        {content: "書店"}
                    ],
                    places: [
                        {
                            name: "カフェ",
                            imageUrls: [
                                "https://picsum.photos/200",
                            ],
                            location: {latitude: 0, longitude: 0}
                        },
                        {
                            name: "書店",
                            imageUrls: [
                                "https://picsum.photos/600/500",
                                "https://picsum.photos/800/500",
                                "https://picsum.photos/600/300"
                            ],
                            location: {latitude: 0, longitude: 0}
                        }
                    ],
                },
            ]
        }
    }
}

export type CreatePlanFromLocationRequest = {
    location: {
        latitude: number,
        longitude: number,
    }
}

export type CreatePlanFromLocationResponse = {
    plans: {
        id: string,
        title: string
        tags: {
            content: string,
        }[],
        places: {
            name: string,
            imageUrls: string[],
            location: {
                latitude: number,
                longitude: number,
            }
        }[]
    }[]
}