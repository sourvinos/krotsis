using System.Collections.Generic;

namespace API.Features.Pdf {

    public class LedgerVM {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Description { get; set; }
        public List<LedgerTransactionsVM> Transactions { get; set; }
        public string QrCode { get; set; }

    }

}