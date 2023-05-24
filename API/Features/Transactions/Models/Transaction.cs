using System;
using System.Collections.Generic;
using API.Features.Codes;
using API.Features.Suppliers;
using API.Infrastructure.Identity;

namespace API.Features.Expenses {

    public class Transaction {

        // PK
        public int Id { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int SupplierId { get; set; }
        public int CodeId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public Code Code { get; set; }
        public Supplier Supplier { get; set; }
        public List<LineItem> LineItems { get; set; }
        public UserExtended User { get; set; }

    }

}