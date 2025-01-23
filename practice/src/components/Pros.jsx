import PropTypes from "prop-types";
import React from "react";

class ComponentOne extends React.Component {
    render() {
        return (
            <div>
                <h1>Pop 1: {this.props.p1}</h1>
                <h2>Pop 2: {this.props.p2}</h2>
                <h3>Pop 3: {this.props.p3 ? "True" : "False"}</h3>
                <h4>Pop 4:</h4>
                <ul>
                    {this.props.p4.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        );
    }
}

ComponentOne.propTypes = {
    p1: PropTypes.number,
    p2: PropTypes.string,
    p3: PropTypes.bool,
    p4: PropTypes.array
};

ComponentOne.defaultProps = {
    p1: 100,
    p2: "Karthikeyan",
    p3: true,
    p4: [1, 2, 3, 4]
};

export default ComponentOne;
