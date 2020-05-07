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
                            <input v-model="vGoogle.clientId" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>redirect_uri</td>
                    <td>{{ vGoogle.redirectUri }}</td>
                </tr>
                <tr>
                    <td>response_type</td>
                    <td>{{ vGoogle.responseType }}</td>
                </tr>
                <tr>
                    <td>scope</td>
                    <td>{{ vGoogle.scope }}</td>
                </tr>
                <tr>
                    <td>state</td>
                    <td>{{ vGoogle.state }}</td>
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
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component({})
export default class GoogleLogin extends Vue {
    vGoogle = cloneDeep(this.google)

    async onClickRequest() {
        await this.$store.dispatch(
            oAuthActionTypes.updateProvider,
            this.vGoogle
        )
        await this.$store.dispatch(oAuthActionTypes.googleLogin)
    }

    get google(): any {
        return this.$store.state.oAuthModule.google
    }
}
</script>
