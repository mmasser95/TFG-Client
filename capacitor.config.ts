import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mmasser95.flyfood',
  appName: 'FlyFood',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '981593687954-d0h9henugkvditar81b2jdmuo7o1rgum.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
      androidClientId:
        '981593687954-b1d85d1dobq1mmentruvk2hrr8v5cj66.apps.googleusercontent.com',
    },
  },
};

export default config;
