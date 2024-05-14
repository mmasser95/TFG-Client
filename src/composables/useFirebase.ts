import { ref, reactive, Ref, computed } from 'vue';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {sendFirebaseToken} from '@/APIService/utils'
import { useFirebaseStore } from '@/store/firebaseStore';
import { storeToRefs } from 'pinia';
import { toastController } from '@ionic/vue';

export const useFirebase = () => {
  const {myToken}=storeToRefs(useFirebaseStore())
  const firebaseConfig = reactive({
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
  });
  const app = initializeApp(firebaseConfig);
  const initialize = () => {
    try {
      let messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          'BC49ue7_lVKUlKDx1KHbb7takiKSGkA-cajRyMSQWFlxs8ly-pEMiI3JJpajX2E7Vlrs1usy7KBadc2NRs-N0Wg',
      })
        .then((currentToken) => {
          if (currentToken) {
            myToken.value=currentToken
            sendFirebaseToken(currentToken,(err:any)=>{
              return
            })
          } else {
            // Show permission request UI
            console.log(
              'No registration token available. Request permission to generate one.'
            );
            // ...
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });

      onMessage(messaging,async (payload) => {
        console.log('payload :>> ', payload);
        let toast=await toastController.create({
          message:payload.notification?.title+" "+payload.notification?.body,
          duration:5000,
          position:'bottom'
        })
        toast.present()
        // ...
      }); /*
    onBackgroundMessage(messaging, (payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
      };
  
      self.registration.showNotification(notificationTitle,
        notificationOptions);
    });*/
    } catch (err) {
      console.log(err);
    }
  };
  return { firebaseConfig,app,initialize };
};
