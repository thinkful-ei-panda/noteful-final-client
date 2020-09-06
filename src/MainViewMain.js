import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import NotefulContext from './NotefulContext';
import config from './config';

function MainViewMain(props) {
  const deleteNoteRequest = (id, deleteNoteFromUI) => {
    fetch(`${config.API_ENDPOINT}/api/notes/${id}`, {
      'method': 'DELETE',
    })
      .then((response) => deleteNoteFromUI(id))
      .then(props.history.push('/'));
  };

  return (
    <NotefulContext.Consumer>
      {(value) => {
        const notes = value.notes.map((note) => {
          return (
            <section
              className='border group-column note-margin note-padding width'
              key={note.id}
            >
              <h2>
                <Link to={`/note/${note.id}`}>Note Name: {note.note_name}</Link>
              </h2>
              <div className='group-row note-group-row'>
                <p>
                  Date modified on: {new Date(note.modified).toLocaleString()}
                </p>
                <button
                  onClick={() =>
                    deleteNoteRequest(note.id, value.deleteNoteFromUI)
                  }
                >
                  Delete Note
                </button>
              </div>
            </section>
          );
        });

        return (
          <section className='border group-column item-double'>{notes}</section>
        );
      }}
    </NotefulContext.Consumer>
  );
}

MainViewMain.propTypes = {
  history: propTypes.object,
};

export default withRouter(MainViewMain);
