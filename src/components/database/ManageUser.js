import React, { Component } from 'react'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react'
import Pagination from '@material-ui/lab/Pagination'
import eye from '../../utils/images/eye.png'
import trash from '../../utils/images/trash.svg'
import api from '../../utils/api'
import { toast } from 'react-toastify'
import Warning from '../hoc/Warning/Warning'
class ManageUser extends Component {
  constructor(props) {
    document.title = 'Manager User'
    super(props)
    this.state = {
      item: [1, 2, 3, 4, 5],
      show: false,
    }
    console.log(this.props, 'HEXXX')
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/users/add-new',
      state: { user: request },
    })
  }
  handleEyeClick = () => {
    if (this.state.passwordType === 'password') {
      this.setState({ passwordType: 'text' })
    } else {
      this.setState({ passwordType: 'password' })
    }
  }
  deleteAccount = (id) => {
    console.log('clicked')
    api
      .deleteUser({
        id: `${id}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            setTimeout(() => window.location.reload(true), 1000)
            toast.success('User has been deleted successfully', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.error('User deletion failed!', {
              autoClose: 1250,
              closeButton: false,
            })
            console.log('something error occured ', response)
          }
        },
        (err) => {
          toast.error('Something Went Wrong. PLease CLick to Reload!', {
            autoClose: 1250,
            closeButton: false,
            onClick: () => window.location.reload(true),
          })
          console.log('err is', err)
        }
      )
  }

  render(props) {
    return (
      <div className="ManageRequests">
        <div className="frame2">
          <div className="FormOuterFrame" style={{ paddingTop: '20px' }}>
            {this.props.users === '' ? (
              <Warning warningMsg="No Data Found. Please Add Some Data!!" />
            ) : (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      style={{ width: '18%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt">Name</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '18%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt">Mobile Number</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '15%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt1">Role</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '21%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt1">Email ID</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '15%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt">Office Location</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '18%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt1">Start Date</p>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.users.map((user, index) => {
                    let date = new Date(user.createdAt)
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <p className="DataTxt">
                            {user.firstName} {user.lastName}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">{user.mobileNumber}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">{user.role}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">{user.emailId}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">
                            {user.location ? user.location.name : ''}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <p className="DataTxt">
                            {date.getDate()}-{date.getMonth() + 1}-
                            {date.getFullYear()}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <img
                            src={trash}
                            alt=""
                            className="Back"
                            onClick={() => this.deleteAccount(user.id)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default ManageUser
