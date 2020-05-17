<template>
    <div class="box oAuthFlow">
        <div class="wrap">
            <ul class="list charactersList">
                <template v-for="(character, index) in characterList">
                    <li :key="`character-${index}`">
                        <div class="box details">
                            <p class="image">
                                <img
                                    :src="
                                        require(`@/assets/images/${character.imageFile}`)
                                    "
                                    :width="character.imageWidth"
                                />
                            </p>
                            <p class="text">{{ character.name }}</p>
                        </div>
                    </li>
                </template>
            </ul>
            <ul class="list stepList">
                <template v-for="(step, index) in stepList">
                    <li :key="`step-${index}`" :class="`pos${step.pos}`">
                        <div
                            class="box details"
                            :class="{ selected: stepNum === index + 1 }"
                        >
                            <p class="text num">{{ index + 1 }}</p>
                            <p class="text">{{ step.text }}</p>
                        </div>
                        <p
                            class="pic arrow"
                            :class="getArrowClass(step.arrow, index + 1)"
                        ></p>
                    </li>
                </template>
            </ul>
            <ul class="list charactersList bottom">
                <template v-for="(character, index) in characterList">
                    <li :key="`character-bottom-${index}`">
                        <div class="box details">
                            <p class="image">
                                <img
                                    :src="
                                        require(`@/assets/images/${character.imageFile}`)
                                    "
                                    :width="character.imageWidth"
                                />
                            </p>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class OAuthFlow extends Vue {
    stepNum = 3
    characterList = [
        {
            name: 'App User',
            imageFile: 'pic_character_boy_normal.png',
            imageWidth: '69'
        },
        {
            name: 'Client',
            imageFile: 'pic_computer_internet_sns.png',
            imageWidth: '102'
        },
        {
            name: 'Authorized Server',
            imageFile: 'pic_computer_server_blue.png',
            imageWidth: '55'
        },
        {
            name: 'Resource Server',
            imageFile: 'pic_computer_server.png',
            imageWidth: '57'
        }
    ]

    stepList = [
        {
            text: 'OAuth Start',
            pos: 1,
            arrow: {
                width: 1
            }
        },
        {
            text: 'Redirect',
            pos: 1,
            arrow: {
                pos: 'left',
                width: 1
            }
        },
        {
            text: 'Authorization Request',
            pos: 1,
            arrow: {
                width: 2
            }
        },
        {
            text: 'Authorization Display',
            pos: 1,
            arrow: {
                pos: 'left',
                width: 2
            }
        },
        {
            text: 'Authentication Information Entry',
            pos: 1,
            arrow: {
                width: 2
            }
        },
        {
            text: 'Transfer of authority confirmation screen',
            pos: 1,
            arrow: {
                pos: 'left',
                width: 2
            }
        },
        {
            text: 'Consent to transfer',
            pos: 1,
            arrow: {
                width: 2
            }
        },
        {
            text: 'Authorization Response Code',
            pos: 1,
            arrow: {
                pos: 'left',
                width: 2
            }
        },
        {
            text: 'Redirection URI',
            pos: 1,
            arrow: {
                width: 1
            }
        },
        {
            text: 'Token Request',
            pos: 2,
            arrow: {
                width: 1
            }
        },
        {
            text: 'Token Response (access token)',
            pos: 2,
            arrow: {
                pos: 'left',
                width: 1
            }
        },
        {
            text: 'Resource Access',
            pos: 2,
            arrow: {
                width: 2
            }
        },
        {
            text: 'Resource',
            pos: 2,
            arrow: {
                pos: 'left',
                width: 2
            }
        }
    ]

    getArrowClass(
        { pos, width }: { pos: string; width: number },
        index: number
    ): any[] {
        return [
            pos || 'right',
            `width${width}`,
            { selected: index === this.stepNum }
        ]
    }
}
</script>
<style scoped lang="scss">
.box.oAuthFlow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    & > .wrap {
        padding: 30px;
        border-radius: 12px;
        background: #fff;
    }
}
.list {
    &.charactersList {
        display: flex;
        justify-content: center;
        &.bottom > li::before {
            display: none;
        }
        & > li {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: relative;
            width: 135px;
            height: 124px;
            text-align: center;
            &::before {
                content: '';
                position: absolute;
                display: block;
                left: 50%;
                top: 128px;
                width: 1px;
                height: 600px;
                border-left: 2px dotted #86b7ba;
            }
            & + li {
                margin-left: 62px;
            }
            .box.details {
                .text {
                    margin-top: 4px;
                    font-weight: bold;
                    font-size: 15px;
                    line-height: 1.2;
                }
            }
        }
    }

    &.stepList {
        width: 610px;
        margin: 0 auto;
        padding-top: 20px;
        & > li {
            .num {
                width: 20px;
                height: 20px;
                margin-right: 4px;
                border-radius: 10px;
                background: #bae9bf;
                text-align: center;
                line-height: 20px;
                font-weight: bold;
            }
            &.pos1 {
                margin-left: 20px;
            }
            &.pos2 {
                margin-left: 217px;
            }
            .box.details {
                display: flex;
                &.selected {
                    animation: step-detail-selected 0.4s linear infinite;
                }
            }
            & + li {
                margin-top: 15px;
            }
        }
    }
}

.pic.arrow {
    position: relative;
    width: 168px;
    margin-top: 6px;
    border-top: 2px solid #23438b;
    &.selected {
        animation: step-selected 1.2s linear infinite;
    }
    &::before {
        position: absolute;
        content: '';
        top: -7px;
        right: 0;
        display: block;
        width: 11px;
        height: 11px;
        border: 2px solid;
        border-color: transparent transparent #23438b #23438b;
        transform: rotate(-135deg);
    }
    &.left::before {
        right: inherit;
        left: 0;
        transform: rotate(45deg);
    }
    &.width2 {
        width: 377px;
    }
}
@keyframes step-selected {
    0% {
        border-top: 2px solid #23438b;
    }
    50% {
        border-top: 2px dotted #23438b;
    }
    100% {
        border-top: 2px solid #23438b;
    }
}
@keyframes step-detail-selected {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
}
</style>
