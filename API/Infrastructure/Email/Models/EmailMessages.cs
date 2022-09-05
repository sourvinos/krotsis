namespace API.Infrastructure.Email {

    public static class EmailMessages {

        public static string[] FirstLoginCredentials(string language) {
            return language switch {
                "el-gr" => new[] {
                        "Γεια σας, ",
                        "Χρησιμοποιηστε τα παρακατω στοιχεια για να συνδεθειτε:",
                        "Χρηστης: " ,
                        "Κωδικος: ",
                        "Συνδεση",
                        "Ευχαριστουμε που χρησιμοποιειτε την online πλατφορμα μας.",
                        "Με φιλικους χαιρετισμους,",
                        "Στοιχεια συνδεσης"
                    },
                _ => new[] {
                        "Hello, ",
                        "Use the following credentials to login:",
                        "User: " ,
                        "Password: ",
                        "Login",
                        "Thank you for using our online platform.",
                        "Best regards,",
                        "Login credentials"
                    },
            };
        }

        public static string[] ResetPassword(string language) {
            return language switch {
                "el-gr" => new[] {
                        "Γεια σας, ",
                        "Εχετε ζητησει επαναφορα κωδικου.",
                        "Καντε κλικ στον παρακατω συνδεσμο για να καταχωρησετε νεο κωδικο:",
                        "Επαναφορα κωδικου",
                        "Προσοχη:",
                        "Αυτος ο συνδεσμος ισχυει μονο για μια φορα.",
                        "Μολις καταχωρησετε νεο κωδικο παυει να ισχυει.",
                        "Ευχαριστουμε που χρησιμοποιειτε την online πλατφορμα μας.",
                        "Με φιλικους χαιρετισμους,",
                        "Επαναφορα κωδικου"
                    },
                _ => new[] {
                        "Hello, ",
                        "You have requested a password reset.",
                        "Click the following link to set a new password:",
                        "Password reset",
                        "Warning:",
                        "This is a one-time link and can be used only once and",
                        "as soon as you've set a new password it will be invalid.",
                        "Thank you for using our online platform.",
                        "Kind regards,",
                        "Password reset"
                    },
            };
        }

    }

}