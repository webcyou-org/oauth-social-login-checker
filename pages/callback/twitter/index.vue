<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon ap-twitter"></span>
            Twitter
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
                    <td>Version</td>
                    <td>OAuth 1.0</td>
                </tr>
                <tr
                    v-for="(value, name, index) in callBackQueryData"
                    :key="index"
                >
                    <td>{{ name }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>

        <ul class="btnList center">
            <li class="btn green large" @click="onClickFetchUser">
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
    clientId: string = ''
    clientSecret: string = ''
    callBackQueryData: any

    asyncData({ query }: { query: any }) {
        return {
            callBackQueryData: query || null
        }
    }

    async onClickFetchUser(): Promise<void> {}
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
