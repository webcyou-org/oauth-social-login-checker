<template>
    <transition>
        <ul class="list alertMessageList">
            <li v-for="alertMessage in alertMessageList" :key="alertMessage.id">
                <alert-message
                    :message-data="alertMessage"
                    @onHideMessage="hideAlertMessage"
                    @onDeleteMessage="deleteAlertMessage"
                ></alert-message>
            </li>
        </ul>
    </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AlertMessage from './alert-message.component.vue'
import { ActionTypes as AlertMessageListActionTypes } from '~/store/alertMessageListModule'

@Component({
    components: {
        AlertMessage
    }
})
export default class AlertMessageList extends Vue {
    deleteAlertMessage(data: any): void {
        this.$store.dispatch(
            AlertMessageListActionTypes.deleteAlertMessage,
            data
        )
    }

    hideAlertMessage(data: any): void {
        this.$store.dispatch(AlertMessageListActionTypes.hideAlertMessage, data)
    }

    get alertMessageList(): any {
        return this.$store.state.alertMessageListModule.alertMessageList
    }
}
</script>
<style scoped lang="scss">
.alertMessageList {
    position: fixed;
    top: 24px;
    left: 0;
    width: 100%;
    padding: 0 50px;
    z-index: 12000;
    & > li {
        margin-bottom: 10px;
    }
}
</style>
