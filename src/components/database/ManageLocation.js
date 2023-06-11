import React, { Component } from 'react'
import Flag from '../../utils/images/flag.svg'
import Attachment from '../../utils/images/attachment.svg'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react'
import ComplaintForm from '../forms/complaint/Complaint'
import api from '../../utils/api'
import Pagination from '@material-ui/lab/Pagination'
import './ManageDatabase.css'
import trash from '../../utils/images/trash.svg'
import { toast } from 'react-toastify'
import Warning from '../hoc/Warning/Warning'

class ManageLocation extends Component {
  constructor(props) {
    super(props)

    console.log(this.props.locations, 'HEXXX')
  }
  historyFunction(request) {
    this.props.history.push({
      pathname: '/complaint/officelocation/add-new',
      state: { location: request },
    })
  }
  deleteLocation = (id) => {
    api
      .deleteLocation({
        id: `${id}`,
      })
      .then(
        (response) => {
          if (response.ok) {
            setTimeout(() => window.location.reload(true), 1000)
            toast.success('Location has been deleted successfully', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.error('Location deletion failed!', {
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
            {this.props.locations === '' ? (
              <Warning warningMsg="No Data Found. Please Add Some Data!!" />
            ) : (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      style={{
                        width: '32%',
                        paddingLeft: '2%',
                        borderTop: 'none',
                      }}
                    >
                      <p className="HeadingTxt">Location</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '32%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt">Address</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '32%', borderTop: 'none' }}
                    >
                      <p className="HeadingTxt1">Start Date</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      style={{ width: '3%', borderTop: 'none' }}
                    />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.locations.map((location, index) => {
                    const { startDate, name, address } = location
                    let date = new Date(startDate)
                    return (
                      <Table.Row>
                        <Table.Cell style={{ paddingLeft: '2%' }}>
                          <p className="DataTxt">{name}</p>
                        </Table.Cell>

                        <Table.Cell>
                          <p className="DataTxt">{address}</p>
                        </Table.Cell>

                        <Table.Cell>
                          <p className="DataTxt">
                            {date.getDate() +
                              '/' +
                              parseInt(date.getMonth() + 1) +
                              '/' +
                              date.getFullYear()}
                          </p>
                        </Table.Cell>

                        <Table.Cell>
                          <img
                            src={trash}
                            alt=""
                            className="Back"
                            onClick={() => this.deleteLocation(location.id)}
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
export default ManageLocation
