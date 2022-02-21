import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import App from './App';

it("rendering successfully", () => {
	const div = document.createElement("div");
	ReactDOM.render(<App />, div)
})