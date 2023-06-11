import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import Skeleton from '@mui/material/Skeleton'

const FileSkeleton = () => {
  const makeSleteon = () => {
    const temp = []
    for (let i = 0; i < 10; i += 1) {
      temp.push(
        <TableRow className="folder-table-row" key={i}>
          <TableCell className="folder-table-cell">
            <div className="folder-name">
              <Skeleton animation="wave" width="100%" height="15px" />
            </div>
          </TableCell>
          <TableCell className="folder-table-cell">
            <Skeleton animation="wave" width="100%" height="15px" />
          </TableCell>
          <TableCell className="folder-table-cell">
            <div className="folder-info">
              <Skeleton animation="wave" width="100%" height="15px" />
            </div>
          </TableCell>
        </TableRow>
      )
    }
    return temp
  }

  return makeSleteon()
}

export default FileSkeleton
