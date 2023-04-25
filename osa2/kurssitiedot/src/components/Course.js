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

const CourseSingle = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content props={course}/>
			<Total props={course}/>
		</div>
	)
}

const Course = ({courses}) => {
	return (
		  <div>
			{courses.map(course =>
				<CourseSingle key={course.id} course={course} />)}
		  </div>
	)
}

export default Course