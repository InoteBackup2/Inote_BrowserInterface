/* Nota Bene: It doesn't seem possible to use the literal values of the enumeration in the Angular template that uses it, within an ``ngSwitch``.
This is why the associated number is explicitly defined here. */

export enum ActivateUserStepsEnum {
    INIT=0,
    SEND_AUTH_CODE=1,
    OPERATION_RESULT_STATUS=2,
    IN_PROGRESS=3
}