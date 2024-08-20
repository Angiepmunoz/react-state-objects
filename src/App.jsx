import { dogsData } from "./data";
import { useState } from "react";
import DogDetails from "./dogDetails";

function App() {
  const [dogs, setDogs] = useState(dogsData);

  const addDog = () => {
    // console.log("adding dog")
    const newDog = {
      id: dogs.length + 50,
      name: "Rover",
      present: false,
      grade: "100",
      notes: "The goodest new dog",
    };
    // setDogs(dogs.push(newDog))
    setDogs([...dogs, newDog]);
    // we are using our set function to update state
    // we're creating a new array so react knows that it must rerender the webpage
    // we are copying the content of the current state with the spread operator and adding the new dog
  };

  const removeDog = (dogId) => {
    console.log("removing dog");

    // our new state will be all the dogs that do not match the id that was passed to the function
    const filteredDogs = dogs.filter((dog) => dog.id !== dogId);
    setDogs(filteredDogs);
  };

  const updateDogAttendance = (dogId) => {
    console.log("update dog attendance for ", dogId);
    // copying the dogs array so we can update our copy
    const dogsArr = [...dogs];
    // find the dog with  the matching id number's array position
    const index = dogsArr.findIndex((dog)=> dog.id === dogId)

    //access the dogs present property and toggle with the bang operator 
    dogsArr[index].present = !dogsArr[index].present;

    setDogs(dogsArr);
  };

  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      </header>
      <aside></aside>
      <main>
        <button onClick={addDog}>Add a new dog</button>
        <ul>
          {dogs.map((dog) => {
            return (
              <li key={dog.id}>
                <span
                  onClick={()=>{{
                    updateDogAttendance(dog.id)
                  }}}
                  style={
                    dog.present
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  {dog.name}
                </span>
                <button
                  onClick={() => {
                    removeDog(dog.id);
                  }}
                >
                  remove
                </button>
               <DogDetails dog={dog}/>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
