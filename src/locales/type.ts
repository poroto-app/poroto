export type CommonTranslationKeys = {
    save: string;
    close: string;
    cancel: string;
    backToHome: string;
    info: string;
    time: string;
    budget: string;
};

export type AccountTranslationKeys = {
    login: string;
    logout: string;
    loginByGoogle: string;

    retainDataBeforeLogin: string;
    retainData: string;
    retainingData: string;
    retainingDataWaitMessage: string;
    retainDataSuccess: string;
    retainDataFailed: string;
    retainDataCanceledMessage: string;
    retainDataRetryLaterMessage: string;

    promptLoginTitle: string;
    promptLoginDescription: string;

    promptRetainDataBeforeLoginTitle: string;
    promptRetainDataBeforeLoginDescription: string;
};

export type HomeTranslationKeys = {
    promptCreatePlan: string;
    fromFavoritePlace: string;
    fromCurrentLocation: string;
    recentlyCreatedPlans: string;
};

export type PlanTranslationKeys = {
    plan: string;
    album: string;
    loadingPlan: string;
    planInfo: string;
    saveThisPlan: string;
    nearbyPlans: string;
    copiedPlanUrl: string;

    promptShareCreatedPlan: string;
    promptCreateNewPlan: string;
    promptPreparingCustomPlan: string;

    placesInPlan: string;
    clickMarkerToShowPlaceDetail: string;

    saveAsImage: string;
    searchRouteOnGoogleMaps: string;
    customizePlan: string;

    failedToCreatePlan: string;

    loadingMap: string;
    cannotDisplayBecauseThePlanDoesNotContainAnyPlaces: string;

    savedPlans: string;
    savedPlansEmptyTitle: string;
    savedPlansEmptyDescription: string;
};

export type PlaceTranslationKeys = {
    searchByInstagram: string;
    searchByGoogleMaps: string;
    uploadPhoto: string;

    category: string;
    priceRange: string;
    estimatedStayDuration: string;

    favoritePlaces: string;
    favoritePlacesEmptyTitle: string;
    favoritePlacesEmptyDescription: string;
};
