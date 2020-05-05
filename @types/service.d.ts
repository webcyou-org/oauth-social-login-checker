import Service from '~/lib/service/Service'

declare module 'vuex/types/index' {
    interface Store<S> {
        $service: Service
    }
}
