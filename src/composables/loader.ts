import { loadingController, alertController } from '@ionic/vue';

export async function showLoading(message: string) {
  return await loadingController.create({
    message,
    spinner: 'lines-sharp',
    cssClass: 'loader',
  });
}

export async function showAlert(message:string) {
  return await alertController.create({
    header: 'Missatge del sistema',
    message,
    buttons: ['Ok'],
  });
}
