import React, { Component } from 'react'
import Back from '../../utils/images/back.svg'
import { Table, Label } from 'semantic-ui-react';
import Pagination from '@material-ui/lab/Pagination';

class ManageDelegate extends Component {
    constructor(props) {
        super(props);
        this.state={
            item:[1,2,3,4,5]
        }
        console.log(this.props.delegates,"HEXXX")


    }
    historyFunction(request) {


        this.props.history.push({
            pathname: '/delegate/add-new',
            state: { delegate: request }
        })
    }


    render(props) {
        
        return (
            <div className="ManageRequests">
                <div className="frame2">
                    <div className="FormOuterFrame" style={{ paddingTop : '20px' }}>
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{  width:"24%",paddingLeft: "2%", borderTop: 'none' }}><p className="HeadingTxt">Name</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{  width:"24%",borderTop: 'none' }}><p className="HeadingTxt1">Status</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{  width:"24%",borderTop: 'none' }}><p className="HeadingTxt">Mobile Number</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{  width:"24%",borderTop: 'none' }}><p className="HeadingTxt1">Email Id</p></Table.HeaderCell>
                                    <Table.HeaderCell style={{ width:"4%",borderTop : 'none' }} />
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.item.map((delegate, index) => {
                                    /*const { referencefirstname, referencelastname, citizenMobileNumber, important, attachments, description, citizenName } = complaint.request
                                    const { firstName, lastName } = complaint.byUser
                                    const { assignedTo } = complaint
                                    const assigneeName = `${complaint.addressee.firstName} ${complaint.addressee.lastName}`*/

                                    return (

                                        <Table.Row
                                            onClick={() => this.historyFunction(delegate)}>

                                            <Table.Cell style={{ paddingLeft: "2%" }}>
                                                <p className="DataTxt">Pallav Agarwal</p>
                                            </Table.Cell>
                                            
                                            <Table.Cell>
                                                <div className={"StatusDesc statusActive"}>
                                                    <p className="StatusTxt whiteTxt">Active</p>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                            <p className="DataTxt">9915300000</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                            <p className="DataTxt">Pallav@theideazfactory.com</p>
                                            </Table.Cell>
                                            { /*
                                            <Table.Cell>
                                                <img src={Back} alt="" className="Back" />
                                            </Table.Cell>
                                            */ }

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
export default ManageDelegate
