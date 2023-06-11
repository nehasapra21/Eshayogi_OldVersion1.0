import React, { useEffect, useState } from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { Dropdown } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Pagination from '@material-ui/lab/Pagination'

import UploadHeader from '../headers/uploadHeader'

import {
  download,
  editPurple,
  pdf,
  trashFolderPurple,
} from '../../../utils/svg'
import api from '../../../utils/api'

import FileSkeleton from '../../Skeletons/Drive Skeletons/FileSkeleton'

const FoldersList = (props) => {
  const { prevLink } = { ...props }
  const match = useRouteMatch()
  const location = useLocation()
  const { id } = { ...match.params }
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [apiCalled, setApiCall] = useState(true)
  const [count, setCount] = useState(1)
  const [showSkeleton, setSkeleton] = useState(true)
  const apiBody = {
    uid: id,
    offset: offset.toString(),
    limit: '10',
  }
  const files = new FormData()

  useEffect(async () => {
    setSkeleton(true)
    try {
      const response = await api.getFolderData(apiBody)
      setCount(Math.ceil(response.count / 10))
      setData(response.rows ? [...response.rows] : [])
      setSkeleton(false)
    } catch {
      toast.error('Unable to fetch files.')
    }
  }, [page, apiCalled])

  const handleChange = (event, value) => {
    setOffset((value - 1) * 10)
    setPage(value)
  }

  const UploadFile = async (event) => {
    const fileData = event.target.files
    if (fileData.length <= 5) {
      for (let i = 0; i < fileData.length; i += 1) {
        if (fileData[i].size > 5242880) {
          toast.error('File should be less than 5MB')
          event.target.value = []
          return false
        }
      }
      for (let i = 0; i < fileData.length; i += 1) {
        files.append('files', fileData[i])
      }
      const response = await api.uploadFiles(files)
      if (response) {
        if (response.length === 1) {
          const body = {
            uid: id,
            url: response[0],
            mimeType: 'PDF',
            type: 'PDF',
            meta: {
              comment: '',
              tag: '',
            },
          }
          const res = await api.addFile(body)
          if (res) {
            setApiCall(!apiCalled)
          }
        } else {
          const body = {
            folderId: id,
            urls: [...response],
            mimeType: 'PDF',
            type: 'PDF',
            folderName: location?.state?.folderName || '',
          }
          const res = await api.addMultipleFilesToSingleFolder(body)
          if (res) {
            setApiCall(!apiCalled)
          }
        }
      }
    } else {
      toast.error('Only 5 files allowed at a time')
      event.target.value = []
      return false
    }
    return null
  }

  return (
    <div className="frame-drive">
      <UploadHeader
        head="All Folders"
        btnText="Upload File"
        fileName={location.state.folderName}
        accept="application/pdf"
        uploadFunction={UploadFile}
        prevLink={prevLink}
      />

      <TableContainer className="folder-table-container" component={Paper}>
        <Table className="folder-table" aria-label="simple table">
          <TableHead className="folder-table-header">
            <TableRow className="folder-table-header-row">
              <TableCell
                className="folder-table-header-cell"
                style={{ fontWeight: 'bold' }}
              >
                File Name
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
              {data.map((file, index) => {
                const { url, createdAt } = { ...file }
                const { byUser } = { ...file }
                const strArr = url.split('/')
                const date = new Date(createdAt)
                return (
                  <TableRow className="folder-table-row" key={index}>
                    <TableCell className="folder-table-cell">
                      <div className="file-name">
                        <div className="icon">{pdf}</div>
                        <p title={strArr[strArr.length - 1]}>
                          {strArr[strArr.length - 1]}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="folder-table-cell">
                      <div className="file-info">
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
            <p className="no-data-text">No data found</p>
          )}
        </Table>
      </TableContainer>
      <div className="drive-pagination">
        <Pagination count={count} page={page} onChange={handleChange} />
      </div>
    </div>
  )
}

{
  /* {
  <div className='helper-dropdown'>
                  <Dropdown
                    className='d-inline mx-2'
                    align='end'
                    title='Dropdown right'
                    id='dropdown-menu-align-right'
                  >
                    <Dropdown.Toggle id='dropdown-autoclose-true' />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        href={`${CONST.BASE_URL}${url}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <div className='icon'>{download}</div>
                        <p>Download</p>
                      </Dropdown.Item>
                      <Dropdown.Item href='/'>
                        <div className='icon'>{trashFolderPurple}</div>
                        <p>Delete</p>
                      </Dropdown.Item>
                      <Dropdown.Item href='/'>
                        <div className='icon'>{editPurple}</div>
                        <p>Rename</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
} */
}

export default FoldersList
