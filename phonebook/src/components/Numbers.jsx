
const Numbers = ({ persons, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.map(person => 
          <li key={person.id}>
            {person.name} {person.number} 
            <button 
              value={person.id}
              onClick={() => deletePerson(person.id)}>
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Numbers;