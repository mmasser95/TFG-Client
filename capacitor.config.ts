import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mmasser95.flyfood',
  appName: 'FlyFood',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
};

export default config;
