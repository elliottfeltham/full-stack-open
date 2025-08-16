import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;

	const getAverage = () => {
		const average = (good * 1 + neutral * 0 + bad * -1) / total;
		if (total === 0) {
			return 0;
		}
		return average;
	};

	const getPositivePercent = () => {
		if (total === 0) {
			return 0;
		}
		return (good / total) * 100;
	};

	if (total === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<>
			<StatisticLine text={"good"} value={good} />
			<StatisticLine text={"neutral"} value={neutral} />
			<StatisticLine text={"bad"} value={bad} />
			<StatisticLine text={"total"} value={total} />
			<StatisticLine text={"average"} value={getAverage()} />
			<StatisticLine text={"positive"} value={getPositivePercent()} />
		</>
	);
};

export default Statistics;
