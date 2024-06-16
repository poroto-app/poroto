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
    YYYYMMDDHHMM: string;

    minutesLabel: string;
    priceLabel: string;

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
    copyPlanUrl: string;
    copiedPlanUrl: string;
    createPlan: string;
    createPlanFromOtherLocation: string;

    customizePlan: string;
    customizePlanCreating: string;
    customizePlanCreated: string;

    promptShareCreatedPlan: string;
    promptCreateNewPlan: string;
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

    failedToCreatePlan: string;

    loadingMap: string;
    cannotDisplayBecauseThePlanDoesNotContainAnyPlaces: string;

    savedPlans: string;
    savedPlansEmptyTitle: string;
    savedPlansEmptyDescription: string;

    showPlan: string;

    createPlanInProgressTitle: string;
    createPlanFailedTitle: string;
    createPlanFailedDescription: string;

    createPlanFromThisPlace: string;

    planCreatingTitle: string;
    planCreateFailedTitle: string;
    planCreatedSuccessfullyTitle: string;

    reorderPlaces: string;
    reorderPlacesSuccess: string;
    reorderPlacesFailed: string;
    reorderPlacesMinuteFromStartLocation: string;
    reorderPlacesMinuteFromPreviousPlace: string;
    reorderPlacesMinimizeWalkingDistance: string;
};

export type PlaceTranslationKeys = {
    searchPlace: string;
    skipCurrentLocationRetrieval: string;
    tapToSelectPlace: string;
    createPlanFromSelectedPlace: string;

    searchByInstagram: string;
    searchByGoogleMaps: string;

    nearbyPlacesSearching: string;
    selectPlaceCategoryMessage: string;

    uploadPlacePhoto: string;
    uploadPlacePhotoSuccess: string;
    uploadPlacePhotoFailed: string;
    uploadPlacePhotoFailedDescription: string;

    address: string;
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

    loginToSaveFavoritePlace: string;

    relatedPlacesShow: string;
    relatedPlacesTitle: string;
    relatedPlacesDescription: string;

    replacePlace: string;
    replacePlaceConfirmTitle: string;
};

export type PwaTranslationKeys = {
    addToHomeScreen: string;
    addedToHomeScreen: string;
    alreadyAddedToHomeScreen: string;
    addToHomeScreenInstructionTitle: string;

    promptAddToHomeScreen: string;
    pwaInstallationConfirmedResponse: string;
};
