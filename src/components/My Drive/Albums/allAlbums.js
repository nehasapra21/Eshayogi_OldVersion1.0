import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { includes, pull } from 'lodash'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

import CreateHeader from '../headers/createHeader'

import {
  album,
  uploadInFolder,
  edit,
  trashFolder,
  navigateToFolder,
  checkedGrey,
} from '../../../utils/svg'
import api from '../../../utils/api'

import AlbumSkeleton from '../../Skeletons/Drive Skeletons/AlbumSkeleton'

import AlbumMenu from '../AlbumMenu'

const AllAlbums = (props) => {
  const { effectControl, fetchStatus, controlSharedBox } = { ...props }
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [albumID, setAlbumID] = useState([])
  const [showSkeleton, setSkeleton] = useState(true)

  useEffect(async () => {
    try {
      const response = await api.getAlbum(fetchStatus)

      if (page === 1) {
        setTotalCount(response.length)
      }

      setData([...response])
      setSkeleton(false)
    } catch {
      toast.error('Unable to fetch albums.')
    }
  }, [effectControl, page, fetchStatus])

  const handleChange = () => {
    setPage(page + 1)
  }

  const addUrls = (url) => {
    const temp = [...albumID]
    temp.push(url)
    setAlbumID([...temp])
  }

  const removeUrls = (url) => {
    const temp = [...albumID]
    pull(temp, url)
    setAlbumID([...temp])
  }

  const selectAll = () => {
    const temp = [...albumID]
    for (let i = 0; i < data.length; i += 1) {
      const { driveId } = { ...data[i].detail }
      if (!includes(temp, driveId)) {
        temp.push(driveId)
      }
    }
    setAlbumID([...temp])
  }

  const deSelectAll = () => {
    const temp = [...albumID]
    for (let i = 0; i < data.length; i += 1) {
      const { driveId } = { ...data[i].detail }
      if (includes(temp, driveId)) {
        pull(temp, driveId)
      }
    }
    setAlbumID([...temp])
  }

  return (
    <div className="frame-drive no-padding">
      <CreateHeader
        head="Photos"
        btnText="Create Album"
        onClickAction={() => {
          props.controlBoxFunc('Album', 'Create')
        }}
      />
      <div className="album-frame-body">
        {showSkeleton ? (
          <AlbumSkeleton />
        ) : data && data.length !== 0 ? (
          <InfiniteScroll
            dataLength={totalCount}
            next={() => {
              handleChange()
            }}
            hasMore={data.length === totalCount ? false : true}
            loader={<h4>Loading...</h4>}
          >
            {data.map((albumFile, index) => {
              const { detail, sharedWith } = { ...albumFile }
              const { name, meta, driveId } = { ...detail }

              return (
                <div className="album" key={index}>
                  <Link
                    to={{
                      pathname: `/my-drive/albums/${driveId}`,
                      state: {
                        albumName: name,
                      },
                    }}
                    title={name}
                  >
                    <div
                      className="back-div"
                      style={{
                        backgroundImage: `url(${api.BASE_URL_DRIVE}${meta})`,
                      }}
                    />

                    <div className="album-name">
                      <div className="icon">{album}</div>
                      <h4>{name.substr(0, 18)}...</h4>
                    </div>
                  </Link>
                  <AlbumMenu
                    controlSharedBox={controlSharedBox}
                    albumId={driveId}
                    shareWith={sharedWith}
                    type="Album"
                  />
                </div>
              )
            })}
          </InfiniteScroll>
        ) : (
          <p className="no-data-text">No Data Found</p>
        )}
      </div>
    </div>
  )
}

export default AllAlbums

// {
//   albumID.length !== 0 ? (
//     <div className='helper-icons'>
//       <div
//         onClick={() => {
//           let bool = true
//           for (let i = 0; i < data.length; i += 1) {
//             if (includes(albumID, data[i].detail.driveId)) {
//               bool = false
//             } else {
//               bool = true
//             }
//           }

//           if (bool) {
//             selectAll()
//           } else {
//             deSelectAll()
//           }
//         }}
//         aria-hidden='true'
//         className='icon'
//       >
//         {checkedGrey}
//       </div>
//       <div
//         onClick={() => console.log('hii')}
//         aria-hidden='true'
//         className='icon'
//       >
//         {uploadInFolder}
//       </div>
//       <div
//         onClick={() => console.log('hii')}
//         aria-hidden='true'
//         className='icon'
//       >
//         {edit}
//       </div>
//       <div
//         onClick={() => console.log('hii')}
//         aria-hidden='true'
//         className='icon'
//       >
//         {trashFolder}
//       </div>
//       <div aria-hidden='true' className='icon' onClick={shareAlbum}>
//         {navigateToFolder}
//       </div>
//     </div>
//   ) : null
// }
