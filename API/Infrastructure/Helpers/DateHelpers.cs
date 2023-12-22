using System;

namespace API.Infrastructure.Helpers {

    public static class DateHelpers {

        public static string DateTimeToISOString(DateTime date) {
            string day = "0" + date.Day.ToString();
            string month = "0" + date.Month.ToString();
            string hour = "0" + date.Hour.ToString();
            string minutes = "0" + date.Minute.ToString();
            string seconds = "0" + date.Second.ToString();
            return date.Year.ToString() + "-" + month.Substring(month.Length - 2, 2) + "-" + day.Substring(day.Length - 2, 2) + " " +
                hour.Substring(hour.Length - 2, 2) + ":" + minutes.Substring(minutes.Length - 2, 2) + ":" + seconds.Substring(seconds.Length - 2, 2);
        }

        public static DateTime GetLocalDateTime() {
            var x = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, "E. Europe Standard Time");
            return x;
        }

    }

}
