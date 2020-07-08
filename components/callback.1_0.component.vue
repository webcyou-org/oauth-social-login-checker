<template>
    <div>
        <table class="table mt-20 mb-50">
            <thead>
                <tr>
                    <th style="width: 20%">name</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="provider.grantType">
                    <td>Grant Type</td>
                    <td>{{ provider.grantType }}</td>
                </tr>
                <tr>
                    <td>Version</td>
                    <td>OAuth 1.0</td>
                </tr>
                <tr>
                    <td>Consumer Key</td>
                    <td>
                        <p class="input long">
                            <input v-model="provider.consumerKey" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>Consumer Secret</td>
                    <td>
                        <p class="input long">
                            <input
                                v-model="provider.consumerSecret"
                                type="text"
                            />
                        </p>
                    </td>
                </tr>
                <template
                    v-for="(value,
                    name,
                    index) in provider.callBackDisplayObject"
                >
                    <tr v-if="value !== null" :key="index">
                        <td>{{ name }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
                <tr
                    v-for="(value, name, index) in responseData"
                    :key="`response${index}`"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>

        <ul class="btnList center">
            <li class="btn green large" @click="onClickFetchData">
                <a v-if="provider.requestStep !== 'fetchUser'">
                    Request AccessToken
                </a>
                <a v-else>Fetch User</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { merge, cloneDeep } from 'lodash'
import queryString from 'query-string'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'
import { ActionTypes as storageActionTypes } from '~/store/storageModule'

@Component
export default class ProviderCallBack1 extends Vue {
    @Prop() readonly callBackData: any | undefined

    provider: any
    responseData: any = null

    created() {
        const callBackData = merge(
            { name: this.callBackData.name },
            this.callBackData
        )
        this.$store.dispatch(oAuthActionTypes.setProvider, {
            name: this.callBackData.name
        })
        this.updateProvider(callBackData)
        this.$store.dispatch(oAuthActionTypes.providerChangeRequest)
        this.provider = cloneDeep(this.selectedProvider)
    }

    get selectedProvider(): any {
        return this.$store.state.oAuthModule.provider
    }

    async onClickRequest(): Promise<void> {
        await this.updateProvider(this.provider)
        await this.$store
            .dispatch(oAuthActionTypes.providerRequest)
            .then((response: any) => {
                const responseData = merge(
                    { name: this.provider.name },
                    response
                )
                this.updateProvider(responseData)
            })
        await this.$store.dispatch(oAuthActionTypes.providerChangeRequest)
        this.provider = cloneDeep(this.selectedProvider)
        this.$forceUpdate()
    }

    async onClickFetchData(): Promise<void> {
        await this.updateProvider(this.provider)
        await this.$store
            .dispatch(oAuthActionTypes.providerRequest)
            .then((response: any) => {
                const responseObject = queryString.parse(response)
                console.log(queryString.parse(response))
                this.responseData = responseObject

                const updateObject = {
                    name: this.provider.name,
                    access_token: responseObject.oauth_token,
                    oauth_token_secret: responseObject.oauth_token_secret,
                    screen_name: responseObject.screen_name,
                    user_id: responseObject.user_id
                }
                this.updateProvider(updateObject)
            })
        await this.$store.dispatch(oAuthActionTypes.providerChangeRequest)
        this.provider = cloneDeep(this.selectedProvider)
        this.$forceUpdate()
    }

    async updateProvider(updateData: any): Promise<void> {
        await this.$store.dispatch(oAuthActionTypes.updateProvider, updateData)
        this.$store.dispatch(
            storageActionTypes.setStorageProvider,
            this.provider
        )
    }
}
</script>
