import { toastController } from '@ionic/vue';
import { ref, reactive, Ref, computed } from 'vue';
import { showAlert } from '@/composables/loader';
import { PushNotifications } from '@capacitor/push-notifications';
import { useFirebaseStore } from '../store/firebaseStore';
import { storeToRefs } from 'pinia';

export const useCapacitorNotifications = () => {
  const { myToken } = storeToRefs(useFirebaseStore());
  const addListeners = async () => {
    await PushNotifications.addListener('registration', async (token) => {
      /*let alert = await showAlert(`Token: ${token.value}`);
      alert.present();*/
      myToken.value = token.value;
    });

    await PushNotifications.addListener('registrationError', async (err) => {
      let alert = await showAlert(`Registration error: ${err.error}`);
      alert.present();
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification) => {
        let toast = await toastController.create({
          message: notification.title + ' ' + notification.body,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      }
    );

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  };

  const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
      await addListeners();

      await PushNotifications.register();
    
  };

  const getDeliveredNotifications = computed(async () => {
    return await PushNotifications.getDeliveredNotifications();
  });
  return { addListeners, registerNotifications, getDeliveredNotifications };
};
