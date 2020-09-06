import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';
import config from './config';

class AddFolderFormView extends React.Component {
    state = {
        newfolderName: '',
        error: {
            message: null
        },
    };

    static contextType = NotefulContext;

    validateFolderName = (newFolderName) => {  
        if (!newFolderName) {
            const error = {message: 'Name must be at least 1 character long'};
            this.setState({error});
        } else {
            this.setState({newFolderName, error: null});
        }
    };

    inputFolderName = (e) => {
        const newFolderName = e.target.value;
        this.validateFolderName(newFolderName);
    };

    addFolderRequest = (e) => {
        e.preventDefault();
        const newFolder = {folder_name: this.state.newFolderName};
        const jsonStringifiedFolderData = JSON.stringify(newFolder);

        let error;
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            'method' : 'POST',
            'headers' : {
                'Authorization': `Bearer ${config.API_KEY}`,
                'Content-Type': 'application/json',
            },
            'body' : jsonStringifiedFolderData
        })
            .then(response => {
                if (!response.ok) {
                    error.code = response.code;
                }
                return response.json()
            })
            .then(response => {
                if (error) {
                    error.message = response.message;
                    return Promise.reject(error);
                }

                const newFolder = response[0];
                this.context.addFolderToUI(newFolder)
                this.props.history.push(`/folder/${newFolder.id}`)
            })
            .catch(error => this.setState({error}))
    };

    render() {
        return (
            <div className="border group-column item-double justify-content-center">
                <form className="align-self-center" onSubmit={(e) => this.addFolderRequest(e)}>
                    <label htmlFor='newFolderName'>Name:</label>
                    <input className='' id='newFolderName' name='newFolderName' onChange={(e) => this.inputFolderName(e)} type='text' required></input>
                    <button type='submit'>Add Folder</button>

                    {/* Should this be its own Component? */}
                    {this.state.error ? <p>{this.state.error.message}</p> : ''}

                </form>
            </div>
        );
    };
};


AddFolderFormView.propTypes = {
    history: propTypes.object
}

export default withRouter(AddFolderFormView);