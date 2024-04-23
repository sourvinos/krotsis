namespace API.Features.Pdf {

    public class LedgerTransactionsVM {

        public string Date { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNo { get; set; }
        public string Series { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }

    }

}