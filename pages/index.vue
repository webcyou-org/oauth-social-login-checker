<template>
    <div class="container">
        <h1>OAuth Social Login Checker</h1>
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

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
