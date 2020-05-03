export const GRANT = {
    VALUE_LIST: [{
            name: 'Authorization Code',
            value: 'authorization_code'
        },
        {
            name: 'Implicit',
            value: 'implicit'
        },
        {
            name: 'Client Credentials',
            value: 'client_credentials'
        },
        {
            name: 'Resource Owner Password Credentials',
            value: 'resource_owner_password_credentials'
        },
        {
            name: 'Hybrid Flow',
            value: 'hybrid_flow'
        }],
    TYPE: {
        AUTHORIZATION_CODE: {
            NAME: 'Authorization Code',
            VALUE: 'authorization_code'
        },
        IMPLICIT: {
            NAME: 'Implicit',
            VALUE: 'implicit'
        },
        CLIENT_CREDENTIALS: {
            NAME: 'Client Credentials',
            VALUE: 'client_credentials'
        },
        RESOURCE_OWNER_PASSWORD_CREDENTIALS: {
            NAME: 'Resource Owner Password Credentials',
            VALUE: 'resource_owner_password_credentials'
        },
        HYBRID_FLOW: {
            NAME: 'Hybrid Flow',
            VALUE: 'hybrid_flow'
        }
    }
}
