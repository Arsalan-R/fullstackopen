import Course from './components/info.jsx'

const App = ({courses}) => {

  return (
    <div>
      {courses.map(course => <Course course={course} /> )}
    </div>
  )
}

export default App