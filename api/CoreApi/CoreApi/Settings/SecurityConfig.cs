namespace CoreApi.Settings
{

    public class SecurityConfig
    {

        public int JwtLifetimeDays { get; set; }

        public string? SecretKey { get; set; }

        public string? Audience { get; set; }

        public string? Issuer { get; set; }

    }

}
