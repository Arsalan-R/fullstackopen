const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ parts }) => 
  <p>
    {parts.name} {parts.exercises}
  </p>

const Course = ({ course }) => {
  const content = course.parts
  const total = content.map(part => part.exercises)
  console.log(total);
  return(
    <div>
    <Header course={course.name} />
    {content.map(line => <Part key={line.id} parts={line} />)}
    <Total sum={total.reduce((num, sum) => num + sum)} />
    </div>
  )
}

export default Course