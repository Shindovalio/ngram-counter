import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
// Style
import './Input.css';

export default function Input(props) {
    const [inputFocused, setInputFocused] = useState(false);
    const [state, dispatch] = [props.state, props.dispatch];
    const [valueState, valueSetter] = [props.valueState, props.valueSetter]
    const [checked, setChecked] = [props.checked, props.setChecked];

    let style = {
        width: props.width,
        flexDirection: props.direction
    }

    let inputStyle = {
        border: `3px solid ${inputFocused ? state[1] : "transparent"}`
    }

    // Render switch input or basic text input
    return props.type !== "switch" && props.type !== "switch-round" ? (
        <div className="input-container" style={style}>
            <label className="basic-label" htmlFor={props.name}>{props.label}</label>
            <input className={`${props.name} basic-input shadow`} name={props.name} style={inputStyle}
                onFocus={e => setInputFocused(true)}
                onBlur={e => setInputFocused(false)}
                value={valueState}
                onChange={e => valueSetter(e.target.value)} />
        </div>
    ) : (
        <div className="input-container" style={style}>
            <label>{props.label}</label>
            <label className="switch">
                <input className={`check-box ${checked ? "checked" : ""}`} defaultValue={checked}
                    onClick={e => setChecked(checked ? false : true)} />
                <span className={`slider ${checked ? state[1] : "white"} shadow ${props.type === "switch-round" ? "round" : ""}`}></span>
            </label>
        </div>
    );
}
Input.defaultProps = {
    width: "100%",
    type: "text",
    direction: "row"
}
Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.string,
    type: PropTypes.string,
    direction: PropTypes.string,
    state: PropTypes.array,
    dispatch: PropTypes.func
}