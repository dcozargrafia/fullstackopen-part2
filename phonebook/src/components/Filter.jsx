
const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter: <input 
                onChange={handleFilterChange}
                value={filter} /> 
    </div>
  );
};

export default Filter;