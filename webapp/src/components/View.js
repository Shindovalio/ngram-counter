import React from 'react';
import PropTypes from 'prop-types';
// Style
import './View.css';

export default function View(props) {

    const [state, dispatch] = [props.state, props.dispatch];

    let style = {
        width: props.width,
        flexDirection: props.direction
    }

    // Render the view change button
    return (
        <div className="view-container" style={style}>
            <label>{props.label}</label>
            <button className={`view-btn ${state[0]}-view shadow`} type="button"
                onClick={dispatch}>
                {state[0]}
            </button>
        </div>
    );
}
View.defaultProps = {
    width: "100%",
    direction: "row"
}
View.propTypes = {
    label: PropTypes.string,
    width: PropTypes.string,
    direction: PropTypes.string,
    state: PropTypes.array,
    dispatch: PropTypes.func
}