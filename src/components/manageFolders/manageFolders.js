import React, { Component, Fragment } from 'react'
import Header from '../header/Header'
import api from '../../utils/api'
import { toast } from 'react-toastify'
import Footer from '../footer/Footer'
import CopyRightFooter from '../footer/CopyrightFooter'
import { Table, Label } from 'semantic-ui-react'
import TablePagination from '@material-ui/core/TablePagination'
import Warning from '../hoc/Warning/Warning'
import Loader from '../hoc/Loader/Loader'
import Back from '../../utils/images/back.svg'
import DeleteIcon from '../../utils/images/trash.svg'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'

class ManageFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      showWarning: false,
      foldersData: [],
      page: 0,
      rowsPerPage: 25,
    }
  }

  componentDidMount = () => {
    this.fetchFolders()
  }

  fetchFolders = () => {
    api
      .getFolders({
        limit: '100',
        offset: '0',
      })
      .then((response) => {
        if (response.ok) {
          this.setState({
            isLoading: false,
          })
          if (response.data.error) {
            toast.error('No folders Found', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ showWarning: true })
          } else {
            toast.success('Folders Fetch Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({
              showWarning: false,
              foldersData: [...response.data.data.rows],
            })
          }
        }
      })
      .catch((err) => {
        toast.error('Something Wrong Happens. Please Refresh', {
          autoClose: 1250,
          closeButton: false,
        })
        this.setState({
          showWarning: true,
          isLoading: false,
        })
      })
  }

  onDeleteFolder = (folder) => {
    api
      .deleteFolder({
        id: folder.id,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('Folder Not Deleted', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ isLoading: false })
          } else {
            toast.success('Folder Deleted Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.setState({ isLoading: false }, this.fetchFolders())
          }
        }
      })
  }

  updateFolder = (folder) => {
    this.props.history.push({
      pathname: '/add-folder',
      state: {
        folderData: {
          ...folder,
        },
      },
    })
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 })
  }

  render() {
    return (
      <div className="BackgroundHomeFrame">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <img
                src={backIcon}
                alt=""
                style={{
                  width: '20px',
                  marginRight: '10px',
                }}
                onClick={() => this.props.history.push('/manage-request')}
              />
              <p className="TxtHeading">Manage Folders</p>
            </div>
            {this.state.showWarning ? (
              <Warning warningMsg="No Data Found" />
            ) : (
              <div className="FormFrame">
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        style={{
                          width: '27%',
                          paddingLeft: '2%',
                          borderTop: 'none',
                        }}
                      >
                        <p className="HeadingTxt">Folder Number</p>
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{
                          width: '18%',
                          borderTop: 'none',
                        }}
                      >
                        <p className="HeadingTxt">Folder Name</p>
                      </Table.HeaderCell>
                      <Table.HeaderCell style={{ borderTop: 'none' }} />
                      <Table.HeaderCell style={{ borderTop: 'none' }} />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.foldersData
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((folder) => {
                        return (
                          <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2%' }}>
                              <p className="DataTxt">{folder.number}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p className="DataTxt">{folder.name}</p>
                            </Table.Cell>
                            <Table.Cell
                              onClick={() =>
                                this.setState(
                                  { isLoading: true },
                                  this.onDeleteFolder(folder)
                                )
                              }
                            >
                              <img src={DeleteIcon} alt="" className="Back" />
                            </Table.Cell>

                            <Table.Cell
                              onClick={() => this.updateFolder(folder)}
                            >
                              <img src={Back} alt="" className="Back" />
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                  </Table.Body>
                </Table>
                <TablePagination
                  style={{
                    width: '500px',
                    position: 'relative',
                    left: '300px',
                  }}
                  rowsPerPageOptions={[25, 50, 100]}
                  component="div"
                  count={this.state.foldersData.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.setPage}
                  onChangeRowsPerPage={this.setRowsPerPage}
                />
              </div>
            )}

            <div className="DashboardFooter">
              <Footer />
              <CopyRightFooter />
            </div>
          </div>
        </div>
        {this.state.isLoading ? <Loader /> : null}
      </div>
    )
  }
}

export default ManageFolders
