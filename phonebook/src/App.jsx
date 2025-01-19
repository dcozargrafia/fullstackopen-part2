import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import Numbers from './components/Numbers';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [colorMessage, setColorMessage] = useState('green');


  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      const confirmUpdate = window.confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const person = persons.find(person => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        phonebookService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id 
                                          ? p 
                                          : returnedPerson));
            setNewName('');
            setNewNumber('');
            setColorMessage('green');
            setErrorMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch(error => {
            setColorMessage('red');
            setErrorMessage(`Information of ${person.name} has already been removed from server`);
            setPersons(persons.filter(p => p.id !== person.id));
          });
      };
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
          setColorMessage('green');
          setErrorMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      phonebookService
        .deleteRecord(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setColorMessage('green');
          setErrorMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch(error => {
          alert(`The person '${person.name}' was already deleted from server`);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} color={colorMessage}/>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;