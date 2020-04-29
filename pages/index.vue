<template>
    <div class="container">
        <ul v-if="!selectedProvider" class="providerList">
            <li
                v-for="(provider, index) in providerList"
                :key="index"
                @click="onClickProvider(provider.name)"
            >
                <p class="icon" :class="provider.iconClassName"></p>
                <p class="text">{{ provider.name }}</p>
            </li>
        </ul>
        <div v-else>
            <github-login v-if="selectedProvider == 'GitHub'"></github-login>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import GithubLogin from '~/components/github/login.vue'

@Component({
    components: {
        GithubLogin
    }
})
export default class Index extends Vue {
    providerList = [
        {
            name: 'GitHub',
            iconClassName: 'ap-github'
        }
    ]

    selectedProvider: string = ''

    onClickProvider(provider: string) {
        this.selectedProvider = provider
    }
}
</script>

<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 40px;
}
.providerList {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    & > li {
        cursor: pointer;
        .icon {
            font-size: 124px;
        }
        .text {
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
