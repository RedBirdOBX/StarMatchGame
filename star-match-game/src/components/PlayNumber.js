import React from "react";

const colors =
{
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const PlayNumber = (props) => {
    return (
        <button className="number"
            style={{ backgroundColor: colors[props.Status] }}
            onClick=
            {() =>
                props.OnClick(props.Number, props.Status)
            }>
            {props.Number}
        </button>);
};

export default PlayNumber;