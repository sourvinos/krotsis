using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Parameters {

    public class ParameterReadDto : IMetadata {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string LineA { get; set; }
        public string LineB { get; set; }
        public string LineC { get; set; }
        public string LineD { get; set; }
        public string LineE { get; set; }
        public string LineF { get; set; }
        public string LineG { get; set; }
        public string LineH { get; set; }
        public string CustomerA { get; set; }
        public string CustomerB { get; set; }
        public string CustomerC { get; set; }
        public string CustomerD { get; set; }
        public string CustomerE { get; set; }
        public string CustomerF { get; set; }
        public string CustomerG { get; set; }
        public string CustomerH { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}