using System.Collections.Generic;

namespace API.Features.Suppliers {

    public class SupplierLedgerVM {

        public PreviousPeriod Previous { get; set; }
        public IList<SupplierLedgerDetailLineVM> Requested { get; } = new List<SupplierLedgerDetailLineVM>();

    }

}