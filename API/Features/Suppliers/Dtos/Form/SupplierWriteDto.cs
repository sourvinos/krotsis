namespace API.Features.Suppliers {

    public class SupplierWriteDto {

        public int Id { get; set; }
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public bool IsActive { get; set; }
        public string UserId { get; set; }

    }

}