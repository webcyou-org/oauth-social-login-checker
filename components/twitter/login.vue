<template>
    <div>
        <table class="table mt-20 mb-50">
            <thead>
                <tr>
                    <th>name</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Grant Type</td>
                    <td>Authorization Code</td>
                </tr>
                <tr>
                    <td>Consumer Key</td>
                    <td>
                        <p class="input long">
                            <input v-model="consumerKey" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Consumer Secret</td>
                    <td>
                        <p class="input long">
                            <input v-model="consumerSecret" type="text" />
                        </p>
                    </td>
                </tr>
                <tr
                    v-for="(value, name, index) in requestTokenResponseData"
                    :key="index"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>
        <ul class="btnList center">
            <li class="btn green large" @click="onClickRequest">
                <a>Request</a>
            </li>
            <li
                v-if="requestTokenResponseData.oauth_token"
                class="btn green large"
                @click="onClickLogin"
            >
                <a>Login</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import queryString from 'query-string'
const OAuthSignature = require('oauth-signature')

@Component({})
export default class TwitterLogin extends Vue {
    consumerKey: string = ''
    consumerSecret: string = ''
    requestTokenResponseData: any = {}

    async onClickRequest(): Promise<void> {
        const httpMethod = 'GET'
        const url = 'https://api.twitter.com/oauth/request_token'
        const timestamp = Math.floor(Date.now() / 1000)
        const parameters = {
            oauth_consumer_key: this.consumerKey,
            oauth_nonce: '12345',
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        }
        const signature = OAuthSignature.generate(
            httpMethod,
            url,
            parameters,
            this.consumerSecret
        )

        await this.$axios
            .get('/twitter_api/oauth/request_token', {
                headers: {
                    Authorization: `OAuth oauth_consumer_key="${this.consumerKey}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="12345",oauth_version="1.0",oauth_signature="${signature}"`
                }
            })
            .then((res: any) => {
                this.requestTokenResponseData = queryString.parse(res.data)
            })
    }

    onClickLogin() {
        location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${this.requestTokenResponseData.oauth_token}&oauth_callback=http%3A%2F%2Flocalhost%3A3000%2Fcallback`
    }
}
</script>
