using System;
using System.Collections.Generic;

namespace API.Features.Pdf {

    public static class Seed {

        public static LedgerVM Init() {
            var rand = new Random();
            var maxValue = 9999;
            var divider = 10;
            var transactions = new List<LedgerTransactionsVM> {
                new() { Date = "", DocumentType = "ΠΡΟΗΓΟΥΜΕΝΑ ΣΥΝΟΛΑ", DocumentNo="1", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "01/01/2024", DocumentType = "ΤΙΜΟΛΟΓΙΟ ΠΑΡΟΧΗΣ ΥΠΗΡΕΣΙΩΝ", DocumentNo="1", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "01/01/2024", DocumentType = "ΑΠΟΔΕΙΞΗ ΕΙΣΠΡΑΞΗΣ", DocumentNo="95", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider)},
                new() { Date = "01/01/2024", DocumentType = "ΤΙΜΟΛΟΓΙΟ ΠΑΡΟΧΗΣ ΥΠΗΡΕΣΙΩΝ", DocumentNo="146", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "01/01/2024", DocumentType = "ΤΙΜΟΛΟΓΙΟ ΠΑΡΟΧΗΣ ΥΠΗΡΕΣΙΩΝ", DocumentNo="1856", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "01/01/2024", DocumentType = "ΑΠΟΔΕΙΞΗ ΕΙΣΠΡΑΞΗΣ", DocumentNo="8", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "01/01/2024", DocumentType = "ΤΙΜΟΛΟΓΙΟ ΠΑΡΟΧΗΣ ΥΠΗΡΕΣΙΩΝ", DocumentNo="96", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "", DocumentType = "ΣΥΝΟΛΑ ΠΕΡΙΟΔΟΥ", DocumentNo="1", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
                new() { Date = "", DocumentType = "ΓΕΝΙΚΑ ΣΥΝΟΛΑ", DocumentNo="1", Series = "0", Debit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Credit = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider), Balance = new decimal(rand.NextDouble() * maxValue) / rand.Next(1, divider) },
            };
            var ledger = new LedgerVM {
                FromDate = "01/01/2024",
                ToDate = "31/05/2024",
                Description = "DEMO CUSTOMER",
                Transactions = transactions,
                QrCode = "https://mydataapidev.aade.gr/TimologioQR/QRInfo?q=Iy5tmVdZQVNsKyPTHmRcVfHr5ONDomqLdHNFtrIE1LT2YQSjEbsZ9uvIkc%2f4fPMttwcTjqGVy30%2bp%2bxkUFC6KV5KWFogE9AQEE%2bQJX%2fwG4w%3d"
            };
            return ledger;
        }

    }

}