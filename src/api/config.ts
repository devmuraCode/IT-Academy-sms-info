import axios from 'axios'

export const API_URL = process.env.REACT_APP_API

//Создание конфига. Базовый URL и другие опции
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

//Перехватчик. Вставляет токен перед отправкой запроса
instance.interceptors.request.use((config) => {
    //config.headers['Accept-Language'] = i18next.language;
    if (localStorage.getItem('Token')) {
        // @ts-ignore
        config.headers.Authorization = 'Token ' + localStorage.getItem('Token')
    }
    return config
})


//Перехватчик ответа. Если выйдет ошибка 401 на каком либо запросе, то удалить токен
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) localStorage.removeItem('Token')
    return Promise.reject(error);
});

export default instance;