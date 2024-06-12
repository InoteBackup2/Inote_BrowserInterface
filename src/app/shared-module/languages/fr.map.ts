import { Msg } from "../constants/messages.constant";

export const fr: Map<string, string> = new Map([
  [Msg.toasts.errors.titles.DETECTED_ANOMALY, "Anomalie détectée"],
  [
    Msg.user.errors.RECOVERY_CURRENT_USER_FAILED,
    "La récupération de l'utilisateur courant a échoué",
  ],
  [
    Msg.user.errors.RECOVERY_OF_THE_REQUESTED_USER_HAS_FAILED,
    "La récupération de l'utilisateur demandé a échoué",
  ],
  
  [
    Msg.toasts.titles.USER_ACCOUNT_ACTIVATION,
    "Activation du compte utilisateur",
  ],
  [Msg.toasts.titles.OPERATION_SUCCESS, "Succès de l'opération"],
  [Msg.toasts.titles.CHANGE_PASSWORD, "Réinitialisationa     du mot de passe"],
  [
    Msg.toasts.prompts.ENTER_ACTIVATION_CODE_SENT_BY_MAIL,
    "Entrez SVP le code d'activation envoyé sur l'adresse mail que vous avez fourni lors de la création du compte",
  ],
  [
    Msg.toasts.prompts.ENTER_AUTHENTICATION_CODE_SENT_BY_MAIL,
    "Entrez SVP le code d'authentification provisoire envoyé sur l'adresse mail que vous avez fourni lors de la création du compte",
  ],
  [
    Msg.toasts.errors.titles.REQUEST_HAS_FAILED,
    "La requête a échouée (cause inconnue)",
  ],
  [
    Msg.toasts.errors.details.USER_SHOULD_HAVE_A_REFRESH_TOKEN,
    "L'utilisateur ne possède aucun refresh token",
  ],
  [
    Msg.auth.errors.CHANGE_PASSWORD_FAILED,
    "L'opération de changement du mot de passe a échouée",
  ],
  [
    Msg.auth.errors.USER_SIGNOUT_FAILED,
    "La déconnexion de l'utilisateur a échoué",
  ],
  [Msg.webpage_staticText.landing_page.SLOGAN, "Notez...Où que vous soyez."],
  [
    Msg.webpage_staticText.landing_page.SHORT_DESCRIPTION,
    "Inote offre une solution déportée avec laquelle vous pouvez à tout moment retrouver vos notes à l'aide d'une simple connexion",
  ],
  [
    Msg.webpage_staticText.landing_page.QUICK_REGISTRATION,
    "Inscription rapide",
  ],
  [Msg.webpage_staticText.publicNavBar.SIGN_IN, "Se connecter"],
  [Msg.webpage_staticText.registerForm.PSEUDO, "Pseudonyme"],
  [Msg.webpage_staticText.registerForm.EMAIL, "Courriel"],
  [Msg.webpage_staticText.registerForm.PASSWORD, "Mot de passe"],
  [Msg.webpage_staticText.register.ACCOUNT_CREATION, "Création de compte"],
  [
    Msg.webpage_staticText.registerForm.ACCOUNT_IS_CREATED,
    "Votre compte est à présent activé. Vous pouvez dès à présent vous y connecter en cliquant sur le bouton ci-dessous: ",
  ],
  [Msg.webpage_staticText.registerForm.LOG_IN, "Se connecter"],
  [Msg.webpage_staticText.signIn.CONNECTION, "Création de compte"],
  [Msg.webpage_staticText.signInForm.EMAIL, "Courriel"],
  [Msg.webpage_staticText.signInForm.PASSWORD, "Mot de passe"],
  [
    Msg.webpage_staticText.signInForm.FORGOTTEN_PASSWORD,
    "Mot de passe oublié ?",
  ],
  [Msg.webpage_staticText.footer.CONTACT, "Contact"],
  [Msg.webpage_staticText.footer.WEBSITE_SECTIONS, "Sections du site"],
  [Msg.webpage_staticText.footer.TERMS_AND_CONDITIONS, "Mentions légales"],
  [
    Msg.webpage_staticText.footer.PRIVACY_AND_SECURITY,
    "Politique de confidentialité",
  ],
  [Msg.webpage_staticText.footer.COOKIES, "Cookies"],
  [
    Msg.webpage_staticText.footer.FOLLOW_US_ON_SOCIAL_NETWORKS,
    "Suivez-nous sur les réseaux sociaux",
  ],
  [Msg.webpage_staticText.footer.ALL_RIGTHS_RESERVED, "Tous droits réservés"],
  [
    Msg.webpage_staticText.protectedNavBar.PROFILE_MANAGEMENT,
    "Gestion du profil",
  ],
  [Msg.webpage_staticText.protectedNavBar.SIGNOUT, "Déconnexion"],
  [Msg.webpage_staticText.protectedNavBar.MY_BOARDS, "Mes Tableaux"],
  [Msg.webpage_staticText.protectedNavBar.MY_TEAMS, "Mes Equipes"],
  [Msg.webpage_staticText.protectedNavBar.SEARCH, "Rechercher"],
  [Msg.webpage_staticText.protectedNavBar.USERS_MANAGMENT, "Gestion des utilisateurs"],
  [
    Msg.webpage_staticText.modal_activate_user.AUTHENTICATION_CODE,
    "Code d'authentification",
  ],
  [
    Msg.webpage_staticText.modal_activate_user.ENTER_AUTHENTICATION_CODE,
    "Entrez le code (validité 15 mn)",
  ],
  [
    Msg.webpage_staticText.modal_activate_user.SEND_AUTHENTICATION_CODE,
    "Envoyer",
  ],
  [
    Msg.webpage_staticText.modal_change_password.CHANGE_PASSWORD,
    "Réinitialisation du mot de passe",
  ],
  [
    Msg.webpage_staticText.modal_change_password.AUTHENTICATION_CODE_NEEDED_ON_CHANGE_PASSWORD,
    "Pour effectuer la réinitialisation du mot de passe, vous devez au préalable entrer le code d'authentification qui vient de vous être envoyé sur votre adresse email",
  ],
  
  [
    Msg.webpage_staticText.modal_change_password.AUTHENTICATION_CODE,
    "Code d'authentification",
  ],
  [
    Msg.webpage_staticText.modal_change_password.ENTER_AUTHENTICATION_CODE,
    "Entrez le code (validité: 15mn)",
  ],
  [Msg.webpage_staticText.modal_change_password.SEND, "Envoi"],
  [
    Msg.webpage_staticText.modal_change_password.ENTER_NEW_PASSWORD,
    "Saisie du nouveau mot de passe",
  ],
  [Msg.webpage_staticText.modal_change_password.PASSWORD, "Mode de passe"],
  [
    Msg.webpage_staticText.modal_change_password.CONFIRM_PASSWORD,
    "Confirmation du mot de passe",
  ],
]);
