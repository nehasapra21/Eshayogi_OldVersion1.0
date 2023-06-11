import React, { Component, Fragment } from 'react'

import { Row, Col } from 'react-bootstrap'

import Back from '../../../utils/images/back.svg'
import trash from '../../../utils/images/trash.svg'
import warningLogo from '../../../utils/images/warningLogo.png'

import TablePagination from '@material-ui/core/TablePagination'

import api from '../../../utils/api'
import { toast } from 'react-toastify'

export default class Zila extends Component {
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

  deleteConstituency = async (id) => {
    await api
      .deleteConstituency({
        id: id,
      })
      .then(() => {
        toast.success('Zila Deleted Successfully.')
      })
      .catch(() => {
        toast.error('Unabe to delete constituency.')
      })
  }

  render() {
    let zilaData = JSON.parse(localStorage.getItem('Zila Level'))

    return (
      <Fragment>
        <div className="FormOuterFrame">
          <div className="requestRow" style={{ borderTop: 'none' }}>
            <Row>
              <Col md={5} style={{ alignSelf: 'center' }}>
                <p className="HeadingTxt">Zila</p>
              </Col>
              <Col md={5} style={{ alignSelf: 'center' }}>
                <p className="HeadingTxt">Constituency</p>
              </Col>
              <Col md={1}></Col>
              <Col md={1}></Col>
            </Row>
          </div>
          {this.props.isLoading ? null : zilaData?.length !== 0 ? (
            zilaData.rows
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
                        <Fragment>
                          <Col md={5} style={{ alignSelf: 'center' }}>
                            <p className="DataTxt">{data.meta.name}</p>
                          </Col>
                          <Col md={5} style={{ alignSelf: 'center' }}>
                            <p className="DataTxt">{data.meta.constituency}</p>
                          </Col>
                        </Fragment>
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
              <p className="warningTxt">No Data Found</p>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={zilaData?.count || 0}
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
