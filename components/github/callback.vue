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
                    <td>client_secret</td>
                    <td>
                        <p class="input long">
                            <input v-model="clientSecret" type="text" />
                        </p>
                    </td>
                </tr>
                <tr
                    v-for="(value, name, index) in callBackData"
                    :key="`callBackData${index}`"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
                <template v-if="responseData">
                    <tr
                        v-for="(value, name, index) in responseData"
                        :key="index"
                    >
                        <td>{{ name }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
                <template v-if="userData">
                    <td>userData</td>
                    <td>
                        <pre>{{ userData }}</pre>
                    </td>
                </template>
            </tbody>
        </table>

        <ul class="btnList center">
            <li
                v-if="!responseData"
                class="btn green large"
                @click="onClickRequest"
            >
                <a>Request</a>
            </li>
            <li v-else class="btn green large" @click="onClickFetchUser">
                <a>FetchUser</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GithubCallBack extends Vue {
    @Prop() readonly callBackData: any | undefined

    clientId: string = ''
    clientSecret: string = ''
    responseData: any = ''
    userData: string = ''

    async onClickRequest(): Promise<void> {
        await this.$axios
            .post(
                '/github/login/oauth/access_token',
                {
                    code: this.callBackData.code,
                    client_id: this.clientId,
                    client_secret: this.clientSecret
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    }
                }
            )
            .then((res: any) => {
                this.responseData = res.data
            })
    }

    async onClickFetchUser(): Promise<void> {
        await this.$axios
            .post(
                '/github_api/user',
                {},
                {
                    headers: {
                        Authorization: `token ${this.responseData.access_token}`
                    }
                }
            )
            .then((res: any) => {
                this.userData = res.data
            })
    }
}
</script>
