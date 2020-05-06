import { Context } from '@nuxt/types'
import Vue from 'vue'
import { CustomError } from '~/lib/errors/CustomError'
import { handleFailure } from '~/lib/errors/handleFailure'
import { UnauthorizedError } from '~/lib/errors/UnauthorizedError'

// Vue.js エラーハンドリング
// @see https://speakerdeck.com/nori3tsu/vue-dot-js-nuxt-dot-jsfalsekuroharuerahantorinkushi-zhuang?slide=31
export default (ctx: Context): void => {
    // Vue.js内で発生したエラー
    // @see https://jp.vuejs.org/v2/api/index.html#errorHandler
    Vue.config.errorHandler = (err: Error | CustomError, _vm: Vue, info: string): void => {
        console.warn(`Vue.config.errorHandler: ${info}`)

        if (!info && !(err instanceof UnauthorizedError)) {
            console.warn(err)
            return
        }

        try {
            handleFailure(ctx, err)
        } catch (err) {
            console.error(err)
        }
    }

    // Promise.rejected error
    // @see https://developer.mozilla.org/ja/docs/Web/API/Window/unhandledrejection_event
    window.addEventListener('unhandledrejection', event => {
        try {
            console.warn('capture unhandledrejection')
            handleFailure(ctx, event)
        } catch (err) {
            console.error(err)
        }
    })
}
