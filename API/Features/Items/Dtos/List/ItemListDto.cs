namespace API.Features.Items {

    public class ItemListDto {

        public int Id { get; set; }
        public string Description { get; set; }
        public byte VatPercent { get; set; }
        public decimal NetPrice { get; set; }
        public decimal GrossPrice { get; set; }
        public bool IsActive { get; set; }

    }

}