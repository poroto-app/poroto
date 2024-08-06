import { ConfigContext } from "@expo/config"

export default ({ config }: ConfigContext) => {
  // env
  config.extra = {
    ...config.extra,
    APP_ENV: process.env.APP_ENV,

    APP_PROTOCOL: process.env.APP_PROTOCOL,
    APP_HOST: process.env.APP_HOST,

    PLANNER_API_PROTOCOL:  process.env.PLANNER_API_PROTOCOL,
    PLANNER_API_HOST: process.env.PLANNER_API_HOST,

    CLOUD_STORAGE_POROTO_PLACE_IMAGES: process.env.CLOUD_STORAGE_POROTO_PLACE_IMAGES,
    CLOUD_STORAGE_IMAGE_BUCKET_NAME: process.env.CLOUD_STORAGE_IMAGE_BUCKET_NAME,
    CLOUD_STORAGE_IMAGE_BUCKET_PROTOCOL: process.env.CLOUD_STORAGE_IMAGE_BUCKET_PROTOCOL,
    CLOUD_STORAGE_IMAGE_BUCKET_HOST: process.env.CLOUD_STORAGE_IMAGE_BUCKET_HOST,

    IMAGE_OPTIMIZATION_API_PROTOCOL: process.env.IMAGE_OPTIMIZATION_API_PROTOCOL,
    IMAGE_OPTIMIZATION_API_HOST: process.env.IMAGE_OPTIMIZATION_API_HOST,
  }

  config.android.config = {
    ...config.android.config,
    googleMaps: {
      apiKey: process.env.GCP_ANDROID_API_KEY,
    },
  }

  return {
    ...config,
  }
}
