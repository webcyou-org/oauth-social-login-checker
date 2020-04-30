<template>
    <div class="container">
        <ul v-if="!selectedProvider" class="providerList">
            <li
                v-for="(provider, index) in providerList"
                :key="index"
                @click="onClickProvider(provider)"
            >
                <p class="icon" :class="provider.iconClassName"></p>
                <p class="text">{{ provider.name }}</p>
            </li>
        </ul>
        <div v-else>
            <h2 class="title center provider">
                <span
                    :class="selectedProvider.iconClassName"
                    class="icon"
                ></span>
                {{ selectedProvider.name }}
            </h2>
            <github-login
                v-if="selectedProvider.name == 'GitHub'"
            ></github-login>
            <facebook-login
                v-if="selectedProvider.name == 'Facebook'"
            ></facebook-login>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import GithubLogin from '~/components/github/login.vue'
import FacebookLogin from '~/components/facebook/login.vue'

interface Provider {
    name: string
    iconClassName: string
}

@Component({
    components: {
        FacebookLogin,
        GithubLogin
    }
})
export default class Index extends Vue {
    providerList: Provider[] = [
        {
            name: 'Google',
            iconClassName: 'ap-google'
        },
        {
            name: 'Facebook',
            iconClassName: 'ap-facebook'
        },
        {
            name: 'Twitter',
            iconClassName: 'ap-twitter'
        },
        {
            name: 'GitHub',
            iconClassName: 'ap-github'
        }
    ]

    selectedProvider: Provider | null = null

    onClickProvider(provider: Provider) {
        this.selectedProvider = provider
    }
}
</script>

<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 40px;
}
.providerList {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    text-align: center;
    & > li {
        margin: 40px;
        cursor: pointer;
        .icon {
            font-size: 124px;
        }
        .text {
            font-size: 16px;
            font-weight: bold;
        }
    }
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
