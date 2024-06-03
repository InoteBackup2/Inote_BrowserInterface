/* Nota Bene: It doesn't seem possible to use the literal values of the enumeration in the Angular template that uses it, within an ``ngSwitch``.
This is why the associated number is explicitly defined here. */

export enum AuthenticationByMailSteps {
    INIT=0,
    /* FORGOTTEN PASSWORD OPERATION */
    REQUEST_AUTH_CODE= 1,
    SEND_AUTH_CODE=2,
    FORGOTTEN_PASSWORD_SEND_NEW_PASSWORD=3,
    OPERATION_RESULT_STATUS=4,
    FORGOTTEN_PASSWORD_FINISH=5,

    /* REGISTER OPERATION */
    REGISTER_OPERATION_SEND_AUTH_CODE=6

    
}