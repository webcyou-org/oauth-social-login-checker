<template>
    <div class="container">
        <h2 class="title center provider">
            <span class="icon ap-github"></span>
            GitHub
        </h2>

        <github-callBack></github-callBack>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import GithubCallBack from '~/components/github/callback.vue'

@Component({
    components: {
        GithubCallBack
    }
})
export default class CallBack extends Vue {
    state: string = ''

    asyncData({ query }: { query: any }) {
        return {
            state: query.state ? query.state : null
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
