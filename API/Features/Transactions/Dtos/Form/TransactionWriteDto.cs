using System;

namespace API.Features.Transactions {

    public class TransactionWriteDto {

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int SupplierId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public string UserId { get; set; }

    }

}