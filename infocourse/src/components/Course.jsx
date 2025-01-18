const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>;

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>;

const Content = ({ parts }) => 
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>;

const Course = ({ course }) => {
  const { parts } = course;
  const exercises = parts.map(p => p.exercises);

  const totalExercises = exercises.reduce((sum, p) => {
    
    return sum + p;
  }, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises} />
    </>
  );
};

export default Course;