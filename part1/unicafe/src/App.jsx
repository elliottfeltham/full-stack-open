import { useState } from "react";
import Button from "./Components/Button";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		return setGood(good + 1);
	};

	const handleNeutralClick = () => {
		return setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		return setBad(bad + 1);
	};

	return (
		<div>
			<h2>give feedback</h2>
			<Button onClick={handleGoodClick} label={"Good"} />
			<Button onClick={handleNeutralClick} label={"Neutral"} />
			<Button onClick={handleBadClick} label={"Bad"} />
			<h2>statistics</h2>
			<p>good: {good}</p>
			<p>neutral: {neutral}</p>
			<p>bad: {bad}</p>
		</div>
	);
};

export default App;
