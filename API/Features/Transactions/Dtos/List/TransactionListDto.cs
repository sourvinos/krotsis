namespace API.Features.Transactions {

    public class TransactionListDto {

        public int Id { get; set; }
        public string Date { get; set; }
        public string SupplierDescription { get; set; }
        public string InvoiceNo { get; set; }
        public string GrossAmount { get; set; }

    }

}