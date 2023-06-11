import React, { Component, Fragment } from 'react'

import { Row, Col } from 'react-bootstrap'

import Back from '../../../utils/images/back.svg'
import warningLogo from '../../../utils/images/warningLogo.png'

import TablePagination from '@material-ui/core/TablePagination'

import trash from '../../../utils/images/trash.svg'

export default class RevenueVillages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 25,
    }
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage })
  }

  setRowsPerPage = (event) => {
    let temp = this.state.rowsPerPage

    this.setState({ rowsPerPage: +event.target.value, page: 0 })
  }

  updateConstituency = (constituencyType, data) => {
    this.props.history.push({
      pathname: '/add-constituency',
      state: {
        constituencyType: constituencyType,
        data: data,
        updateConstData: true,
      },
    })
  }

  render() {
    const RevenueVillageData = JSON.parse(
      localStorage.getItem('Revenue Villages')
    )

    return (
      <Fragment>
        <div className="FormOuterFrame">
          <div className="requestRow">
            <Row>
              <Col md={3}>
                <p className="HeadingTxt">Name</p>
              </Col>
              <Col md={2}>
                <p className="HeadingTxt">Type</p>
              </Col>
              <Col md={2}>
                <p className="HeadingTxt">Total Population</p>
              </Col>
              <Col md={3}>
                <p className="HeadingTxt">Gram Panchayat</p>
              </Col>
              <Col md={1}></Col>
              <Col md={1}></Col>
            </Row>
          </div>
          {RevenueVillageData?.length !== 0 ? (
            RevenueVillageData.rows
              .slice(
                this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
              )
              .map((data) => {
                return (
                  <div>
                    <div className="requestRow">
                      <Row>
                        {data.meta.constituencyData === undefined ? (
                          <Fragment>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">{data.meta.name}</p>
                            </Col>
                            <Col md={2} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">{data.meta.type}</p>
                            </Col>
                            <Col md={2} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.totalPopulation}
                              </p>
                            </Col>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.gramPanchayat}
                              </p>
                            </Col>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.constituencyData.name}
                              </p>
                            </Col>
                            <Col md={2} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.constituencyData.type}
                              </p>
                            </Col>
                            <Col md={2} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.constituencyData.totalPopulation}
                              </p>
                            </Col>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                              <p className="DataTxt">
                                {data.meta.constituencyData.gramPanchayat}
                              </p>
                            </Col>
                          </Fragment>
                        )}
                        <Col md={1}>
                          <img
                            src={trash}
                            alt=""
                            className="Back"
                            onClick={() =>
                              this.props.deleteConstituency(data.id)
                            }
                            style={{ cursor: 'pointer' }}
                          ></img>
                        </Col>
                        <Col md={1}>
                          <img
                            src={Back}
                            alt=""
                            className="Back"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              this.updateConstituency(
                                this.props.constituencyType,
                                data
                              )
                            }
                          ></img>
                        </Col>
                      </Row>
                    </div>
                  </div>
                )
              })
          ) : (
            <div className="warningMsg">
              <div className="warningHead">
                <img className="warningLogo" src={warningLogo} alt=""></img>
                <p>Warning</p>
              </div>
              <p className="warningTxt">No data found</p>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={RevenueVillageData?.count || 0}
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
