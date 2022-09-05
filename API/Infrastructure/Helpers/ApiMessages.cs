using System;

namespace API.Infrastructure.Helpers {

    public enum Icons {
        Success,
        Info,
        Warning,
        Error
    }

    public static class ApiMessages {

        #region Info

        public static string OK() { return "OK"; }
        public static string EmailInstructions() { return "An email was sent with instructions."; }
        public static string PasswordChanged() { return "Password was changed successfully."; }
        public static string PasswordReset() { return "Password was reset successfully."; }
        public static string LogoutSuccess() { return "Logout was successful."; }

        #endregion

        #region Errors

        public static string AuthenticationFailed() { return "Authentication failed."; }
        public static string RecordNotFound() { return "This record was not found."; }
        public static string RecordNotSaved() { return "Record not saved."; }
        public static string InvalidModel() { return "The model is invalid."; }
        public static string UnableToDeleteConnectedUser() { return "The connected user can't be deleted."; }
        public static string EmailNotSent() { return "Email not sent."; }
        public static string LogoutError() { return "The user is not logged in."; }
        public static string UnableToCreateUser() { return "We were unable to create this user. Make sure that the username and the email are unique."; }
        public static string RecordInUse() { return "This record is in use and can't be deleted."; }
        public static string UnknownError() { return "Something exceptional has happened."; }
        public static string UnableToUpdateUser() { return "We were unable to update this user. Make sure that the username and the email are unique."; }

        #endregion

    }

}