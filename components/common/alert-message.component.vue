<template>
    <transition v-if="messageData.isShow" :leave="transitionLeave" name="fade">
        <div
            :class="getAlertClass(messageData.type)"
            class="alert"
            @click="onHide()"
        >
            <p class="text">{{ messageData.message }}</p>
        </div>
    </transition>
</template>
<script lang="ts">
import { setTimeout } from 'timers'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class AlertMessage extends Vue {
    @Prop({ type: Object }) messageData!: object

    created(): void {
        setTimeout(() => {
            this.onHide()
        }, 5000)
        this.$forceUpdate()
    }

    onHide(): void {
        this.$emit('onHideMessage', this.messageData)
    }

    transitionLeave(): void {
        // NOTE: 呼ばれていない
        this.onHide()
        this.$emit('onDeleteMessage', this.messageData)
    }

    getAlertClass(type: string): string {
        let alertClass = 'green'
        switch (type) {
            case 'success':
            case 'green':
                alertClass = 'green'
                break
            case 'info':
            case 'blue':
                alertClass = 'blue'
                break
            case 'warning':
            case 'orange':
                alertClass = 'orange'
                break
            case 'error':
            case 'red':
                alertClass = 'red'
                break
        }
        return alertClass
    }
}
</script>
<style scoped lang="scss">
.alert {
    border: none;
    border-radius: 10px;
    &.green,
    &.blue,
    &.orange,
    &.red {
        & > .text {
            color: #fff;
        }
    }
    &.green {
        background: #76c679;
    }
    &.blue {
        background: #4e88d6;
    }
    &.orange {
        background: #efbb59;
    }
    &.red {
        background: #e86767;
    }
}
</style>
