import React from 'react'
import { Switch } from 'react-router-dom'
import AllFolders from '../components/My Drive/Folders/allFolders'
import FoldersList from '../components/My Drive/Folders/folderList'
import AllAlbums from '../components/My Drive/Albums/allAlbums'
import AlbumsList from '../components/My Drive/Albums/albumList'

import ProtectedRoute from '../components/Protected'

const MyDriveRoutes = (props) => {
  return (
    <Switch>
      <ProtectedRoute exact path="/my-drive/folders">
        <AllFolders {...props} />
      </ProtectedRoute>
      <ProtectedRoute exact path="/my-drive/albums">
        <AllAlbums {...props} />
      </ProtectedRoute>
      <ProtectedRoute exact path="/my-drive/folders/:id">
        <FoldersList prevLink="/my-drive/folders" />
      </ProtectedRoute>
      <ProtectedRoute exact path="/my-drive/albums/:id">
        <AlbumsList prevLink="/my-drive/albums" />
      </ProtectedRoute>
    </Switch>
  )
}

export default MyDriveRoutes
