export const Locales = {
    Ja: "ja",
    En: "en",
};
export type Locale = (typeof Locales)[keyof typeof Locales];

export type CommonTranslationKeys = {
    add: string;
    backToHome: string;
    budget: string;
    cancel: string;
    close: string;
    currentLocation: string;
    delete: string;
    edit: string;
    reload: string;
    retry: string;
    save: string;
    upload: string;

    info: string;

    minutesLabel: string;
    minuteApproximatelyLabel: string;
    priceLabel: string;

    time: string;
    YYYYMMDDHHMM: string;
    labelHour: string;
    labelMinute: string;
};

export type AccountTranslationKeys = {
    name: string;
    editProfile: string;
    editProfileImage: string;
    editProfileSuccess: string;
    editProfileFailed: string;

    retainDataBeforeLogin: string;
    retainData: string;
    retainingData: string;
    retainingDataWaitMessage: string;
    retainDataSuccess: string;
    retainDataFailed: string;
    retainDataCanceledMessage: string;
    retainDataRetryLaterMessage: string;
    retainDataBeforeLoginTitle: string;
    retainDataBeforeLoginDescription: string;

    login: string;
    loginByGoogle: string;
    loginTitle: string;
    loginDescription: string;
    logout: string;
};

export type ErrorTranslationKeys = {
    errorTitle: string;
    errorDescription: string;

    serverErrorStatusMessage: string;
    serverErrorDescription: string;

    notFoundStatusMessage: string;
    notFoundDescription: string;
};

export type HomeTranslationKeys = {
    createPlanTitle: string;
    createPlanFromFavoritePlace: string;
    createPlanFromCurrentLocation: string;
    recentlyCreatedPlans: string;
};

export type LocationTranslationKeys = {
    fetchCurrentLocationInProgress: string;
    fetchCurrentLocationFailed: string;
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
    album: string;
    plan: string;

    addNewPlaceToPlanConfirmTitle: string;
    addNewPlaceToPlanMinuteFromPreviousPlace: string;
    addNewPlaceToPlanTitle: string;

    cannotDisplayBecauseThePlanDoesNotContainAnyPlaces: string;
    clickMarkerToShowPlaceDetail: string;

    copiedPlanUrl: string;
    copyPlanUrl: string;

    createPlan: string;
    createNewPlanTitle: string;
    createPlanInProgressTitle: string;
    createPlanFailed: string;
    createPlanFailedDescription: string;
    createPlanFailedTitle: string;

    createPlanFromOtherLocation: string;
    createPlanFromThisPlace: string;
    createPlanFromSelectedPlace: string;
    createPlanFromFavoritePlace: string;

    createPlanByCategoryTitle: string;
    createPlanByCategoryDescription: string;
    createPlanByCategorySelectRangeTitle: string;
    createPlanByCategory: string;
    createPlanByCategorySelectLocationTitle: string;
    createPlanByCategoryLocationNotSelectedError: string;

    customizePlan: string;
    customizePlanCreated: string;
    customizePlanCreating: string;

    deletePlaceFromPlanConfirmTitle: string;

    loadingMap: string;
    loadingPlan: string;

    loginRecommendationTitle: string;
    loginRecommendationDescription: string;

    nearbyPlans: string;
    nearbyPlansEmptyDescription: string;
    nearbyPlansEmptyTitle: string;

    planCreateFailedTitle: string;
    planCreatedSuccessfullyTitle: string;
    planCreatingTitle: string;

    planInfo: string;
    placesInPlan: string;

    reorderPlaces: string;
    reorderPlacesFailed: string;
    reorderPlacesMinuteFromPreviousPlace: string;
    reorderPlacesMinuteFromStartLocation: string;
    reorderPlacesMinimizeWalkingDistance: string;
    reorderPlacesSuccess: string;

    saveAsImage: string;
    saveThisPlan: string;
    showPlan: string;

    savedPlans: string;
    savedPlansEmptyDescription: string;
    savedPlansEmptyTitle: string;
    searchNearbyPlansInProgress: string;
    searchNearbyPlansLocationPermissionDenied: string;
    searchNearbyPlansLocationPermissionNotGranted: string;
    searchRouteOnGoogleMaps: string;

    scheduleTitle: string;
    scheduleSpotLabel: string;

    shareCreatedPlanMessage: string;
};

export type PlaceTranslationKeys = {
    address: string;
    category: string;
    estimatedStayDuration: string;
    nearbyPlacesSearching: string;
    noInformation: string;
    priceRange: string;

    favoritePlaces: string;
    favoritePlacesEmptyDescription: string;
    favoritePlacesEmptyTitle: string;

    loginToSaveFavoritePlace: string;

    recommendedTouristSpotsSearchFailed: string;
    recommendedTouristSpotsSearching: string;
    recommendedTouristSpotsShow: string;
    recommendedTouristSpotsTitle: string;

    relatedPlacesDescription: string;
    relatedPlacesShow: string;
    relatedPlacesTitle: string;
    replacePlace: string;
    replacePlaceConfirmTitle: string;

    searchByGoogleMaps: string;
    searchByInstagram: string;
    searchPlace: string;
    selectPlaceCategoryMessage: string;
    skipCurrentLocationRetrieval: string;

    tapToSelectPlace: string;

    uploadPlacePhoto: string;
    uploadPlacePhotoConfirmTitle: string;
    uploadPlacePhotoFailed: string;
    uploadPlacePhotoFailedDescription: string;
    uploadPlacePhotoSuccess: string;
};

export type PwaTranslationKeys = {
    addToHomeScreen: string;
    addedToHomeScreen: string;
    alreadyAddedToHomeScreen: string;
    addToHomeScreenInstructionTitle: string;

    promptAddToHomeScreen: string;
    pwaInstallationConfirmedResponse: string;
};
