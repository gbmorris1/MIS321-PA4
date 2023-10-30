using MIS321_PA4.database;
using MIS321_PA4.models;
using System;

namespace PA4
{
    class Program
    {
        static void Main(string[] args){
            Exercise myExercise = new Exercise();
            myExercise.Save.CreateExercise(myExercise);
        }
    }
}
