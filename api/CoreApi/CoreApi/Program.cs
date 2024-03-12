using System.Text;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using CoreApi.Settings;



namespace CoreApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors();

            // Add services to the container.

            builder.Services.AddControllers();

            var securitySection = builder.Configuration.GetSection("Security");

            builder.Services.Configure<SecurityConfig>(securitySection);
            var issuer = securitySection.GetValue<string>("Issuer");
            var audience = securitySection.GetValue<string>("Audience");
            var secretKey = securitySection.GetValue<string>("SecretKey");
            if (!string.IsNullOrWhiteSpace(secretKey))
            {
                var key = Encoding.UTF8.GetBytes(secretKey);
                builder.Services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha256Signature },
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidIssuers = new[] { issuer },
                        ValidateAudience = true,
                        ValidAudiences = new[] { audience },
                        ClockSkew = TimeSpan.Zero
                    };

                    options.Events = new JwtBearerEvents()
                    {
                        OnTokenValidated = c =>
                        {
                            Console.WriteLine("User successfully authenticated");
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = c =>
                        {
                            c.NoResult();
                            c.Response.StatusCode = 500;
                            c.Response.ContentType = "text/plain";
                            return c.Response.WriteAsync("An error occured processing your authentication.");
                        }
                    };

                });
            }

            var app = builder.Build();


            // Configure the HTTP request pipeline.

            app.UseCors(x => x
                           .AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
