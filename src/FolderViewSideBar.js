import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

// Using class component here for practice
class FolderViewSideBar extends React.Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders.map((folder) => (
      <li key={folder.id}>
        <NavLink to={`/folder/${folder.id}`} activeClassName='selected'>
          Folder: {folder.folder_name}
        </NavLink>
      </li>
    ));
    return (
      <section className='border group-column item'>
        <ul>
          <li>
            <NavLink to='/addFolderFormView' className='action'>
              Add Folder
            </NavLink>
          </li>
          <li>
            <NavLink to='/addNoteFormView' className='action'>
              Add Note
            </NavLink>
          </li>
        </ul>
        <ul>{folders}</ul>
      </section>
    );
  }
}

export default withRouter(FolderViewSideBar);
