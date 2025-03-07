const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000/api'
    : 'https://ivanchenkoel7.dev/api';

// Agregamos logs para diagnóstico
console.log('Ambiente:', process.env.NODE_ENV);
console.log('API URL configurada:', API_URL);

export default API_URL;