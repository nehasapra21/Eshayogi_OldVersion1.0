import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { toast } from 'react-toastify'

import CreateHeader from '../headers/createHeader'

import {
  folder,
  uploadInFolder,
  edit,
  trashFolder,
  navigateToFolder,
} from '../../../utils/svg/index'

import FileSkeleton from '../../Skeletons/Drive Skeletons/FileSkeleton'

import api from '../../../utils/api'

const AllFolders = (props) => {
  const { effectControl, fetchStatus, controlSharedBox } = { ...props }
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const [showSkeleton, setSkeleton] = useState(true)

  useEffect(async () => {
    setSkeleton(true)
    try {
      const response = await api.getFolder(fetchStatus)
      setCount(Math.ceil(response.length / 10))
      setData([...response.splice((page - 1) * 10, 10)])
      setSkeleton(false)
    } catch {
      toast.error('Unable to fetch folders.')
    }
  }, [effectControl, page, fetchStatus])

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <div className="frame-drive">
      <CreateHeader
        head="All Folders"
        btnText="Create Folder"
        onClickAction={() => {
          props.controlBoxFunc('Folder', 'Create')
        }}
      />

      <TableContainer className="folder-table-container" component={Paper}>
        <Table className="folder-table" aria-label="simple table">
          <TableHead className="folder-table-header">
            <TableRow className="folder-table-header-row">
              <TableCell
                className="folder-table-header-cell"
                style={{ fontWeight: 'bold' }}
              >
                Folder Name
              </TableCell>
              <TableCell className="folder-table-header-cell" width="19%">
                Owner
              </TableCell>
              <TableCell className="folder-table-header-cell" width="13%">
                Created Date
              </TableCell>
            </TableRow>
          </TableHead>

          {showSkeleton ? (
            <FileSkeleton />
          ) : data && data.length !== 0 ? (
            <TableBody className="folder-table-body">
              {data.map((folderData, index) => {
                const { detail, sharedWith } = { ...folderData }
                const { byUser, driveId, name, createdAt } = { ...detail }
                const date = new Date(createdAt)
                return (
                  <TableRow className="folder-table-row" key={index}>
                    <TableCell className="folder-table-cell">
                      <div className="folder-name">
                        <div className="icon">{folder}</div>
                        <Link
                          to={{
                            pathname: `/my-drive/folders/${driveId}`,
                            state: {
                              folderName: name,
                            },
                          }}
                        >
                          <h3>{detail.name}</h3>
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="folder-table-cell">
                      <div className="folder-info">
                        <p>{byUser.firstName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="folder-table-cell">
                      <div className="folder-info">
                        <p>
                          {date.getDate()}/{date.getMonth()}/
                          {date.getFullYear()}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          ) : (
            <p className="no-data-text">No Data Found</p>
          )}
        </Table>
      </TableContainer>
      <div className="drive-pagination">
        <Pagination count={count} page={page} onChange={handleChange} />
      </div>
    </div>
  )
}

// ;<div className='helper-functions'>
//   <div>{uploadInFolder}</div>
//   <div>{edit}</div>
//   <div>{trashFolder}</div>
//   <div
//     onClick={() => controlSharedBox(driveId, sharedWith, 'Folder')}
//     aria-hidden='true'
//   >
//     {navigateToFolder}
//   </div>
// </div>

export default AllFolders
