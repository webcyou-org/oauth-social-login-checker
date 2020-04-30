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
                            <input v-model="clientId" type="text" />
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>redirect_uri</td>
                    <td>http://localhost:3000/callback</td>
                </tr>
                <tr>
                    <td>state</td>
                    <td>facebook</td>
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

@Component({})
export default class FacebookLogin extends Vue {
    clientId: string = ''

    onClickRequest() {
        location.href = `https://www.facebook.com/dialog/oauth?client_id=${this.clientId}&redirect_uri=http://localhost:3000/callback
&state=facebook`
    }
}
</script>
