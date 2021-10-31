namespace Krotsis {

    public static class ApiMessages {

        // Only used by the API
        // In normal program execution they will be replaced by Angular in the selected language

        #region Info
        public static string RecordCreated() { return "Record created."; }
        public static string RecordDeleted() { return "Record deleted."; }
        public static string RecordUpdated() { return "Record updated."; }

        #endregion

        #region Errors

        public static string RecordNotFound() { return "Record not found."; }
        public static string RecordNotSaved() { return "Record not saved."; }
        public static string InvalidModel() { return "The model is invalid"; }
        public static string RecordCannotBeDeleted() { return "Record can't be deleted"; }

        #endregion

    }

}