export const Msg = {
    webpage_staticText:{
        landing_page:{
            SLOGAN:"Take note...Wherever you are",
            SHORT_DESCRIPTION:"Inote offers a remote solution that lets you retrieve your notes at any time retrieve your notes at any time by simply logging in.",
            QUICK_REGISTRATION:"Quick registration"
        },
        publicNavBar:{
            SIGN_IN: "Sign in"
        },
        protectedNavBar:{
            PROFILE_MANAGEMENT:"Profile management",
            SIGNOUT:"Sign out",
            MY_BOARDS:"My Boards",
            MY_TEAMS:"My Teams",
            SEARCH:"Search",
            USERS_MANAGMENT: "Managing users"
        },
        register:{
            ACCOUNT_CREATION: "Account creation"
        },
        registerForm:{
            PSEUDO: "Pseudonyme",
            EMAIL: "Email",
            PASSWORD: "Password",
            ACCOUNT_IS_CREATED:"Your account is now activated. You can now log in by clicking on the button below:",
            LOG_IN: "Login"
        },
        signIn:{
            CONNECTION:"Connection"
        },
        signInForm:{
            EMAIL: "Email",
            PASSWORD: "Password",
            FORGOTTEN_PASSWORD: "Forgotten password ?",
            SIGN_IN:"Sign in"
        },
        footer:{
            WEBSITE_SECTIONS:"Website sections",
            CONTACT: "Contact",
            TERMS_AND_CONDITIONS: "Terms & Conditions",
            PRIVACY_AND_SECURITY: "Privacy & Security",
            COOKIES:"Cookies",
            FOLLOW_US_ON_SOCIAL_NETWORKS:"Follow us",
            ALL_RIGTHS_RESERVED:"All rights reserved"
        },
        user:{
            TOOLTIP_TEAMS:"Teams",
            TOOLTIP_EDIT:"Edit",
            TOOLTIP_DELETE:"Delete",
            TOOLTIP_CHANGE_ROLE:"Change role"
        },
        modal_activate_user:{
            AUTHENTICATION_CODE:"Authentication code",
            ENTER_AUTHENTICATION_CODE:"Please enter code (validity: 15mn)",
            SEND_AUTHENTICATION_CODE: "Send"
        },
        modal_change_password:{
            CHANGE_PASSWORD:"Password change",
            AUTHENTICATION_CODE:"Authentication code",
            ENTER_AUTHENTICATION_CODE:"Please enter code (validity: 15mn)",
            AUTHENTICATION_CODE_NEEDED_ON_CHANGE_PASSWORD:"To be able to change your password, you must first input the temporary authentication code sent to your email address",
            SEND:"Send",
            ENTER_NEW_PASSWORD:"Enter new password",
            PASSWORD:"Password",
            CONFIRM_PASSWORD:"Confirm password"
        }
    },
    toasts:{
        titles:{
            USER_ACCOUNT_ACTIVATION:"User account activation",
            OPERATION_SUCCESS: "Operation success",
            CHANGE_PASSWORD: "Change password"
        },
        prompts:{
            ENTER_ACTIVATION_CODE_SENT_BY_MAIL:"Please enter activation code sent on your email",
            ENTER_AUTHENTICATION_CODE_SENT_BY_MAIL:"Please enter temporary authentication code sent on your email"
            
        },
        errors:{
            titles:{
                DETECTED_ANOMALY:"Detected anomaly",
                REQUEST_HAS_FAILED:"Request has failed"
            },
            details:{
                USER_SHOULD_HAVE_A_REFRESH_TOKEN:"User does not have any refresh token"
            }
        }
    },
    
    user:{
        errors:{
            RECOVERY_CURRENT_USER_FAILED:"Recovery current user failed",
            RECOVERY_ALL_USERS_FAILED:"Recovery of all users failed",
            RECOVERY_OF_THE_REQUESTED_USER_HAS_FAILED : "Recovery of the requested user has failed"
        }
    },
    auth:{
        errors:{
            NULL_TOKEN_VALUE:"Null token value",
            USER_LOGIN_FAILED:"User login failed",
            CHANGE_PASSWORD_FAILED:"Change password failed",
            REFRESH_TOKEN_REQUEST_FAILED:"Request to send refresh token failed",
            USER_SIGNOUT_FAILED:"User signout failed"
        }
    },
    guards:{
        errors:{
            CURRENT_USER_RECUP_FAILED:"Recovery of the current user failed"
        }
    }
    
}