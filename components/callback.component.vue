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
            </tbody>
        </table>

        <ul class="btnList center">
            <li class="btn green large" @click="onClickRequest">
                <a>Request AccessToken</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { merge, cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component
export default class ProviderCallBack extends Vue {
    @Prop() readonly callBackData: any | undefined

    provider: any

    created() {
        const callBackData = merge(
            { name: this.callBackData.state },
            this.callBackData
        )
        this.$store.dispatch(oAuthActionTypes.setProvider, callBackData)
        this.$store.dispatch(oAuthActionTypes.setSelectedProvider, {
            name: this.callBackData.state
        })
        this.provider = cloneDeep(this.selectedProvider)
    }

    get selectedProvider(): any {
        return this.$store.state.oAuthModule.selectedProvider
    }

    async onClickRequest(): Promise<void> {
        await this.$store.dispatch(
            oAuthActionTypes.updateProvider,
            this.provider
        )
        this.$store.dispatch(oAuthActionTypes.setSelectedProvider, {
            name: this.provider.name
        })
        await this.$store
            .dispatch(oAuthActionTypes.providerRequest)
            .then((response: any) => {
                const responseData = merge(
                    { name: this.provider.name },
                    response
                )
                this.$store.dispatch(
                    oAuthActionTypes.updateProvider,
                    responseData
                )
                this.$store.dispatch(oAuthActionTypes.setSelectedProvider, {
                    name: this.provider.name
                })
            })
        this.provider = cloneDeep(this.selectedProvider)
        this.$forceUpdate()
    }
}
</script>
