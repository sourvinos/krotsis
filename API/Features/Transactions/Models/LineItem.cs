namespace API.Features.Expenses {

    public class LineItem {

        public int Id { get; set; }
        public int TransactionId { get; set; }
        public float VatId { get; set; }
        public float NetAmount { get; set; }
        public float VatAmount { get; set; }
        public float GrossAmount { get; set; }

    }

}