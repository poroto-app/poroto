import Constants from "expo-constants";
import { AppEnvType } from "src/types/env";

export const AppEnv: AppEnvType = {
    APP_ENV: Constants.expoConfig.extra.APP_ENV,

    APP_PROTOCOL: Constants.expoConfig.extra.APP_PROTOCOL,
    APP_HOST: Constants.expoConfig.extra.APP_HOST,

    PLANNER_API_PROTOCOL: Constants.expoConfig.extra.PLANNER_API_PROTOCOL,
    PLANNER_API_HOST: Constants.expoConfig.extra.PLANNER_API_HOST,
    PLANNER_API_ENDPOINT: `${Constants.expoConfig.extra.PLANNER_API_PROTOCOL}://${Constants.expoConfig.extra.PLANNER_API_HOST}`,

    CLOUD_STORAGE_POROTO_PLACE_IMAGES:
        Constants.expoConfig.extra.CLOUD_STORAGE_POROTO_PLACE_IMAGES,
    CLOUD_STORAGE_IMAGE_BUCKET_NAME:
        Constants.expoConfig.extra.CLOUD_STORAGE_IMAGE_BUCKET_NAME,
    CLOUD_STORAGE_IMAGE_BUCKET_PROTOCOL:
        Constants.expoConfig.extra.CLOUD_STORAGE_IMAGE_BUCKET_PROTOCOL,
    CLOUD_STORAGE_IMAGE_BUCKET_HOST:
        Constants.expoConfig.extra.CLOUD_STORAGE_IMAGE_BUCKET_HOST,

    IMAGE_OPTIMIZATION_API_PROTOCOL:
        Constants.expoConfig.extra.IMAGE_OPTIMIZATION_API_PROTOCOL,
    IMAGE_OPTIMIZATION_API_HOST:
        Constants.expoConfig.extra.IMAGE_OPTIMIZATION_API_HOST,
} as const;
