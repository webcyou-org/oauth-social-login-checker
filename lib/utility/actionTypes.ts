/**
 * actionsのメソッド名にnamespaceを付与したActionType objectを作成する
 * @param o actionsのメソッド名配列
 *          例) ['iniAlertMessageList', 'pushAlertMessage']
 * @param namespace module name
 * @return Action Type object
 *         例) {iniAlertMessageList: 'alertMessageListModule/initAlertMessageList'}
 */
export const actionsToActionTypes = <T extends string>(o: Array<T>, namespace: string): { [K in T]: string } => {
    return o.reduce((res: any, key) => {
        res[key] = `${namespace}/${key}`
        return res
    }, {})
}
