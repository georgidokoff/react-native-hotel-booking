import { authApi } from "./api.js";

export async function callLogin(login, password) {
    const result = await authApi.post('/login', { login, password });
    
    return result.data;
}

export async function callRegister(email, password, name) {
    if (!name) {
        name = email.split('@')[0];
    }
    
    const result = await authApi.post('/register', { email, password, name });
    
    return result.data;
}   

export async function callLoginGuest() {
    const result = await authApi.post('/register/guest', { });
   
    return result.data;
}

export async function callLogout(accessToken) {
    authApi.defaults.headers.common['user-token'] = accessToken;
    
    const result = await authApi.get(`/logout`);
    
    return result.data;
}