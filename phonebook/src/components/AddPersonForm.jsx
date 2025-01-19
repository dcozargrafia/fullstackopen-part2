

const AddPersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
                onChange={handleNameChange}
                value={newName}/>
      </div>
      <div>
        number: <input
                  value={newNumber}
                  onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">
          Add person
        </button>
      </div>
    </form>
  );
};

export default AddPersonForm;