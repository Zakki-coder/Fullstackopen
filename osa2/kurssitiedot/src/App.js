const Header = ({name}) => {
	return (
		<div>
			<h1>{name}</h1>
		</div>
	)
}

const Part = ({props}) => {
	return (
		<div>
			<p> {props.name} {props.exercises} </p>
		</div>
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

const Total = (props) => {
	return (
		<div>
			<p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
		</div>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content props={course}/>
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
  