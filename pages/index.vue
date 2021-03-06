<template>
    <div class="container">
        <o-auth-flow v-if="oAuthFlow.isShow"></o-auth-flow>
        <ul v-if="!selectedProvider" class="providerList">
            <li
                v-for="(provider, index) in providerList"
                :key="index"
                @click="onClickProvider(provider)"
            >
                <p class="icon" :class="getIconClassName(provider)"></p>
                <p class="text">{{ provider }}</p>
            </li>
        </ul>
        <div v-else>
            <h2 class="title center provider">
                <span
                    :class="getIconClassName(selectedProvider.name)"
                    class="icon"
                ></span>
                {{ selectedProvider.name }}
            </h2>
            <save-box></save-box>
            <provider-login
                v-if="!isSelectedProvider('Twitter')"
                :provider-prop="selectedProvider"
            ></provider-login>
            <provider-oAuth1-login
                v-else
                :provider-prop="selectedProvider"
            ></provider-oAuth1-login>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import ProviderLogin from '~/components/login.component.vue'
import ProviderOAuth1Login from '~/components/login.1_0.component.vue'
import OAuthFlow from '~/components/common/oauth-flow.component.vue'
import SaveBox from '~/components/common/save-box.component.vue'
import { providerList } from '~/lib/utility/provider'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component({
    components: {
        SaveBox,
        ProviderLogin,
        ProviderOAuth1Login,
        OAuthFlow
    }
})
export default class Index extends Vue {
    providerList = providerList

    isSelectedProvider(name: string): boolean {
        if (!this.selectedProvider) return false
        return this.selectedProvider.name === name
    }

    onClickProvider(name: string) {
        this.$store.dispatch(oAuthActionTypes.setProvider, {
            name
        })
    }

    get oAuthFlow(): any {
        return this.$store.state.oAuthFlowModule.oAuthFlow
    }

    get selectedProvider(): any {
        return this.$store.state.oAuthModule.provider
    }

    getIconClassName(name: string): string {
        return `ap-${name.toLowerCase()}`
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
