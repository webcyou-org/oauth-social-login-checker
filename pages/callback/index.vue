<template>
    <div class="container">
        <p class="input">
            <span>client_id</span><input v-model="clientId" type="text" />
        </p>
        <p class="input">
            <span>client_secret</span
            ><input v-model="clientSecret" type="text" />
        </p>
        <p class="text">code:</p>
        <pre>{{ code }}</pre>

        <p class="btn" @click="onClickRequest"><a>request</a></p>

        <div v-if="responseData">
            <pre>{{ responseData }}</pre>
            <p class="btn" @click="onClickFetchUser"><a>FetchUser</a></p>
            <pre v-if="userData">{{ userData }}</pre>
        </div>
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
