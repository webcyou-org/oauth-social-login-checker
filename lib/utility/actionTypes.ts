/**
 * Creates an ActionType object with namespace attached to the name of the action method.
 * @param o An array of method names for actions
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
