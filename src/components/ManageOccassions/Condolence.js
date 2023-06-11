import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import Warning from '../hoc/Warning/Warning'
import TablePagination from '@material-ui/core/TablePagination'

export default class Condolence extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      page : 0,
      rowsPerPage : 5
    }
  }

  setPage = (event, newPage) => {
    this.setState({ page : newPage })
  }

  setRowsPerPage = (event) => {
    let temp = this.state.rowsPerPage

    this.setState({ rowsPerPage : +event.target.value, page : 0 })
  }

  updateOccassion = (data) => {
      this.props.history.push({
        pathname: '/confirm/condolence',
        state: {
          condolenceData : data
        }
    })
  }

  render() {

    console.log('condolence Props', this.props.data)

    const condolenceData = this.props.data
    console.log('Condolence data', condolenceData)

    if( condolenceData.error) {
      return <Warning warningMsg='No Data Found' />
    } else {
      return (
        <Fragment>
          <div className='FormOuterFrame'>
            <div className='requestRow' style={{ borderTop : 'none' }}>
              <Row>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>ID</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Name Of Dead</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Date of death</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Name of relative</p>
                </Col>
                <Col md={2} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Address</p>
                </Col>
                <Col md={1} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Reference</p>
                </Col>
                <Col md={1} style={{ alignSelf : 'center' }}>
                  <p className='HeadingTxt'>Contact</p>
                </Col>
              </Row>
            </div>
            {
                condolenceData.data.rows.map( data => {
                  console.log('Data', data)
                  console.log('constituency Data', data.meta.occassionData)
                  return (
                    <div>
                      <div className='requestRow' onClick={ () => this.updateOccassion(data) }>
                        { console.log('inside rendering', data) }
                        <Row>
                          <Col md={2} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.id }</p>
                          </Col>
                          <Col md={2} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.nameOfDead }</p>
                          </Col>
                          <Col md={2} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.dateOfDeath.substring( 0, 10 ).split('').reverse().join('') }</p>
                          </Col>
                          <Col md={2} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.nameOfRelative }</p>
                          </Col>
                          <Col md={2} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.address }</p>
                          </Col>
                          <Col md={1} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.referenceName }</p>
                          </Col>
                          <Col md={1} style={{ alignSelf : 'center' }}>
                            <p className='DataTxt'>{ data.meta.whatsappNumber }</p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )
                } )
            }
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={condolenceData.data.rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.setPage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </div>
        </Fragment>
      )
    }
  }
}
