import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { folder, camera } from '../../utils/svg/index'

const Sidebar = () => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className="sidebar">
      <ul className="sidebar-options">
        <li className={pathname.includes('/my-drive/folders') ? 'active' : ''}>
          <Link to={'/my-drive/folders'}>
            <span>{folder}</span>Folder
          </Link>
        </li>
        <li className={pathname.includes('/my-drive/albums') ? 'active' : ''}>
          <Link to={'/my-drive/albums'}>
            <span>{camera}</span>Photos
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
