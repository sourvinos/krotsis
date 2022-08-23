using System;
using System.Globalization;

namespace API.Infrastructure.Helpers {

    public static class DateHelpers {

        public static string DateTimeToISOString(DateTime date) {
            string day = "0" + date.Day.ToString();
            string month = "0" + date.Month.ToString();
            return date.Year.ToString() + "-" + month.Substring(month.Length - 2, 2) + "-" + day.Substring(day.Length - 2, 2);
        }

        public static bool BeCorrectFormat(string date) {
            return DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
        }

        public static DateTime GetLocalDateTime() {
            DateTime localDate = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, "E. Europe Standard Time");
            return localDate;
        }

    }

}
