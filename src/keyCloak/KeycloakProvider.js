// import React, { createContext, useContext } from 'react';
// import Keycloak from 'keycloak-js';

// const KeycloakContext = createContext();

// export function useKeycloak() {
//     return useContext(KeycloakContext);
// }

// const KeycloakProvider = ({ children }) => {
//     const keycloak = new Keycloak({
//         realm: 'test',
//         'auth-server-url': 'http://192.168.80.168:8080/auth',
//         'ssl-required': 'none',
//         'public-client': true,
//         clientId: 'myclient',
//     });

//     return <KeycloakContext.Provider value={keycloak}>{children}</KeycloakContext.Provider>;
// };
// export default KeycloakProvider;
import React, { createContext, useContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakContext = createContext();

export function useKeycloak() {
    return useContext(KeycloakContext);
}

const KeycloakProvider = ({ children }) => {
    const [keycloak, setKeycloak] = useState(null);

    useEffect(() => {
        const initKeycloak = async () => {
            const keycloakInstance = new Keycloak({
                realm: 'test',
                'auth-server-url': 'http://192.168.80.168:8080/auth',
                'ssl-required': 'none',
                'public-client': true,
                clientId: 'myclient',
            });

            try {
                await keycloakInstance.init({
                    onLoad: 'login-required',
                    checkLoginIframe: false,
                    flow:'implicit',
                    adapter:'cordova-native'
                });
                setKeycloak(keycloakInstance);
            } catch (error) {
                console.error('Keycloak initialization error:', error);
            }
        };

        initKeycloak();
    }, []); // Empty dependency array ensures this effect runs once on mount

    if (!keycloak) {
        return <div>Loading Keycloak...</div>;
    }

    return <KeycloakContext.Provider value={keycloak}>{children}</KeycloakContext.Provider>;
};

export default KeycloakProvider;
