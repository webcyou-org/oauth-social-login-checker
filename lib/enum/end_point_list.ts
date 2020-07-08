export enum GoogleURI {
    LOGIN = 'https://accounts.google.com/o/oauth2/v2/auth',
    REQUEST_TOKEN = '/google_oauth2/token'
}

export enum GitHubURI {
    LOGIN = 'https://github.com/login/oauth/authorize',
    ACCESS_TOKEN = '/github/login/oauth/access_token',
    FETCH_USER = '/github_api/user'
}

export enum FacebookURI {
    GRAPH_API = '/facebook/',
    LOGIN = 'https://www.facebook.com/dialog/oauth',
    ACCESS_TOKEN = '/facebook/v6.0/oauth/access_token',
    VERIFICATION = '/facebook/debug_token'
}

export enum TwitterURI {
    DOMAIN = 'https://api.twitter.com',
    REQUEST_TOKEN = '/twitter_api/oauth/request_token',
    // LOGIN = 'https://api.twitter.com/oauth/authenticate',
    LOGIN = 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN = '/twitter_api/oauth/access_token',
    VERIFY_CREDENTIALS = '/twitter_api/1.1/account/verify_credentials.json',
    FETCH_USER = 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true&skip_status=true&include_entities=false'
}