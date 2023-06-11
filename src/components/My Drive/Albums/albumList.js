import React, { useState, useEffect, useRef } from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { pull, includes } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'

import UploadHeader from '../headers/uploadHeader'

import api from '../../../utils/api'

import { downloadGrey, checkedGrey, trashFolder } from '../../../utils/svg'

import { ContextMenuTrigger } from 'react-contextmenu'

import AlbumSkeleton from '../../Skeletons/Drive Skeletons/AlbumSkeleton'

import AlbumContextMenu from '../ContextMenu'

const AlbumsList = (props) => {
  const { prevLink } = { ...props }
  const match = useRouteMatch()
  const location = useLocation()
  const { albumName } = location.state
  const { id } = { ...match.params }
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const [apiCalled, setApiCall] = useState(true)
  const [urls, setUrls] = useState([])
  const [showSkeleton, setSkeleton] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [more, setMore] = useState(true)
  const parentRef = useRef(null)
  let dateRef = ''
  const apiBody = {
    uid: id,
    offset: offset.toString(),
    limit: '18',
  }
  const files = new FormData()

  useEffect(() => {
    parentRef.current = document.getElementById('parent-div')
  })

  useEffect(async () => {
    setSkeleton(true)
    try {
      const response = await api.getAlbumData(apiBody)
      let temp = [...data]

      setTotalCount(response.count)
      setData([...response.rows, ...temp])
      setSkeleton(false)
      if (data.length === totalCount) {
        setMore(false)
      }
    } catch {
      toast.error('Unable to fetch albums.')
    }
  }, [offset, apiCalled])

  const handleChange = () => {
    //setOffset(offset + 18)
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
      if (response.length === 1) {
        if (response) {
          const body = {
            uid: id,
            url: response[0],
            mimeType: 'IMAGE',
            type: 'IMAGE',
            meta: {
              comment: '',
              tag: '',
            },
          }

          const res = await api.addImage(body)
          if (res) {
            setApiCall(!apiCalled)
          }
        }
      } else {
        const body = {
          albumId: id,
          urls: [...response],
          mimeType: 'IMAGE',
          type: 'IMAGE',
          albumName: location?.state?.albumName || '',
        }
        const res = await api.addMultipleFilesToSingleAlbum(body)
        if (res) {
          setApiCall(!apiCalled)
        }
      }
    } else {
      toast.error('Only 5 files allowed at a time')
      event.target.value = []
      return false
    }
    return null
  }

  const addUrls = (url) => {
    const temp = [...urls]
    temp.push(url)
    setUrls([...temp])
  }

  const removeUrls = (url) => {
    const temp = [...urls]
    pull(temp, url)
    setUrls([...temp])
  }

  const selectAll = () => {
    const temp = [...urls]
    for (let i = 0; i < data.length; i += 1) {
      const { url } = { ...data[i] }

      if (!includes(temp, `${api.BASE_URL_DRIVE}${url}`)) {
        temp.push(`${api.BASE_URL_DRIVE}${url}`)
      }
    }
    setUrls([...temp])
  }

  const deSelectAll = () => {
    const temp = [...urls]

    for (let i = 0; i < data.length; i += 1) {
      const { url } = { ...data[i] }

      if (includes(temp, `${api.BASE_URL_DRIVE}${url}`)) {
        pull(temp, `${api.BASE_URL_DRIVE}${url}`)
      }
    }
    setUrls([...temp])
  }

  return (
    <div className="frame-drive no-padding">
      <UploadHeader
        head="Photos"
        btnText="Upload Photo"
        fileName={albumName}
        accept="image/png, image/jpeg. image/jpg"
        uploadFunction={UploadFile}
        prevLink={prevLink}
      />
      <div className="album-frame-body" id="parent-div" ref={parentRef}>
        {urls.length !== 0 ? (
          <div className="helper-icons" style={{ width: '20%' }}>
            <div
              onClick={() => {
                let bool = true
                for (let i = 0; i < data.length; i += 1) {
                  const refUrl = `${api.BASE_URL_DRIVE}${data[i].url}`

                  if (includes(urls, refUrl)) {
                    bool = false
                  } else {
                    bool = true
                    break
                  }
                }

                if (bool) {
                  selectAll()
                } else {
                  deSelectAll()
                }
              }}
              aria-hidden="true"
              className="icon"
            >
              {checkedGrey}
            </div>
            <div
              //onClick={() => CONST.downloadAsZip(urls, 'photos')}
              aria-hidden="true"
              className="icon"
            >
              {downloadGrey}
            </div>
            <div
              onClick={() => console.log('hii')}
              aria-hidden="true"
              className="icon"
            >
              {trashFolder}
            </div>
          </div>
        ) : null}
        {showSkeleton ? (
          <AlbumSkeleton />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              setOffset(offset + 18)
            }}
            hasMore={more}
            loader={<h4>Loading...</h4>}
            getScrollParent={() => parentRef}
          >
            {data &&
              data.map((pic, index) => {
                const { url } = { ...pic }
                const refUrl = `${api.BASE_URL_DRIVE}${url}`
                const date = new Date(pic.createdAt)
                date.setHours(0, 0, 0, 0)

                if (date === dateRef) {
                  debugger
                  return (
                    <React.Fragment key={index}>
                      <div className="album-photo">
                        <ContextMenuTrigger id={url}>
                          <img src={refUrl} alt="pic" />
                        </ContextMenuTrigger>
                      </div>
                      <AlbumContextMenu divId={url} />
                    </React.Fragment>
                  )
                } else {
                  dateRef = date
                  debugger
                  return (
                    <React.Fragment>
                      <p className="pic-date">
                        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                      </p>
                      <div className="album-photo">
                        <ContextMenuTrigger id={url}>
                          <img src={refUrl} alt="pic" />
                        </ContextMenuTrigger>
                      </div>
                      <AlbumContextMenu divId={url} />
                    </React.Fragment>
                  )
                }
              })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

// {
//   ;<label htmlFor='photo'>
//     <img src={refUrl} alt='pic' />
//     <input
//       type='checkbox'
//       checked={includes(urls, refUrl)}
//       onChange={() => {
//         if (includes(urls, refUrl)) {
//           removeUrls(refUrl)
//         } else {
//           addUrls(refUrl)
//         }
//       }}
//     />
//   </label>
// }

export default AlbumsList
