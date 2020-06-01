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
                    <td>OAuth {{ provider.oauth.version }}</td>
                </tr>
                <tr>
                    <td>Grant Type</td>
                    <td>Authorization Code</td>
                </tr>
                <tr>
                    <td>client_id</td>
                    <td>
                        <p class="input long">
                            <input v-model="provider.clientId" type="text" />
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
            </tbody>
        </table>
        <ul class="btnList center">
            <li class="btn green large" @click="onClickLogin">
                <a>Login</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'
import { ActionTypes as oAuthFlowActionTypes } from '~/store/oAuthFlowModule'
import { ActionTypes as storageActionTypes } from '~/store/storageModule'
import { sleep } from '~/lib/utility/sleep'

@Component
export default class ProviderLogin extends Vue {
    @Prop() readonly providerProp: any
    provider = cloneDeep(this.providerProp)

    async onClickLogin() {
        await this.$store.dispatch(
            oAuthActionTypes.updateProvider,
            this.provider
        )
        // storage
        this.$store.dispatch(
            storageActionTypes.setStorageProvider,
            this.provider
        )
        await this.$store.dispatch(oAuthFlowActionTypes.update, {
            stepNumber: this.provider.stepNumber,
            isShow: true
        })
        await sleep(4000)
        await this.$store.dispatch(oAuthFlowActionTypes.hide)
        location.href = this.provider.loginURI
    }
}
</script>
