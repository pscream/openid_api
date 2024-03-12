using System.Text;
using System.Security.Claims;

using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;

using CoreApi.Models.Tokens;
using CoreApi.Models.Requests;
using CoreApi.Settings;

namespace CoreApi.Controllers
{

    [ApiController]
    public class LoginController : ControllerBase
    {

        private SecurityConfig _securityConfig;

        public LoginController(IOptions<SecurityConfig> securityConfigOprions)
        {
            _securityConfig = securityConfigOprions.Value;
        }

        [HttpPost("api/login")]
        public ActionResult<JwtToken> Login([FromBody] LoginRequest model)
        {

            var userClaimList = new List<Claim>
            {
                new Claim(UserClaimTypes.USER_ID, model.Username),
                new Claim(UserClaimTypes.USER_TYPE, UserTypes.USER_TYPE_NORMAL),
                new Claim(UserClaimTypes.ORIGINAL_USER_ID, model.Username),
                new Claim(UserClaimTypes.ORIGINAL_USER_TYPE, UserTypes.USER_TYPE_NORMAL)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaimList),
                Expires = DateTime.UtcNow.AddDays(_securityConfig.JwtLifetimeDays),
                Audience = _securityConfig.Audience,
                Issuer = _securityConfig.Issuer,
                SigningCredentials = new SigningCredentials(
                                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityConfig.SecretKey ?? string.Empty)), 
                                        SecurityAlgorithms.HmacSha256Signature),
                Claims = new Dictionary<string, object>(1)
            };

            var tokenHandler = new JsonWebTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new JwtToken(securityToken));
        }

    }

}
