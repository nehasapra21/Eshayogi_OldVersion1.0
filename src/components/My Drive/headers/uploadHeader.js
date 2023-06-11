import React from 'react'
import { Link } from 'react-router-dom'
import { backArrow, directionArrow } from '../../../utils/svg/index'

const UploadHeader = (props) => (
  <div className='mydrive-upload-header'>
    <div className='info-head'>
      <Link to={props.prevLink}>
        <div className='backBtn'>{backArrow}</div>
      </Link>
      <h4>
        {props.head}
        <span>{directionArrow}</span>
      </h4>
      <h3 className='name-header'>{props.fileName}</h3>
    </div>
    <div className='btn uploadBtn'>
      <label htmlFor='file'>
        {props.btnText}
        <input
          type='file'
          multiple
          accept={props.accept}
          onChange={(e) => props.uploadFunction(e)}
        />
      </label>
    </div>
  </div>
)

export default UploadHeader
