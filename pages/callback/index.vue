<template>
    <div class="container">
        <h2 v-if="selectedProvider" class="title center provider">
            <span
                class="icon"
                :class="getIconClassName(selectedProvider.name)"
            ></span>
            {{ selectedProvider.name }}
        </h2>

        <provider-callBack
            v-if="isState('google')"
            :call-back-data="callBackQueryData"
        ></provider-callBack>
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

import FacebookCallBack from '~/components/facebook/callback.vue'
import GithubCallBack from '~/components/github/callback.vue'
import ProviderCallBack from '~/components/callback.component.vue'

import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component({
    components: {
        ProviderCallBack,
        FacebookCallBack,
        GithubCallBack
    }
})
export default class CallBack extends Vue {
    callBackQueryData: any

    asyncData({ query, store }: { query: any; store: any }) {
        store.dispatch(oAuthActionTypes.setSelectedProvider, {
            name: query.state
        })
        return {
            callBackQueryData: query || null
        }
    }

    get selectedProvider(): any {
        return this.$store.state.oAuthModule.selectedProvider
    }

    getIconClassName(name: string): string {
        return `ap-${name.toLowerCase()}`
    }

    isState(state: string): boolean {
        if (!this.selectedProvider) return false
        return this.selectedProvider.state === state
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
