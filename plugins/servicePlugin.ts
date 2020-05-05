import Service from '~/lib/service/Service'

export default function({ app }: { app: any }, inject: any): void {
    inject('service', new Service(app))
}
