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
                    <td>client_id</td>
                    <td>
                        <p class="input long">
                            <input v-model="provider.clientId" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>redirect_uri</td>
                    <td>{{ provider.redirectUri }}</td>
                </tr>
                <tr>
                    <td>response_type</td>
                    <td>{{ provider.responseType }}</td>
                </tr>
                <tr>
                    <td>scope</td>
                    <td>{{ provider.scope }}</td>
                </tr>
                <tr>
                    <td>state</td>
                    <td>{{ provider.state }}</td>
                </tr>
                <tr>
                    <td>nonce</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <ul class="btnList center">
            <li class="btn green large" @click="onClickRequest">
                <a>Request</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component
export default class ProviderLogin extends Vue {
    @Prop() readonly providerProp: any
    provider = cloneDeep(this.providerProp)

    async onClickRequest() {
        await this.$store.dispatch(
            oAuthActionTypes.updateProvider,
            this.provider
        )
        await this.$store.dispatch(
            oAuthActionTypes.providerLogin,
            this.provider
        )
    }
}
</script>
