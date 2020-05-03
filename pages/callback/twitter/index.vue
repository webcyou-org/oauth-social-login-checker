<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon ap-twitter"></span>
            Twitter
        </h2>
        <table class="table mt-20 mb-50">
            <thead>
                <tr>
                    <th>name</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Version</td>
                    <td>OAuth 1.0</td>
                </tr>
                <tr
                    v-for="(value, name, index) in callBackQueryData"
                    :key="index"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
                <tr v-if="callBackQueryData.oauth_verifier">
                    <td>Consumer Key</td>
                    <td>
                        <p class="input long">
                            <input v-model="consumerKey" type="text" />
                        </p>
                    </td>
                </tr>
                <tr v-if="callBackQueryData.oauth_verifier">
                    <td>Consumer Secret</td>
                    <td>
                        <p class="input long">
                            <input v-model="consumerSecret" type="text" />
                        </p>
                    </td>
                </tr>
                <template v-if="callBackUserData">
                    <tr
                        v-for="(value, name, index) in callBackUserData"
                        :key="`'callBackUserData'${index}`"
                    >
                        <td>{{ name }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
            </tbody>
        </table>

        <ul class="btnList center">
            <li
                v-if="!callBackQueryData.oauth_verifier"
                class="btn green large"
                @click="onClickGetAccessToken"
            >
                <a>Get AccessToken</a>
            </li>
            <li v-else class="btn green large" @click="onClickFetchUser">
                <a>Fetch User</a>
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
export default class CallBack extends Vue {
    consumerKey: string = ''
    consumerSecret: string = ''
    callBackQueryData: any
    callBackUserData: any = null

    asyncData({ query }: { query: any }) {
        return {
            callBackQueryData: query || null
        }
    }

    async onClickGetAccessToken(): Promise<void> {
        await this.$axios
            .post(
                '/twitter_api/oauth/access_token',
                queryString.stringify({
                    oauth_token: this.callBackQueryData.oauth_token,
                    oauth_verifier: this.callBackQueryData.oauth_verifier
                })
            )
            .then((res: any) => {
                this.callBackQueryData = queryString.parse(res.data)
            })
    }

    async onClickFetchUser(): Promise<void> {
        const httpMethod = 'GET'
        const url =
            'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true&skip_status=true&include_entities=false'
        const timestamp = Math.floor(Date.now() / 1000)
        const parameters = {
            oauth_consumer_key: this.consumerKey,
            oauth_token: this.callBackQueryData.oauth_token,
            oauth_nonce: '12345',
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0'
        }
        const signature = OAuthSignature.generate(
            httpMethod,
            url,
            parameters,
            this.consumerSecret,
            this.callBackQueryData.oauth_verifier
        )

        // ?include_email=true&skip_status=true&include_entities=false
        await this.$axios
            .get('/twitter_api/1.1/account/verify_credentials.json', {
                headers: {
                    Authorization: `OAuth oauth_consumer_key="${this.consumerKey}",oauth_token="${this.callBackQueryData.oauth_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="12345",oauth_version="1.0",oauth_signature="${signature}"`
                }
            })
            .then((res: any) => {
                this.callBackUserData = res.data
            })
    }
}
</script>
<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 40px;
}
.title {
    &.provider {
        font-size: 30px;
        & > .icon {
            font-size: 30px;
        }
    }
}
</style>
