<template>
    <div>
        <alert-message-list></alert-message-list>
        <header class="header">
            <div class="box">
                <h1 class="title header" @click="onClickTitle">
                    OAuth Social Login Checker
                </h1>
            </div>
        </header>
        <nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import AlertMessageList from '~/components/common/alert-message-list.component.vue'

import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component({
    components: {
        AlertMessageList
    }
})
export default class Index extends Vue {
    onClickTitle() {
        this.$store.dispatch(oAuthActionTypes.resetSelectedProvider)
        this.$router.push('/')
    }
}
</script>
<style lang="scss">
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.title.header {
    cursor: pointer;
}
.table {
    td {
        word-break: break-all;
    }
}
.btn {
    font-weight: bold;
}
</style>
