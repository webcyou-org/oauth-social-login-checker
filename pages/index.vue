<template>
    <div class="container">
        <p class="icon ap-github"></p>
        <p class="input">
            <span>client_id</span><input v-model="clientId" type="text" />
        </p>
        <p class="btn" @click="onClickRequest"><a>request</a></p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({})
export default class Index extends Vue {
    clientId: string = ''

    onClickRequest() {
        location.href = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&scope=user`
    }
}
</script>

<style>
.container {
    margin: 0 auto;
}
</style>
