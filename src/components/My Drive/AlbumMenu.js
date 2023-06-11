import * as React from 'react'
import { IconButton } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const AlbumMenu = (props) => {
  const { controlSharedBox, type, shareWith, albumId } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const shareAlbum = () => {
    controlSharedBox(albumId, shareWith, type)
  }

  return (
    <div className="album-context-menu">
      <IconButton
        aria-label="more"
        id="long-button"
        className="album-menu-btn"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        className="album-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className="album-menu-item" onClick={handleClose}>
          Download
        </MenuItem>
        <MenuItem
          className="album-menu-item"
          onClick={() => {
            shareAlbum()
            handleClose()
          }}
        >
          Share
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AlbumMenu
