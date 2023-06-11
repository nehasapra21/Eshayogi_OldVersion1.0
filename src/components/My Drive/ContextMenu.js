import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import api from '../../utils/api'

const AlbumContextMenu = (props) => {
  const { divId } = props

  return (
    <ContextMenu id={divId} className="photo-context-menu">
      <a
        href={`${api.BASE_URL_DRIVE}${divId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="context-link"
      >
        <MenuItem className="photo-menu-item">Download</MenuItem>
      </a>
    </ContextMenu>
  )
}

export default AlbumContextMenu
