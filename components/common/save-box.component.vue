<template>
    <div class="box saveBox">
        <div class="wrap">
            <p class="text">Save</p>
            <ul class="list saveSelectList">
                <li>
                    <label for="save1">none</label>
                    <input
                        id="save1"
                        v-model="storage.type"
                        type="radio"
                        name="save"
                        value="none"
                        @change="onClickRadio('none')"
                    />
                </li>
                <li>
                    <label for="save2">local storage</label>
                    <input
                        id="save2"
                        v-model="storage.type"
                        type="radio"
                        name="save"
                        value="localStorage"
                        @change="onClickRadio('localStorage')"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import { ActionTypes as oAuthActionTypes } from '~/store/oAuthModule'

@Component
export default class SaveBox extends Vue {
    storage = cloneDeep(this.$store.state.oAuthModule.storage)

    onClickRadio(type: string) {
        if (type === 'none') {
            this.$store.dispatch(oAuthActionTypes.resetStorageType)
        } else {
            this.$store.dispatch(oAuthActionTypes.setStorageType, type)
        }
    }
}
</script>
