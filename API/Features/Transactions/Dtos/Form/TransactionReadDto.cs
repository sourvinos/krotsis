using API.Features.Suppliers;

namespace API.Features.Transactions {

    public class TransactionReadDto {

        public int Id { get; set; }
        public string Date { get; set; }
        public SupplierActiveVM Supplier { get; set; }
        public string InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public string UserId { get; set; }

    }

}