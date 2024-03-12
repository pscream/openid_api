namespace CoreApi.Models.Tokens
{

    public class JwtToken
    {

        public string Token { get; private set; }

        public JwtToken(string token)
        {
            Token = token;
        }

    }

}
