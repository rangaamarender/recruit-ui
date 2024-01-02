import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    realm: 'test',
    'auth-server-url': 'http://192.168.80.168:8080/auth',
    'ssl-required': 'none',
    'public-client': true,
    clientId: 'myclient',
});

export default keycloak;
