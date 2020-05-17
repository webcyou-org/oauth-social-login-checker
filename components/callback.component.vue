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
                <tr>
                    <td>Grant Type</td>
                    <td>{{ provider.grantType }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>client_id</td>
                    <td>
                        <p class="input long">
                            <input v-model="provider.clientId" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>client_secret</td>
                    <td>
                        <p class="input long">
                            <input
                                v-model="provider.clientSecret"
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
            <li
                v-if="provider.isSetParams"
                class="btn green large"
                @click="onClickRequest"
            >
                <a>Request AccessToken</a>
            </li>
            <li v-else class="btn green large" @click="onClickFetchData">
                <a>Fetch Data</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { merge, cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'
import { ActionTypes as oAuthFlowActionTypes } from '~/store/oAuthFlowModule'

import { sleep } from '~/lib/utility/sleep'

@Component
export default class ProviderCallBack extends Vue {
    @Prop() readonly callBackData: any | undefined

    provider: any
    responseData: any = null

    created() {
        const callBackData = merge(
            { name: this.callBackData.state },
            this.callBackData
        )
        this.$store.dispatch(oAuthActionTypes.setSelectedProvider, {
            name: this.callBackData.state
        })
        this.updateProvider(callBackData)
        this.$store.dispatch(oAuthActionTypes.providerChangeRequest)
        this.provider = cloneDeep(this.selectedProvider)
        this.showOAuthFlow(8)
    }

    get selectedProvider(): any {
        return this.$store.state.oAuthModule.selectedProvider
    }

    async onClickRequest(): Promise<void> {
        await this.updateProvider(this.provider)
        await this.showOAuthFlow()
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
        await this.showOAuthFlow()
        await this.$store
            .dispatch(oAuthActionTypes.providerRequest)
            .then((response: any) => {
                this.responseData = response
            })
    }

    async updateProvider(updateData: any): Promise<void> {
        await this.$store.dispatch(oAuthActionTypes.updateProvider, updateData)
        this.$store.dispatch(oAuthActionTypes.setSelectedProvider, {
            name: this.provider.name
        })
    }

    async showOAuthFlow(num?: any): Promise<void> {
        await this.$store.dispatch(oAuthFlowActionTypes.update, {
            stepNumber: num || this.provider.stepNumber,
            isShow: true
        })
        await sleep(5000)
        await this.$store.dispatch(oAuthFlowActionTypes.hide)
    }
}
</script>
