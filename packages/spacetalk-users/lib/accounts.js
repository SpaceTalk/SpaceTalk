AccountsTemplates.configure({

  defaultLayout: 'defaultLayout',
  defaultContentRegion: 'main',

  // Behaviour
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  homeRoutePath: '/teams/public',

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: true,
  showLabels: false,
  showPlaceholders: true,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Button
  texts: {
    title: {
      signIn: 'Sign in to ' + (Meteor.absoluteUrl().match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1])
    }
  }
});

AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd');

AccountsTemplates.configureRoute('verifyEmail');

var passwordField = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email'
  },
  passwordField
]);
