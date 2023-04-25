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
	console.log(parts)
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
const App = () => {
	const course = {
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
		  name: 'redux',
		  exercises: 11,
		  id: 4
		}

	  ]
	}
  
	return (
	  <div>
		<Course course={course} />
	  </div>
	)
  }
  
  export default App
  