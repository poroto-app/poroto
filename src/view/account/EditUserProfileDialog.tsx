import {
    Box,
    Button,
    Center,
    HStack,
    Icon,
    Input,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import {
    MdArrowBack,
    MdClose,
    MdPhotoCamera,
    MdZoomIn,
    MdZoomOut,
} from "react-icons/md";
import { User } from "src/domain/models/User";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Padding } from "src/view/constants/padding";
import { useCropImage } from "src/view/hooks/useCropImage";

type Props = {
    isVisible: boolean;
    user: User;
    onSaveProfile?: (props: {
        name?: string;
        profileImageUrl?: string;
    }) => void;
    onClose?: () => void;
};

export function EditUserProfileDialog({
    user,
    isVisible,
    onSaveProfile,
    onClose,
}: Props) {
    const [userName, setUserName] = useState(user.name);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isLoadingFileInput, setIsLoadingFileInput] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleOnEditPhoto = () => {
        fileInputRef.current?.click();
    };

    const onFileChanged = ({ files }: { files: FileList | null }) => {
        setIsLoadingFileInput(false);
        if (!files || files.length === 0) {
            return;
        }
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setIsLoadingFileInput(false);
            const dataUrl = reader.result as string;
            setImageToCrop(dataUrl);
        };
        setIsLoadingFileInput(true);
        reader.readAsDataURL(file);
    };

    const handleOnSave = () => {
        onSaveProfile?.({ name: userName });
    };

    const handleOnCloseImageEditor = () => {
        setImageToCrop(null);

        // 同じ画像が選択された時にもイベントが発火するようにするためリセットする
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleOnCropImage = ({
        croppedImage,
    }: {
        croppedImage: string | null;
    }) => {
        setImageToCrop(null);
        handleOnCloseImageEditor();
        if (!croppedImage) return;
        setCroppedImage(croppedImage);
    };

    return (
        <FullscreenDialog
            visible={isVisible}
            onClickOutside={onClose}
            paddingY={Padding.p16}
            paddingX={Padding.p8}
        >
            <RoundedDialog>
                <VStack minH="500px">
                    {imageToCrop ? (
                        <ProfileImageEditor
                            src={imageToCrop}
                            onSave={handleOnCropImage}
                            onClose={handleOnCloseImageEditor}
                        />
                    ) : (
                        <ProfileEditor
                            userName={userName}
                            profileImageUrl={croppedImage ?? user.avatarImage}
                            isLoadingFileInput={isLoadingFileInput}
                            onUpdateUserName={setUserName}
                            onUpdateProfileImage={handleOnEditPhoto}
                            onClose={onClose}
                            onSave={handleOnSave}
                        />
                    )}
                </VStack>
            </RoundedDialog>
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) =>
                    onFileChanged({
                        files: e.target.files,
                    })
                }
                style={{ display: "none" }}
            />
        </FullscreenDialog>
    );
}

