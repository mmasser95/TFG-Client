import { ref, onMounted, watch } from 'vue';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

import { Image } from 'image-js';

const preprocessImage = async (imagePath: any) => {
  let img = await Image.load(imagePath);
  console.log(imagePath, await img.toBlob());
  img = img.grey();
  img=img.medianFilter()
  //   img=img.medianFilter({ radius: 3 });
  //   img=img.sobelFilter();
     img=img.resize({ width: 1200 });

  return await img.toDataURL();
};

export const usePhotoGallery = () => {
  const photos = ref<MyPhoto[]>([]);
  const unProcessedlastPhoto = ref<MyPhoto>();
  const lastPhoto = ref<MyPhoto>({ filepath: '', webviewPath: '' });

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const filename = Date.now() + '.jpeg';
    const savedFileImage = {
      filepath: filename,
      webviewPath: photo.webPath,
    };
    photos.value = [savedFileImage, ...photos.value];
    unProcessedlastPhoto.value = savedFileImage;

    lastPhoto.value.webviewPath = await preprocessImage(
      unProcessedlastPhoto.value.webviewPath
    );
  };

  return {
    takePhoto,
    photos,
    lastPhoto,
  };
};

export interface MyPhoto {
  filepath: string;
  webviewPath?: string;
}
