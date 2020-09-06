import React from 'react';
import propType from 'prop-types';
import { Link } from 'react-router-dom';

class ErrorView extends React.Component {
    static defaultProps = {
        error: ':<'
    };

    render() {
        return (
            <div className="group-column">
                <h2>Oops, something went wrong!</h2>
                <p>{this.props.error}</p>
                <p><Link to='/'>Go back to main page</Link></p>
            </div>
        );
    };
};

ErrorView.propType = {
    error: propType.string
}

export default ErrorView;