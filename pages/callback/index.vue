<template>
    <div class="container">
        <h1>OAuth Social Login callback</h1>
        <pre>{{ code }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({
    asyncData({ query }) {
        return {
            code: query.code ? query.code : null
        }
    }
})
export default class CallBack extends Vue {}
</script>
