// PROD - other than dev environment
const prod = {
        url: {
            KEYCLOAK_BASE_URL: 'https://keycloak.herokuapp.com',
            API_BASE_URL: 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api',  //sever-api_UI
        },
    };
    
    const dev = {
        url: {
            KEYCLOAK_BASE_URL: 'http://localhost:8080',
            API_BASE_URL: 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api', // http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api || http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api =need change To local_api_UI sever.
        },
    };
    
    export const config = process.env.NODE_ENV === 'development' ? dev : prod;
    
    export function getAPIUrl() {
        return `${config.url.API_BASE_URL}`;
    }