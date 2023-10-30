namespace MIS321_PA4
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString() {
            string server = "lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "v5dmrbpsnfz194es";
            string port = "3306";
            string userName = "vl41tjc2q6o0v2co";
            string password = "ypa3x12v6jn5y5wf";

            cs = $@"server = {server};user={userName};database={database};port={port};password={password};";
        }
    }
}