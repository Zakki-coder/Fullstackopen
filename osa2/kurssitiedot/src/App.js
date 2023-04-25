const Header = ({name}) => {
	return (
		<h1>{name}</h1>
	)
}

const Part = ({props}) => {
	return (
		<p> {props.name} {props.exercises} </p>
	)
}

const Content = ({props}) => {
	const parts = props.parts
	return (
		<div>
			{parts.map(part =>
				<Part key={part.id} props={part} />)}
		</div>
	)
}

const Total = ({props}) => {
	const exercises = props.parts.map(part =>
		part.exercises).reduce((partialSum, a) => partialSum + a, 0)
	return (
			<b>total of {exercises} exercises</b>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content props={course}/>
			<Total props={course}/>
		</div>
	)
}

const Courses = ({courses}) => {
	return (
		  <div>
			{courses.map(course =>
				<Course key={course.id} course={course} />)}
		  </div>
	)
}

const App = () => {
	const courses = [
		{
		  name: 'Half Stack application development',
		  id: 1,
		  parts: [
			{
			  name: 'Fundamentals of React',
			  exercises: 10,
			  id: 1
			},
			{
			  name: 'Using props to pass data',
			  exercises: 7,
			  id: 2
			},
			{
			  name: 'State of a component',
			  exercises: 14,
			  id: 3
			},
			{
			  name: 'Redux',
			  exercises: 11,
			  id: 4
			}
		  ]
		}, 
		{
		  name: 'Node.js',
		  id: 2,
		  parts: [
			{
			  name: 'Routing',
			  exercises: 3,
			  id: 1
			},
			{
			  name: 'Middlewares',
			  exercises: 7,
			  id: 2
			}
		  ]
		}
	  ]
  
	return (
	  <div>
		<Courses courses={courses} />
	  </div>
	)
  }
  
  export default App
  