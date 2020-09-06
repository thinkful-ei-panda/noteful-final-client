import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import ErrorView from './ErrorView';
import AddFolderFormView from './AddFolderFormView';
import AddNoteFormView from './AddNoteFormView';
import MainViewSideBar from './MainViewSideBar';
import FolderViewSideBar from './FolderViewSideBar';
import NoteViewSideBar from './NoteViewSideBar';
import MainViewMain from './MainViewMain';
import FolderViewMain from './FolderViewMain';
import NoteViewMain from './NoteViewMain';
import NotefulContext from './NotefulContext';
import NotefulErrorBoundary from './NotefulErrorBoundary';
import './App.css';
import config from './config';

// Code could be improved with better information architecture. 
class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: {}
  }

  addFolderToUI = (newFolder) => {
    const newFolders = this.state.folders;
    newFolders.push(newFolder);
    this.setState({folders: newFolders, notes: [...this.state.notes]});
  };

  addNoteToUI = (newNote) => {
    const newNotes = this.state.notes;
    newNotes.push(newNote);
    this.setState({folders: [...this.state.folders], notes: newNotes});
  };

  deleteNoteFromUI = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({folders: [...this.state.folders], notes: newNotes});
  };

  get = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/folders`, {
        headers : {
          'Authorization': `Bearer ${config.API_KEY}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/api/notes`, {
        headers : {
          'Authorization': `Bearer ${config.API_KEY}`
        }
      }),
    ])
      .then(([folders, notes]) => {
        if (!folders.ok) {
          return folders.json()
            .then(e => Promise.reject(e));
        };

        if (!notes.ok) {
          return notes.json()
            .then(e => Promise.reject(e));
        };

        return Promise.all([folders.json(), notes.json()])
      })
      .then(([folders, notes]) => {
        console.log(folders, notes)
        this.setState({folders, notes});
      })
      .catch(error => this.setState({error}, () => console.log(error)))
  };

  componentDidMount = () => {
    this.get();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolderToUI: this.addFolderToUI,
      addNoteToUI: this.addNoteToUI,
      deleteNoteFromUI: this.deleteNoteFromUI,
      get: this.get
    };

    if (this.state.error.message) {
      return (
        <>
          <Header />
          <main className="wrapper">
            <div className="group-row">
              <ErrorView error={this.state.error.message}/>
            </div>
          </main>
        </> 
      )
    }

    return (
      <>
        <Header />
        <main className="wrapper">
          <div className="group-row">
            

            <NotefulContext.Provider
              value={contextValue}
              >
              
              <NotefulErrorBoundary>
                {/* Add Form Route */}
                <Route exact path='/addFolderFormView' component={MainViewSideBar} />
                <Route exact path='/addFolderFormView' component={AddFolderFormView} />

                {/* Add Note Route */}
                <Route exact path='/addNoteFormView' component={MainViewSideBar} />
                <Route exact path='/addNoteFormView' component={AddNoteFormView} />
              </NotefulErrorBoundary>



              <NotefulErrorBoundary>
                {/* Sidebars */}
                {/* Main Route */}
                <Route exact path='/' component={MainViewSideBar} />

                {/* Dynamic Folder Route */}
                <Route exact path='/folder/:folder_id' component={FolderViewSideBar} />

                {/* Dynamic Note Route */}
                <Route exact path='/note/:note_id' component={NoteViewSideBar} />
              </NotefulErrorBoundary>



              {/* <NotefulErrorBoundary> */}
                {/* Main Sections */}
                {/* Main Route */}
                <Route exact path='/' component={MainViewMain} />
                  
                {/* Dynamic Folder Route */}
                <Route exact path='/folder/:folder_id' component={FolderViewMain} />

                {/* Dynamic Note Route */}
                <Route exact path='/note/:note_id' component={NoteViewMain} />
              {/* </NotefulErrorBoundary> */}

            </NotefulContext.Provider>



          </div>
        </main>
      </>
    );
  };
};

export default App;