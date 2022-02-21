import React from 'react';
import { useEffect, useReducer, useState } from 'react';
// Service
import getNgram from './services';
// Style
import './App.css';
// Other components
import Input from './components/Input';
import View from './components/View';
import Histogram from 'react-chart-histogram';

// Main Reducer
function reducer(state, action) {
	return getNgram(action.body, action.ngram, action.case_sensitive, action.length);
}
// Theme changer depending on the view type (chart/table)
function viewReducer(state, action) {
	if (state[0] === "Chart") {
		return ["Table", "green"];
	}
	return ["Chart", "purple"];
}

export default function App() {

	document.title = "WordStats Ngram Generator"

	const [state, dispatch] = useReducer(reducer, []);
	const [viewState, viewDispatch] = useReducer(viewReducer, ["Chart", "purple"]);
	// Input values
	const [bodyValue, setBodyValue] = useState("");
	const [ngramCount, setNgramCount] = useState("");
	const [length, setLength] = useState("");
	const [checked, setChecked] = useState(true);
	// Count the ngrams
	useEffect(() => {
		dispatch({
			body: bodyValue,
			ngram: parseInt(ngramCount) ? ngramCount : 1,
			case_sensitive: typeof checked === "boolean" ? checked : true,
			length: parseInt(length) ? length : 100
		});
	}, [bodyValue, ngramCount, length, checked])
	// Map the data
	let table_container = state.map((item, i) => (
		<tr key={i}>
			<td>{item.ngram}</td>
			<td>{item.count}</td>
		</tr>
	));
	// Hisogram props
	const labels = state.map((item, i) => item.ngram);
	const data = state.map((item, i) => item.count);
	const options = { fillColor: viewState[1], strokeColor: 'white' };

	return (
		<>
			<div className="input-wrap">
				<Input label="Body*" name="string-body" width="45%" direction="column"
					state={viewState} dispatch={viewDispatch} valueState={bodyValue} valueSetter={setBodyValue} />

				<Input label="N-gram (Optional)" name="n-gram" width="10%" direction="column"
					state={viewState} dispatch={viewDispatch} valueState={ngramCount} valueSetter={setNgramCount} />

				<Input label="Length (Optional)" name="length" width="10%" direction="column"
					state={viewState} dispatch={viewDispatch} valueState={length} valueSetter={setLength} />

				<Input label="Case Sensitive" name="case-sensitive" width="10%" type="switch-round" direction="column"
					state={viewState} dispatch={viewDispatch} checked={checked} setChecked={setChecked} />

				<View label="Change View" width="10%" direction="column" state={viewState} dispatch={viewDispatch} />
			</div>
			{/* Message for empty body */}
			{
				bodyValue ? null : (
					<h1 className="empty-msg">Enter a word or sentence to see the magic happen!</h1>
				)
			}
			{/* Render table or hisogram chart */}
			{
				(viewState[0] === "Table" && bodyValue.length > 0) ? (
					<div className="hisogram-container custom-scroll">
						<Histogram
							xLabels={labels}
							yValues={data}
							width={window.innerWidth * 0.9}
							height={window.innerHeight * 0.6}
							options={options}
						/>
					</div>
				) : bodyValue.length > 0 ? (
					<div className="table-container custom-scroll">
						<table>
							<tbody>
								<tr>
									<th>n-gram</th>
									<th>count</th>
								</tr>
								{
									table_container
								}
							</tbody>
						</table>
					</div>
				) : null
			}
		</>
	);
}