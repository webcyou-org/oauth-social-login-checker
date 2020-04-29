# OAuth Social Login Checker

## Google

OAuth2.0

### Resource URL

GET https://accounts.google.com/o/oauth2/v2/auth

### Parameters

| Name | Type | Required |
|:---------|:---------|:---------|
| client_id | string | true |
| redirect_uri | string | true |
| response_type | string | true |
| scope | string | true |
| access_type | string | |
| state | string | |
| include_granted_scopes | string | |
| login_hint | string | |
| prompt | string | |


## Facebook

OAuth2.0

### Resource URL

GET https://www.facebook.com/dialog/oauth

| Name | Type | Required |
|:---------|:---------|:---------|
| client_id | string | true |
| redirect_uri | string | true |
| state | string |  |
| response_type | string |  |
| scope | string |  |


## Twitter

OAuth1

### Resource URL

POST https://api.twitter.com/oauth/request_token

### Parameters

| Name | Type | Required |
|:---------|:---------|:---------|
| oauth_callback | string | true |
| x_auth_access_type | string | optional |

### Authorization Header Parameters

OAuth 

Required Consumer Key & Consumer Secret

| Name | Type | Required |
|:---------|:---------|:---------|
| oauth_consumer_key | string | true |
| oauth_signature_method | string | HMAC-SHA1 |
| oauth_timestamp | | |
| oauth_nonce |||
| oauth_version | | 1.0 |
| oauth_signature | | true |

### Resource URL

GET https://api.twitter.com/oauth/authenticate

### Parameters

| Name | Type | Required |
|:---------|:---------|:---------|
| oauth_token |  | true |


### Resource URL

POST https://api.twitter.com/oauth/access_token

### Parameters


## GitHub

OAuth2.0

### Resource URL

GET https://github.com/login/oauth/authorize

### Parameters

| Name | Type | Required |
|:---------|:---------|:---------|
| client_id | string | true |
| redirect_uri | string | |
| login | string | |
| scope | string | |
| state | string | |
| allow_signup | string | |
