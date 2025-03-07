import axios from 'axios';
import { toast } from 'react-toastify';

const credentials = {
    username: 'ivanchenkoel7',
    password: 'ivan290690'
};

export const initializeAuth = async () => {
    try {
        const response = await axios.post('https://ivanchenkoel7.dev/admin/login/', 
            new URLSearchParams(credentials),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }
        );
        
        if (response.status === 200) {
            console.log('Autenticación exitosa');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error de autenticación:', error);
        toast.error('Error de autenticación');
        return false;
    }
};