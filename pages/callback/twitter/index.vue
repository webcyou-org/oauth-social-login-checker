<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon ap-twitter"></span>
            Twitter
        </h2>
        <provider-callBack1
            :call-back-data="callBackQueryData"
        ></provider-callBack1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { merge } from 'lodash'

import ProviderCallBack1 from '~/components/callback.1_0.component.vue'

@Component({
    components: {
        ProviderCallBack1
    }
})
export default class CallBack extends Vue {
    callBackUserData: any = null

    asyncData({ query }: { query: any }) {
        return {
            callBackQueryData: merge(query, { name: 'Twitter' }) || null
        }
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
