namespace API.Features.Suppliers {

    public class SupplierLedgerVM {

        public string Date { get; set; }
        public int SupplierId { get; set; }
        public int CodeId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }

    }

}