function ProfileEditor({
    userName,
    profileImageUrl,
    isLoadingFileInput,
    onUpdateUserName,
    onUpdateProfileImage,
    onClose,
    onSave,
}: {
    userName: string;
    profileImageUrl: string;
    isLoadingFileInput?: boolean;
    onUpdateUserName: (name: string) => void;
    onUpdateProfileImage: () => void;
    onClose: () => void;
    onSave: () => void;
}) {
    const [focusUserName, setFocusUserName] = useState(false);

    return (
        <VStack
            w="100%"
            h="100%"
            px={Padding.p16}
            py={Padding.p16}
            flex={1}
            spacing={Padding.p16}
            justifyContent="space-between"
        >
            <HStack w="100%" pb={Padding.p16}>
                <Text flex={1} fontWeight="semibold" fontSize={18}>
                    プロフィールを編集
                </Text>
                <Center as="button" onClick={onClose}>
                    <Icon
                        w="24px"
                        h="24px"
                        color="rgba(0,0,0,.5)"
                        as={MdClose}
                    />
                </Center>
            </HStack>
            <Box position="relative" pb="16px">
                <Box
                    width="200px"
                    height="200px"
                    backgroundColor="gray.200"
                    borderRadius="100%"
                    overflow="hidden"
                >
                    <ImageWithSkeleton src={profileImageUrl} />
                </Box>
                <Center
                    w="100%"
                    position="absolute"
                    right={0}
                    bottom={0}
                    left={0}
                >
                    <HStack
                        as="button"
                        border="1px solid rgba(0,0,0,.1)"
                        backgroundColor="white"
                        borderRadius="100"
                        px={Padding.p16}
                        py={Padding.p8}
                        boxShadow="rgba(0, 0, 0, 0.12) 0px 6px 16px 0px"
                        onClick={onUpdateProfileImage}
                    >
                        {isLoadingFileInput ? (
                            <Spinner size="sm" color="blue.500" />
                        ) : (
                            <Icon
                                w="24px"
                                h="24px"
                                color="rgba(0,0,0,.7)"
                                as={MdPhotoCamera}
                            />
                        )}
                        <Text fontWeight={600} fontSize={14}>
                            編集
                        </Text>
                    </HStack>
                </Center>
            </Box>
            <VStack
                w="100%"
                border={`1px solid ${focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.1)"}`}
                alignItems="flex-start"
                px={Padding.p8}
                py={Padding.p4}
                spacing={0}
                borderRadius="8px"
            >
                <Text
                    color={
                        focusUserName ? "rgba(29,155,240)" : "rgba(0,0,0,.6)"
                    }
                    fontSize="12px"
                >
                    名前
                </Text>
                <Input
                    border="none"
                    value={userName}
                    px={0}
                    py={0}
                    height="auto"
                    onChange={(e) => onUpdateUserName(e.target.value)}
                    _focus={{ border: "none", boxShadow: "none" }}
                    onFocus={() => setFocusUserName(true)}
                    onBlur={() => setFocusUserName(false)}
                />
            </VStack>
            <RoundedButton onClick={onSave}>
                <Text>保存</Text>
            </RoundedButton>
        </VStack>
    );
}

function ProfileImageEditor({
    src,
    onClose,
    onSave,
}: {
    src: string;
    onSave: (params: { croppedImage: string }) => void;
    onClose: () => void;
}) {
    const {
        crop,
        zoom,
        isCropInProgress,
        setCrop,
        setZoom,
        cropImage,
        onCropComplete,
    } = useCropImage({
        originalImageSrc: src,
    });

    const handleSave = async () => {
        const croppedImage = await cropImage();
        onSave({ croppedImage });
    };

    return (
        <VStack w="100%" h="100%" flex={1}>
            <HStack w="100%" px={Padding.p16} py={Padding.p16}>
                <Center as="button" onClick={onClose}>
                    <Icon
                        w="24px"
                        h="24px"
                        color="rgba(0,0,0,.5)"
                        as={MdArrowBack}
                    />
                </Center>
                <Text flex={1} fontWeight="semibold" fontSize={18}>
                    写真を編集
                </Text>
                <Button
                    colorScheme="blue"
                    borderRadius="100px"
                    onClick={handleSave}
                    isLoading={isCropInProgress}
                >
                    保存
                </Button>
            </HStack>
            <Box flex={1} width="100%" overflow="hidden" position="relative">
                <Cropper
                    image={src}
                    onCropChange={setCrop}
                    crop={crop}
                    cropShape="round"
                    zoom={zoom}
                    aspect={1}
                    onCropComplete={onCropComplete}
                    showGrid={false}
                />
            </Box>
            <VStack px={Padding.p16} py={Padding.p16} w="100%">
                <Center w="100%">
                    <HStack w="100%" maxW="300px">
                        <Icon
                            w="24px"
                            h="24px"
                            color="rgba(0,0,0,.5)"
                            as={MdZoomOut}
                        />
                        <Slider
                            aria-label="slider-ex-1"
                            defaultValue={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            flex={1}
                            onChange={(value) => setZoom(value)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Icon
                            w="24px"
                            h="24px"
                            color="rgba(0,0,0,.5)"
                            as={MdZoomIn}
                        />
                    </HStack>
                </Center>
            </VStack>
        </VStack>
    );
}
