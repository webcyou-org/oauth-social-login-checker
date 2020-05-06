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
                    <td>Openid Connect</td>
                </tr>
                <tr>
                    <td>client_id</td>
                    <td>
                        <p class="input long">
                            <input v-model="clientId" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>client_secret</td>
                    <td>
                        <p class="input long">
                            <input v-model="clientSecret" type="text" />
                        </p>
                    </td>
                </tr>
                <tr v-for="(value, name, index) in callBackData" :key="index">
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
                <tr>
                    <td>redirect_uri</td>
                    <td>http://localhost:3000/callback</td>
                </tr>
                <template v-if="responseData">
                    <tr
                        v-for="(value, name, index) in responseData"
                        :key="`responseData${index}`"
                    >
                        <td>{{ name }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
                <tr v-if="verificationData">
                    <td>VerificationData</td>
                    <td>
                        <pre>{{ verificationData }}</pre>
                    </td>
                </tr>
                <tr v-if="userData">
                    <td>userData</td>
                    <td>
                        <pre>{{ userData }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>

        <ul class="btnList center">
            <li
                v-if="!responseData"
                class="btn green large"
                @click="onClickRequest"
            >
                <a>Request AccessToken</a>
            </li>
            <li v-else class="btn green large" @click="onClickVerification">
                <a>Token Verification</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { merge } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component
export default class GoogleCallBack extends Vue {
    @Prop() readonly callBackData: any | undefined

    clientId: string = ''
    clientSecret: string = ''
    responseData: any = ''
    verificationData: any = ''
    userData: string = ''

    created() {
        const callBackData = merge({ name: 'google' }, this.callBackData)
        this.$store.dispatch(oAuthActionTypes.setProvider, callBackData)
    }

    async onClickRequest(): Promise<void> {
        await this.$store.dispatch(oAuthActionTypes.updateProvider, {
            name: 'google',
            clientId: this.clientId,
            clientSecret: this.clientSecret
        })
        await this.$store
            .dispatch(oAuthActionTypes.googleRequestToken)
            .then((res: any) => {
                console.log(res)
                this.responseData = res
            })
    }

    async onClickVerification(): Promise<void> {
        await this.$axios
            .get(
                `https://graph.facebook.com/debug_token?input_token=${this.responseData.access_token}&access_token=${this.clientId}|${this.clientSecret}`
            )
            .then((res: any) => {
                this.verificationData = res.data.data
            })
    }
}
</script>
