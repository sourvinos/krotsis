using System.Collections.Generic;
using API.Features.Codes;
using API.Features.Expenses;
using API.Features.Items;
using API.Features.Suppliers;
using API.Infrastructure.Auth;
using Microsoft.AspNetCore.Identity;

namespace API.Infrastructure.Identity {

    public class UserExtended : IdentityUser {

        // Fields
        public string Displayname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        // Navigation
        public List<Item> Items { get; set; }
        public List<Supplier> Suppliers { get; set; }
        public List<Transaction> Transactions { get; set; }
        public List<Code> Codes { get; set; }
        public List<Token> Tokens { get; set; }

    }

}