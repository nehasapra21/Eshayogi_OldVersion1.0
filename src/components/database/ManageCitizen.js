import React, { Component } from 'react'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react';
import Pagination from '@material-ui/lab/Pagination';

class ManageCitizen extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:[1,2,3,4,5]
        }
        console.log(this.props.complaints,"HEXXX")


    }
    /*historyFunction(request) {


        this.props.history.push({
            pathname: '',
            state: { complaint: citizen }
        })
    }*/


    render(props) {
        
        return (
            <div className="ManageRequests">
                <div className="frame2">
                    <div className="FormOuterFrame" style={{ paddingTop : '20px' }}>
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{width:"19%",  paddingLeft: "2%", borderTop: 'none' }}><p className="HeadingTxt">Name</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{width:"19%",  borderTop: 'none', borderTop: 'none'  }}><p className="HeadingTxt">Number of Requests</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{width:"21%",  borderTop: 'none', borderTop: 'none'  }}><p className="HeadingTxt">Address</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{width:"19%",  borderTop: 'none', borderTop: 'none'  }}><p className="HeadingTxt">Phone No</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{width:"20%",  borderTop: 'none', borderTop: 'none'  }}><p className="HeadingTxt">Registration Date</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{width:"3%", borderTop : 'none' }} />
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.item.map((citizen, index) => {
                                    /*const { referencefirstname, referencelastname, citizenMobileNumber, important, attachments, description, citizenName } = complaint.request
                                    const { firstName, lastName } = complaint.byUser
                                    const { assignedTo } = complaint
                                    const assigneeName = `${complaint.addressee.firstName} ${complaint.addressee.lastName}`*/

                                    return (

                                        <Table.Row>
                                            

                                            <Table.Cell style={{ paddingLeft: "2%" }}>
                                                <p className="DataTxt">Pallav Aggarwal</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">12</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">#6168 sirki bazar</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">9915300000</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">05/10/2019</p>
                                            </Table.Cell>
                                            { /* <Table.Cell>
                                                <img src={Back} alt="" className="Back" />
                                            </Table.Cell> */ }

                                        </Table.Row>
                                    )
                                })}


                            </Table.Body>
                        </Table>

                        <Pagination 
                            count={this.props.count/5 > parseInt(this.props.count/5)? parseInt(this.props.count/5)+1 : parseInt(this.props.count/5)} 
                            onChange={(page) => {this.props.handlePagination(page)}}
                        />




                    </div>
                </div>
            </div>
        )
    }
}
export default ManageCitizen
