using MIS321_PA4.models;

namespace MIS321_PA4.interfaces
{
    public interface ISave
    {
         public void CreateExercise(Exercise myExercise);
         public void SaveExercise(Exercise myExercise);
    }
}