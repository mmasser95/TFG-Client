import { ref, onMounted, watch } from 'vue'
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export const usePhotoGallery = () => {
    const photos=ref<MyPhoto[]>([]);
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const filename=Date.now()+'.jpeg';
        const savedFileImage={
            filepath:filename,
            webviewPath:photo.webPath
        }
        photos.value=[savedFileImage, ...photos.value]
    };

    return {
        takePhoto,
        photos
    };
};

export interface MyPhoto{
    filepath: string,
    webviewPath?:string,
}