/* Nota Bene: It doesn't seem possible to use the literal values of the enumeration in the Angular template that uses it, within an ``ngSwitch``.
This is why the associated number is explicitly defined here. */

export enum AuthenticationByMailSteps {
    INIT=0,
    REQUEST_AUTH_CODE= 1,
    SEND_AUTH_CODE=2,
    SEND_NEW_PASSWORD=3,
    OPERATION_RESULT_STATUS=4,
    FINISH=5,
}