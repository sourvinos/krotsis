namespace API.Features.Transactions {

    public class TransactionListDto {

        public int Id { get; set; }
        public string Date { get; set; }
        public int SupplierDescription { get; set; }
        public string InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }

    }

}