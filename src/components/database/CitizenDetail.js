import React, { Component } from 'react'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react';
import Pagination from '@material-ui/lab/Pagination';

class CitizenDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:[1,2,3,4,5]
        }
       }
    


    render(props) {
        
        return (
            <div className="ManageRequests">
                <div className="frame2">
                    <div className="FormOuterFrame" style={{ paddingTop : '20px' }}>
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{ width: "20%", paddingLeft: "2%", borderTop: 'none' }}><p className="HeadingTxt">Date Of Request</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "20%", borderTop: 'none', borderTop: 'none'  }}><p className="HeadingTxt">Type Of Request</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "20%", borderTop: 'none' }}><p className="HeadingTxt1">Request Status</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "20%", borderTop: 'none' }}><p className="HeadingTxt">Request ID</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width: "20%", borderTop: 'none' }}><p className="HeadingTxt1">Resolution Date</p></Table.HeaderCell>
                                    
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.item.map((addresse, index) => {
                                    /*const { referencefirstname, referencelastname, citizenMobileNumber, important, attachments, description, citizenName } = complaint.request
                                    const { firstName, lastName } = complaint.byUser
                                    const { assignedTo } = complaint
                                    const assigneeName = `${complaint.addressee.firstName} ${complaint.addressee.lastName}`*/

                                    return (

                                        <Table.Row
                                            onClick={() => this.historyFunction(addresse)}>

                                            <Table.Cell style={{ paddingLeft: "2%" }}>
                                                <p className="DataTxt">05/10/2019</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                            <p className="DataTxt">Complaint</p>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className={complaint.status === 'PENDING' ? "StatusDesc statusPending"
                                                    : complaint.status === "ASSIGNED" ? "StatusDesc statusAssigned"
                                                        : complaint.status === "SOLVED" ? "StatusDesc statusSolved"
                                                            : "StatusDesc statusUnsuccessful"}>
                                                    <p className="StatusTxt whiteTxt">Unsuccessful</p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">1234</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="DataTxt">7 Days</p>
                                            </Table.Cell>
                                           
                                            

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
export default CitizenDetail
