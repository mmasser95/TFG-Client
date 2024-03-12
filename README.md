# TFG-Client
Codi font de l'aplicació Client del Treball Final de Grau de Martí Masot Serrano

## Instalar dependencies
Abans d'arrancar el servidor de desenvolupament o compilar el projecte caldrà descarregar les dependències necessaries amb la comanda

```bash
npm install
```

## Arrancar servidor dev
Per a poder arrancar el servidor web de desenvolupament per a veure 

```bash
npm run dev
```

## Compilar el codi 
Per a compilar el projecte s'ha d'utilitzar la comanda
```bash
npm run build
```
La comanda s'encarrega de compilar el projecte tant en format web, com en format .apk
En format web es trobarà a la ruta:
```dist/```

I en format .apk es trobarà a la ruta:
```android/app/build/outputs/apk/debug/app-debug.apk```

Per a que es pugui compilar la APK cal declarar la variable d'entorn ```ANDROID_HOME``` que haurà d'apuntar a la carpeta arrel del SDK d'android i a més a mñes, caldrà declarar la variable ```JAVA_HOME``` que haurà d'apuntar a la carpeta on es troba JAVA
