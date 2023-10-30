using MIS321_PA4.interfaces;
using MIS321_PA4.database;
namespace MIS321_PA4.models
{
    public class Exercise
    {
        public int id { get; set; }
        public string activityType { get; set; }
        public decimal distanceMiles { get; set; }
        public DateTime dateCompleted { get; set; }
        public bool pinned { get; set; } = false;
        public bool deleted { get; set; } = false; 

        public ISave Save{get; set;}

        public Exercise() {
            Save = new SaveExercise();
        }
    }
}