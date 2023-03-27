import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(r => r.json())
    .then(setToys)
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  
  function addToy(toy){
    setToys([toy, ...toys])
  }

  function deleteToy(id){
    fetch("http://localhost:3001/toys/" + id, {
      method: "DELETE",
      })
      removeToy(id)
  }
  
  function removeToy(id) {
    const updatedToys = toys.filter(toy => toy.id !== id)
    setToys(updatedToys)
  }

  function onUpdateToy(updatedToy){
    const updatedToys = toys.map((toy) => toy.id ===updatedToy.id ? updatedToy: toy )
    setToys(updatedToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer onUpdateToy={onUpdateToy} deleteToy={deleteToy} toys={toys} />
    </>
  );
}

export default App;
