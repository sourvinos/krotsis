﻿using System;
using API.Infrastructure.Identity;

namespace API.Features.Expenses {

    public class Transaction {

        // PK
        public int Id { get; set; }
        // Fields
        public DateOnly Date { get; set; }
        public int SupplierId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}