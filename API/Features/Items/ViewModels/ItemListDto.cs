using API.Features.Colors;

namespace API.Features.Items {

    public class ItemListVM {

        public int Id { get; set; }
        public Color Color { get; set; }
        public string Description { get; set; }
        public byte VatPercent { get; set; }
        public decimal NetPrice { get; set; }
        public decimal GrossPrice { get; set; }
        public bool IsActive { get; set; }

    }

}