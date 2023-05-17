namespace API.Features.Codes {

    public class CodeReadDto {

        public int Id { get; set; }
        public string Description { get; set; }
        public int DebitCreditId { get; set; }
        public bool IsActive { get; set; }

    }

}