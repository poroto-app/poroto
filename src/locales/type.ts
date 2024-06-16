export type CommonTranslationKeys = {
    save: string;
    close: string;
    cancel: string;
    edit: string;
    backToHome: string;
    reload: string;
    retry: string;

    info: string;
    time: string;
    budget: string;

    minutesLabel: string;

    serverError: string;
    notFound: string;
};

export type AccountTranslationKeys = {
    login: string;
    logout: string;
    loginByGoogle: string;

    name: string;
    editProfile: string;
    editProfileImage: string;

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

export type NavigationTranslationKeys = {
    home: string;
    search: string;
    myPage: string;
};

export type OgpTranslationKeys = {
    topPageTitle: string;
    topPageDescription: string;

    placeSearchPageTitle: string;
    placeSearchPageDescription: string;

    planInterestPageFromCurrentLocationTitle: string;
    planInterestPageFromSelectedPlaceTitle: string;
    planInterestPageDescription: string;
};

export type PlanTranslationKeys = {
    plan: string;
    album: string;
    loadingPlan: string;
    planInfo: string;
    saveThisPlan: string;
    copiedPlanUrl: string;
    createPlan: string;

    promptShareCreatedPlan: string;
    promptCreateNewPlan: string;
    promptPreparingCustomPlan: string;
    promptSearchingNearbyPlans: string;
    promptLocationPermissionDenied: string;
    promptLocationPermissionNotGranted: string;

    nearbyPlans: string;
    nearbyPlansEmptyTitle: string;
    nearbyPlansEmptyDescription: string;

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

    createPlanFromThisPlace: string;
};

export type PlaceTranslationKeys = {
    searchPlace: string;
    skipCurrentLocationRetrieval: string;
    tapToSelectPlace: string;
    createPlanFromSelectedPlace: string;

    searchByInstagram: string;
    searchByGoogleMaps: string;
    uploadPhoto: string;

    category: string;
    priceRange: string;
    estimatedStayDuration: string;
    noInformation: string;

    favoritePlaces: string;
    favoritePlacesEmptyTitle: string;
    favoritePlacesEmptyDescription: string;

    showRecommendedTouristSpots: string;
    recommendedTouristSpotsTitle: string;
    promptRecommendedTouristSpotsSearching: string;
    recommendedTouristSearchFailed: string;
};

export type PwaTranslationKeys = {
    addToHomeScreen: string;
    alreadyAddedToHomeScreen: string;
    addToHomeScreenInstructionTitle: string;

    promptAddToHomeScreen: string;
};
