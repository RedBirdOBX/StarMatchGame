import React from "react";
import utils from "../math-utils";

const StarsDisplay = (props) => {
    return (
        <>
            {
                // get an array from the utils object and map into an array of stars.
                utils.range(1, props.CountOfStars).map(starId =>
                    <div key={starId} className="star" />
                )}
        </>
    );
};

export default StarsDisplay;
