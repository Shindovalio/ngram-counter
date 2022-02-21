import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import Input from './Input';

it("rendering successfully", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div)
})