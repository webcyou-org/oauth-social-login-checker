<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon" :class="providerIconClassName"></span>
            {{ providerName }}
        </h2>

        <github-callBack
            v-if="isState('github')"
            :code="code"
        ></github-callBack>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import { find } from 'lodash'
import GithubCallBack from '~/components/github/callback.vue'

import { providerList, ProviderObject } from '~/lib/config/provider_list'

@Component({
    components: {
        GithubCallBack
    }
})
export default class CallBack extends Vue {
    code: string = ''
    state: string = ''
    provider: ProviderObject | undefined

    asyncData({ query }: { query: any }) {
        return {
            state: query.state ? query.state : null,
            code: query.code ? query.code : null,
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
