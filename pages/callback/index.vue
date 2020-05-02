<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon" :class="providerIconClassName"></span>
            {{ providerName }}
        </h2>

        <google-callBack
            v-if="isState('google')"
            :call-back-data="callBackQueryData"
        ></google-callBack>
        <facebook-callBack
            v-if="isState('facebook')"
            :call-back-data="callBackQueryData"
        ></facebook-callBack>
        <github-callBack
            v-if="isState('github')"
            :call-back-data="callBackQueryData"
        ></github-callBack>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import { find } from 'lodash'

import GoogleCallBack from '~/components/google/callback.vue'
import FacebookCallBack from '~/components/facebook/callback.vue'
import GithubCallBack from '~/components/github/callback.vue'

import { providerList, ProviderObject } from '~/lib/config/provider_list'

@Component({
    components: {
        GoogleCallBack,
        FacebookCallBack,
        GithubCallBack
    }
})
export default class CallBack extends Vue {
    callBackQueryData: any
    state: string = ''
    provider: ProviderObject | undefined

    asyncData({ query }: { query: any }) {
        return {
            state: query.state ? query.state : null,
            callBackQueryData: query || null,
            provider: find(providerList, { state: query.state })
        }
    }

    get providerName(): string {
        if (!this.provider) return ''
        return this.provider.name
    }

    get providerIconClassName(): string {
        if (!this.provider) return ''
        return this.provider.iconClassName
    }

    isState(state: string): boolean {
        if (!this.provider) return false
        return this.provider.state === state
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
