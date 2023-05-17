namespace API.Features.Codes {

    public class CodeWriteDto {

        public int Id { get; set; }
        public string Description { get; set; }
        public int DebitCreditId { get; set; }
        public bool IsActive { get; set; }
        public string TimeStamp { get; set; }
        // FKs
        public string UserId { get; set; }

    }

}