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
                <tr
                    v-for="(value, name, index) in provider.loginDisplayObject"
                    :key="index"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
                <template
                    v-for="(value,
                    name,
                    index) in provider.loginDisplayResponseDataObject"
                >
                    <tr v-if="value !== null" :key="`responseData${index}`">
                        <td>{{ name }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <ul class="btnList center">
            <li
                v-if="provider.isRequestStep('requestToken')"
                class="btn green large"
                @click="onClickRequest"
            >
                <a>Request Token</a>
            </li>
            <li v-else class="btn green large" @click="onClickLogin">
                <a>Login</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { merge, cloneDeep } from 'lodash'
import queryString from 'query-string'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component
export default class ProviderOAuth1Login extends Vue {
    @Prop() readonly providerProp: any
    provider = cloneDeep(this.providerProp)

    created() {
        this.$store.dispatch(oAuthActionTypes.updateProvider, {
            name: this.provider.name,
            requestStepList: ['requestToken', 'login']
        })
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
                    queryString.parse(response)
                )
                this.updateProvider(responseData)
            })
        await this.$store.dispatch(oAuthActionTypes.providerChangeRequest)
        this.provider = cloneDeep(this.selectedProvider)
        this.$forceUpdate()
    }

    async onClickLogin(): Promise<void> {
        await this.$store.dispatch(
            oAuthActionTypes.updateProvider,
            this.provider
        )
        location.href = this.provider.loginURI
    }

    async updateProvider(updateData: any): Promise<void> {
        await this.$store.dispatch(oAuthActionTypes.updateProvider, updateData)
        this.$store.dispatch(oAuthActionTypes.setProvider, {
            name: this.provider.name
        })
        this.provider = cloneDeep(this.selectedProvider)
    }
}
</script>
