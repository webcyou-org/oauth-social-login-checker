<template>
    <div class="container">
        <o-auth-flow v-if="oAuthFlow.isShow"></o-auth-flow>
        <h2 v-if="selectedProvider" class="title center provider">
            <span
                class="icon"
                :class="getIconClassName(selectedProvider.name)"
            ></span>
            {{ selectedProvider.name }}
        </h2>

        <provider-callBack
            :call-back-data="callBackQueryData"
        ></provider-callBack>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import ProviderCallBack from '~/components/callback.component.vue'
import OAuthFlow from '~/components/common/oauth-flow.component.vue'

import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component({
    components: {
        ProviderCallBack,
        OAuthFlow
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

    get oAuthFlow(): any {
        return this.$store.state.oAuthFlowModule.oAuthFlow
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
