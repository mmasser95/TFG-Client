export const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});
export const axiosWrapper = (fn: Function, ...options?: any, cb: CallbackFunction) => {
  fn(...options)
    .then(response => {
      cb(null, response.data)
    }).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        cb({ status: error.response.status, message: error.response.data })
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        cb({ status: "No response", message: "No response received", request: error.request })
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        cb({ status: "General error", message: `No response received ${error.message}` })
      }
      console.log(error.config);
      cb({ status: "General error", message: "No response received", config: error.config })
    })
}
export const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
    },
  };
};

export const getMultiPartHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export async function getCoordinates(
  carrer: String,
  numero: number,
  city: String,
  provincia: String,
  CP: number
) {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          format: 'json',
          street: `${carrer} ${numero}`,
          city,
          county: provincia,
          country: 'Spain',
          postalcode: CP,
        },
      }
    );
    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log('error :>> ', error);
    return null;
  }
}

export function doIPLocation() {
  return axios.get('https://api.my-ip.io/v2/ip.json');
}

export function doTest() {
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler');
}



export function verificarToken() {
  return instance.get(`/verificar`, getHeaders());
}

//Firebase
export function sendFirebaseToken(token: any) {
  return instance.post(`/fcm`, { mode: 'add', token }, getHeaders());
}
export function deleteFirebaseToken(token: any) {
  return instance.post(`/fcm`, { mode: 'delete', token }, getHeaders());
}
export function testFCM() {
  return instance.get(`/fcm`, getHeaders());
}
//Utils
export function googleLogin(credential: any) {
  return instance.post(`/google`, { credential });
}
//Configuracio
export function getPerfil() {
  return instance.get(`/perfil`, getHeaders());
}
export function updatePerfil(userInfo: any) {
  return instance.put(`/perfil`, { ...userInfo }, getHeaders());
}