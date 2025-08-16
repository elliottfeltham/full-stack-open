import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content
				part1={course.parts[0].name}
				exercises1={course.parts[0].exercises}
				part2={course.parts[1].name}
				exercises2={course.parts[1].exercises}
				part3={course.parts[2].name}
				exercises3={course.parts[2].exercises}
			/>
			<Total
				exercises1={course.parts[0].exercises}
				exercises2={course.parts[1].exercises}
				exercises3={course.parts[2].exercises}
			/>
		</div>
	);
};

export default App;
