import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';

function MainViewSideBar() {
  return (
    <NotefulContext.Consumer>
      {(value) => {
        const folders = value.folders.map((folder) => (
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
      }}
    </NotefulContext.Consumer>
  );
}

export default withRouter(MainViewSideBar);
