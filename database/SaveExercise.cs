using MySql.Data.MySqlClient;
using MIS321_PA4.interfaces;
using MIS321_PA4.models;

namespace MIS321_PA4.database
{
    public class SaveExercise : ISave 
    {
        public static void CreateExerciseTable() {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"CREATE TABLE IF NOT EXISTS exercise 
            (id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            activityType VARCHAR(50) NOT NULL, 
            distanceMiles DECIMAL(5,2) NOT NULL, 
            dateCompleted DATE NOT NULL, 
            pinned BOOLEAN DEFAULT = FALSE, 
            deleted BOOLEAN DEFAULT  = FALSE)";

            using var cmd = new MySqlCommand(stm,con);

            cmd.ExecuteNonQuery();
    }
        public void CreateExercise(Exercise myExercise){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO exercise(activityType, distanceMiles, dateCompleted, pinned, deleted) VALUES(@activityType, @distanceMiles, @dateCompleted, @pinned, @deleted)";
            using var cmd = new MySqlCommand(stm, con);

                cmd.Parameters.AddWithValue("@activityType", myExercise.activityType);
                cmd.Parameters.AddWithValue("@distanceMiles", myExercise.distanceMiles);
                cmd.Parameters.AddWithValue("@dateCompleted", myExercise.dateCompleted);
                cmd.Parameters.AddWithValue("@pinned", myExercise.pinned);
                cmd.Parameters.AddWithValue("@deleted", myExercise.deleted);

                cmd.Prepare();

                cmd.ExecuteNonQuery();
        }



        void ISave.SaveExercise(Exercise myExercise) {
            CreateExercise(myExercise);
        }
    }
}