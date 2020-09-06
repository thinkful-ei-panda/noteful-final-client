import React from 'react';
import { Link } from 'react-router-dom';

class NotefulErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        };
    };
    
    static defaultProps = {
        error: ':('
    };

    static getDerivedStateFromError(error) {
        return {hasError: true};  
    };

    componentDidCatch (error, errorInfo) {
        console.log(error, errorInfo);
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="group-column">
                    <h2>Oops, something went wrong!</h2>
                    <p>{this.props.error}</p>
                    <p><Link to='/'>Go back to main page</Link></p>
                </div>
            );
        };
        return this.props.children;
    };
};

export default NotefulErrorBoundary;