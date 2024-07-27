const {getDefaultConfig} = require("expo/metro-config");

module.exports = () => {
    const config = getDefaultConfig(__dirname);

    // svg: https://github.com/kristerkari/react-native-svg-transformer
    config.transformer = {
        ...config.transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
    };
    config.resolver = {
        ...config.resolver,
        assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...config.resolver.sourceExts, "svg"]
    };

    return config;
}