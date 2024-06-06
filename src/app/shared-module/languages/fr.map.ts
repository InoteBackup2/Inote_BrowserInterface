import { Msg } from "../constants/messages.constant";

export const fr: Map<string, string> = new Map([
    [Msg.toasts.errors.titles.DETECTED_ANOMALY, 'Anomalie détectée'],
    [Msg.user.errors.RECOVERY_CURRENT_USER_FAILED, "La récupération de l'utilisateur courant a échoué"],
    [Msg.toasts.titles.USER_ACCOUNT_ACTIVATION, "Activation du compte utilisateur"],
    [Msg.toasts.titles.OPERATION_SUCCESS, "Succès de l'opération"],
    [Msg.toasts.prompts.ENTER_ACTIVATION_CODE_SENT_BY_MAIL, "Entrez SVP le code d'activation envoyé sur l'adresse mail que vous avez fourni lors de la création du compte"],
    [Msg.toasts.errors.titles.REQUEST_HAS_FAILED, "La requête a échouée (cause inconnue)"],
    [Msg.toasts.errors.details.USER_SHOULD_HAVE_A_REFRESH_TOKEN, "L'utilisateur ne possède aucun refresh token"],
    [Msg.auth.errors.CHANGE_PASSWORD_FAILED, "L'opération de changement du mot de passe a échouée"],
    [Msg.auth.errors.USER_SIGNOUT_FAILED, "La déconnexion de l'utilisateur a échoué"],
    [Msg.landing_page.SLOGAN,"Notez...Où que vous soyez."],
    [Msg.landing_page.SHORT_DESCRIPTION,"Inote offre une solution déportée avec laquelle vous pouvez à tout moment retrouver vos notes à l'aide d'une simple connexion"],
    [Msg.landing_page.QUICK_REGISTRATION,"Inscription rapide"],
    [Msg.publicNavBar.SIGN_IN,"Se connecter"],
    [Msg.registerForm.PSEUDO,"Pseudonyme"],
    [Msg.registerForm.EMAIL,"Courriel"],
    [Msg.registerForm.PASSWORD,"Mot de passe"],
    [Msg.register.ACCOUNT_CREATION,"Création de compte"],
    [Msg.signIn.CONNECTION,"Création de compte"],
    [Msg.signInForm.EMAIL,"Courriel"],
    [Msg.signInForm.PASSWORD,"Mot de passe"],
    [Msg.signInForm.FORGOTTEN_PASSWORD,"Mot de passe oublié ?"],
    [Msg.footer.CONTACT,"Contact"],
    [Msg.footer.WEBSITE_SECTIONS,"Sections du site"],
    [Msg.footer.TERMS_AND_CONDITIONS,"Mentions légales"],
    [Msg.footer.PRIVACY_AND_SECURITY,"Politique de confidentialité"],
    [Msg.footer.COOKIES,"Cookies"],
    [Msg.footer.FOLLOW_US_ON_SOCIAL_NETWORKS,"Suivez-nous sur les réseaux sociaux"],
    [Msg.protectedNavBar.PROFILE_MANAGEMENT,"Gestion du profil"],
    [Msg.protectedNavBar.SIGNOUT,"Déconnexion"],
    [Msg.protectedNavBar.MY_BOARDS,"Mes Tableaux"],
    [Msg.protectedNavBar.MY_TEAMS,"Mes Equipes"],
    [Msg.protectedNavBar.SEARCH,"Rechercher"],

]);