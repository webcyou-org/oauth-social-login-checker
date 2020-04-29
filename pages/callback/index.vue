<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon ap-github"></span>
            GitHub
        </h2>
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
                <tr>
                    <td>code</td>
                    <td>
                        <p class="input long">
                            <input type="text" :value="code" readonly />
                        </p>
                    </td>
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
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({})
export default class CallBack extends Vue {
    code: string = ''
    clientId: string = ''
    clientSecret: string = ''
    responseData: any = ''
    userData: string = ''

    asyncData({ query }: { query: any }) {
        return {
            code: query.code ? query.code : null
        }
    }

    async onClickRequest(): Promise<any> {
        await this.$axios
            .post(
                '/github/login/oauth/access_token',
                {
                    code: this.code,
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

    async onClickFetchUser(): Promise<any> {
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
<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 40px;
}
.title {
    &.provider {
        font-size: 30px;
        & > .icon {
            font-size: 30px;
        }
    }
}
</style>
