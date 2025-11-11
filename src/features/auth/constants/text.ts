export const AUTH_TEXT = {
  REGISTER_TITLE: "Create your account",
  REGISTER_DESCRIPTION: "Start your journey with us today.",
  LOGIN_TITLE: "Welcome back!",
  LOGIN_DESCRIPTION: "Enter your email below to login to your account",
} as const;

export const TOAST_CONFIG = {
  SERVER_ERROR: {
    message: "Server error occurred. Please try again later.",
    duration: 4000,
  },
  TOKEN_INVALID: {
    message: "Restricted access.",
    description: "You are not allowed to access this page.",
    duration: Infinity,
  },
  TOKEN_EXPIRED: {
    description: "Your token has expired, please request a new one.",
    duration: 4000,
  },
  DEFAULT: {
    message: "Verification failed.",
    duration: 4000,
  },
} as const;

export const TOKEN_ERROR_TYPES = {
  isInvalid: (error?: string) =>
    error === "Invalid verification token." || error === "Invalid token state.",
  isExpired: (error?: string) => error === "Verification token has expired.",
} as const;

export const VERIFY_TEXT = {
  TITLE_SUCCESS: "Verification successful!",
  DESCRIPTION_SUCCESS:
    "Your email has been verified. You can now log in to your account.",
  BUTTON_SUCCESS: "Continue to Login",

  TITLE_EXPIRED: "Token Expired",
  DESCRIPTION_EXPIRED:
    "This verification token has expired. Please request a new verification token.",
  BUTTON_EXPIRED: "Resend Verification Email",

  TITLE_INVALID: "Verification Failed",
  DESCRIPTION_INVALID: "You will be redirected to the homepage.",
  BUTTON_INVALID: "Resend Verification Email",
} as const;
