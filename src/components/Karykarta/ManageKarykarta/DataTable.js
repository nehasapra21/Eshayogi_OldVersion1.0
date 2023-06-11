import React, { Component, Fragment, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Back from '../../../utils/images/back.svg'
import warningLogo from '../../../utils/images/warningLogo.png'
import TablePagination from '@material-ui/core/TablePagination'

const DataTable = (props) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateOccassion = (data) => {
      props.history.push({
        pathname: '/add-karyakarta',
        state: {
          karyakartaData : data
        }
    })
  }

  console.log('Karyakarta table props', props)

  const karyakartaData = props.karyakartaData

  console.log('Kaykarta data', karyakartaData)

  return (
    <div className='FormOuterFrame'>
        {
          karyakartaData.error ? 
          <div className='warningMsg'>
            <div className='warningHead'>
              <img className='warningLogo' src={ warningLogo } alt=''></img>
              <p>Warning</p>
            </div>
            <p className='warningTxt'>No Data Found</p>
          </div> :
          <Fragment>
            <div className='requestRow'  style={{ borderTop : 'none' }}>
              <Row>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className = 'HeadingTxt'>Name</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className = 'HeadingTxt'>Mobile No.</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className = 'HeadingTxt'>Type</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className = 'HeadingTxt'>Area</p>
                </Col>
                <Col md={3} style={{ alignSelf : 'center' }}>
                  <p className = 'HeadingTxt'>Designation</p>
                </Col>
              </Row>
            </div>
            {
              karyakartaData.data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( data => {
                return (
                  <div className='requestRow'>
                    <Row onClick={ () => updateOccassion(data) }>
                      <Col md={2} style={{ alignSelf : 'center' }}>
                        <p className='DataTxt'>{ data.name }</p>
                      </Col>
                      <Col md={2} style={{ alignSelf : 'center' }}>
                        <p className='DataTxt'>{ data.meta.callingNumber }</p>
                      </Col>
                      <Col md={2} style={{ alignSelf : 'center' }}>
                        <p className='DataTxt'>{ data.area }</p>
                      </Col>
                      <Col md={2} style={{ alignSelf : 'center' }}>
                        <p className='DataTxt'>{ data.district }</p>
                      </Col>
                      <Col md={3} style={{ alignSelf : 'center' }}>
                        <p className='DataTxt'>{ data.designation }</p>
                      </Col>
                    </Row>
                  </div>
                )
              } )
            }
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={karyakartaData.data.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Fragment>
        }
    </div>  
  )
}

export default DataTable
