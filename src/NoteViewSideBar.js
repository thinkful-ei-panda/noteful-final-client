import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';

function NoteViewSideBar(props) {
    return (
        <NotefulContext.Consumer>
            {meow => {
                const currentNote = meow.notes.find(note => note.id === Number(props.match.params.note_id))
                const currentFolder = meow.folders.find(folder => folder.id === currentNote.folder_name)
                if (currentFolder) {
                    return (
                        <section className="border group-column item">
                            <ul>
                                <li><Link to='/'>Go Back</Link></li>
                                <li><Link to={`/folder/${currentFolder.id}`}>Folder: {currentFolder.folder_name}</Link></li>
                            </ul>
                        </section>
                    )
                };
                return (
                    <section className="border group-column item">
                        <ul>
                            <li><Link to='/'>Go Back</Link></li>
                        </ul>
                    </section>
                );
            }}
        </NotefulContext.Consumer>
    );
};

NoteViewSideBar.propTypes = {
    match: propTypes.object.isRequired
};

export default withRouter(NoteViewSideBar);