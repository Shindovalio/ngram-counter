import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import View from './View';

it("rendering successfully", () => {
    const div = document.createElement("div");
    ReactDOM.render(<View />, div)
})