import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Containers from '../../hoc/containerDivs/index'
import Sidebar from './sidebar'
import SearchHeader from './searchHeader'
import MyDriveRoutes from '../../routes/myDriveRoutes'
import CreateAndRenameBox from './createAndRenameBox'
import {
  createNewFolder,
  renameFolder,
  createNewAlbum,
} from '../../utils/svg/index'

import SharedBox from './sharedBox'

import api from '../../utils/api'

const MyDriveComponent = () => {
  const [showBox, setShowBox] = useState(false)
  const [showShared, setSharedBox] = useState(false)
  const [driveId, setDriveId] = useState('')
  const [shareWith, setShareWith] = useState([])
  useEffect(() => {
    if (withWhomToDo === 'Folder') {
      if (whatToDo === 'Create') {
        setProps(createFolderProps)
      } else {
        setProps(renameFolderProps)
      }
    } else if (whatToDo === 'Create') {
      setProps(createAlbumProps)
    } else {
      setProps(renameAlbumProps)
    }
  }, [showBox])
  const [withWhomToDo, setWithWhom] = useState('Folder')
  const [whatToDo, setAction] = useState('Create')
  const [propsToPass, setProps] = useState(createNewFolder)
  const [cntrlAPICall, setAPICall] = useState(true)
  const [driveFiles, switchFiles] = useState('All')
  let response = ''

  const controlBoxFunc = (withWhom = 'Folder', action = 'Create') => {
    setWithWhom(withWhom)
    setAction(action)
    setShowBox(!showBox)
  }

  const controlAPICall = (response) => {
    if (response.data.code === 'SUCCESS') {
      setAPICall(!cntrlAPICall)
    }
  }

  const controlSharedBox = (id, sharedWith = [], driveType) => {
    setWithWhom(driveType)
    setDriveId(id)
    setShareWith([...sharedWith])
    setSharedBox(!showShared)
  }

  const submitFunction = async (values) => {
    if (withWhomToDo === 'Folder') {
      if (whatToDo === 'Create') {
        response = await api.addDriveFolder(values)
        controlAPICall(response)
      } else {
        setProps(renameFolderProps)
      }
    } else if (whatToDo === 'Create') {
      response = await api.addAlbum(values)
      controlAPICall(response)
    } else {
      setProps(renameAlbumProps)
    }
  }

  const createFolderProps = {
    head: 'Create New Folder',
    icon: createNewFolder,
    label: 'Please enter new folder name .',
    submitBtnName: 'Create',
    closingBoxFunction: controlBoxFunc,
    submitFunc: submitFunction,
    controlAPI: controlAPICall,
  }

  const renameFolderProps = {
    head: 'Rename',
    icon: renameFolder,
    label: 'Please enter the new name of the item.',
    submitBtnName: 'Rename',
    closingBoxFunction: controlBoxFunc,
    controlAPI: controlAPICall,
  }

  const createAlbumProps = {
    head: 'Create New Album',
    icon: createNewAlbum,
    label: 'Please enter your new album name .',
    submitBtnName: 'Create',
    closingBoxFunction: controlBoxFunc,
    submitFunc: submitFunction,
    controlAPI: controlAPICall,
  }

  const renameAlbumProps = {
    head: 'Rename',
    icon: renameFolder,
    label: 'Please enter the new name of the item.',
    submitBtnName: 'Rename',
    closingBoxFunction: controlBoxFunc,
    controlAPI: controlAPICall,
    submitFunc: api.addAlbum,
  }

  const shareDrive = async (e, data) => {
    e.preventDefault()
    const body = {
      driveId: driveId,
      userIds: [...data],
    }
    if (withWhomToDo === 'Folder') {
      await api.shareFolder(body, controlAPICall)
      setSharedBox(false)
    } else {
      await api.shareAlbum(body, controlAPICall)
      setSharedBox(false)
    }
  }

  const removeDrive = async (e, data) => {
    e.preventDefault()
    const body = {
      driveId: driveId,
      userIds: [...data],
    }
    if (withWhomToDo === 'Folder') {
      await api.removeFolderAccess(body, controlAPICall)
      setSharedBox(false)
    } else {
      await api.removeAlbumAccess(body, controlAPICall)
      setSharedBox(false)
    }
  }

  return (
    <>
      <Router>
        <Containers.Container6WithFooter2>
          <div className="drive-frame-upper">
            <SearchHeader switchFiles={switchFiles} driveFiles={driveFiles} />
            <div className="drive-frame">
              <div className="left-frame">
                <Sidebar />
              </div>
              <div className="right-frame">
                <MyDriveRoutes
                  controlBoxFunc={controlBoxFunc}
                  effectControl={cntrlAPICall}
                  fetchStatus={driveFiles}
                  controlSharedBox={controlSharedBox}
                />
              </div>
            </div>
          </div>
        </Containers.Container6WithFooter2>
        {showBox ? <CreateAndRenameBox {...propsToPass} /> : null}
        {showShared ? (
          <SharedBox
            controlSharedBox={controlSharedBox}
            shareWith={shareWith}
            shareDrive={shareDrive}
            removeDrive={removeDrive}
          />
        ) : null}
      </Router>
    </>
  )
}

export default MyDriveComponent
