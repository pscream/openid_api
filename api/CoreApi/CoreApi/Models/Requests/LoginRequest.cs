using System.ComponentModel.DataAnnotations;

namespace CoreApi.Models.Requests
{

    public class LoginRequest
    {

        [StringLength(250)]
        public required string Username { get; set; }

        [StringLength(250)]
        public required string Password { get; set; }

    }

}
