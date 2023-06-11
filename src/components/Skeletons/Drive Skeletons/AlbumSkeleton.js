import React from 'react'
import Skeleton from '@mui/material/Skeleton'

const AlbumSkeleton = () => {
  const createSkeleton = () => {
    let temp = []
    for (let i = 0; i < 12; i += 1) {
      temp.push(
        <>
          <Skeleton animation="wave" className="album-skeleton" />
        </>
      )
    }
    return temp
  }

  return <div className="frame-body">{createSkeleton()}</div>
}

export default AlbumSkeleton
