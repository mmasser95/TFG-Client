import { ref, reactive, Ref, computed } from 'vue';
import { showAlert } from '@/composables/loader';
import { PushNotifications } from '@capacitor/push-notifications';
import { sendFirebaseToken } from '@/APIService';
import { showAlert } from '@/composables/loader';
import { useFirebaseStore } from '../store/firebaseStore';
import { storeToRefs } from 'pinia';

export const useCapacitorNotifications = () => {
  const { myToken } = storeToRefs(useFirebaseStore());
  const addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      sendFirebaseToken(token)
        .then((res) => {
          myToken.value = token.value;
        })
        .catch(async (err) => {
          let alert = await showAlert(`Error: ${err}`);
          alert.present();
        });
    });

    await PushNotifications.addListener('registrationError', async (err) => {
      let alert = await showAlert(`Registration error: ${err.error}`);
      alert.present();
    });

    await PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
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
    try {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
      let alert = await showAlert("S'esta registrant");
      alert.present();
      await PushNotifications.register();
    } catch (err) {
      let alert = await showAlert(`Error: ${err.message}`);
      alert.present();
    }
  };

  const getDeliveredNotifications = computed(async () => {
    return await PushNotifications.getDeliveredNotifications();
  });
  return { addListeners, registerNotifications, getDeliveredNotifications };
};
