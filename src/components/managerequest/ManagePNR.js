import React, { Component } from 'react';
import Api from '../../utils/api';
import Flag from '../../utils/images/flag.svg';
import Attachment from '../../utils/images/attachment.svg';
import Back from '../../utils/images/back.svg';
import { Table, Label } from 'semantic-ui-react';
import TablePagination from '@material-ui/core/TablePagination';

class ManagePNR extends Component {
  constructor(props) {
    document.title = 'PNR Management Panel';
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 25,
    };
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage });
    this.props.changeOffset(newPage);
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
    this.props.changeLimit(+event.target.value);
  };

  historyFunction(request) {
    console.log();
    this.props.history.push({
      pathname: '/PNR',
      state: { PNR: request },
      search: '?show-PNR',
    });
  }

  render(props) {
    var array = this.props.PNR;
    console.log(array, 'hey');
    console.log(this.props.statusFilter);

    return (
      <div className='ManageRequests'>
        <div className='frame2'>
          <div className='FormOuterFrame'>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '12%', paddingLeft: '2%' }}>
                    <p className='HeadingTxt'>Reference No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>PNR Number</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>Train Number</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>Journey Date</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '8%' }}>
                    <p className='HeadingTxt'>From</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '8%' }}>
                    <p className='HeadingTxt1'>To</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '15%' }}>
                    <p className='HeadingTxt'>Recommended By</p>
                  </Table.HeaderCell>

                  <Table.HeaderCell style={{ width: '12%' }}>
                    <p className='HeadingTxt'>Contact</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '11%' }}>
                    <p className='HeadingTxtstatus'>Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.PNR.data.rows.map((PNR, index) => {
                  const {
                    pnr,
                    sectorFrom,
                    sectorTo,
                    dateOfJourney,
                    citizenMobileNumber,
                    category,
                    trainNumber,
                    recommendedName,
                  } = PNR.request;

                  let temp = new Date(dateOfJourney);
                  let journeyDate = `${temp.getDate()}/${temp.getMonth()}/${temp.getFullYear()}`;
                  console.log('journey date', journeyDate);
                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: '2%' }}>
                        <p className='DataTxt'>{PNR.ref}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt'>{pnr}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt'>{trainNumber}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{journeyDate}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <p className='DataTxt'>{sectorFrom}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className='DataTxt'>{sectorTo}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: 'center', textAlign: 'left' }}>
                          <p className='DataTxt1'>{recommendedName}</p>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <p className='DataTxt'>{citizenMobileNumber !== '' ? citizenMobileNumber : 'N/A' }</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div
                          className={
                            PNR.status === 'CONFIRMED'
                              ? 'StatusDesc statusRespondedTo'
                              : PNR.status === 'CLEARED'
                              ? 'StatusDesc statusCleared'
                              : 'StatusDesc statusRejected'
                          }
                        >
                          <p id='datatxt' className='StatusTxt whiteTxt'>
                            {PNR.status === 'NOTCONFIRMED'
                              ? 'Not Confirmed'
                              : PNR.status}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell onClick={() => this.historyFunction(PNR)}>
                        <img src={Back} alt='' className='Back' />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component='div'
            count={this.props.PNR.data.count}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.setPage}
            onChangeRowsPerPage={this.setRowsPerPage}
          />
        </div>
      </div>
    );
  }
}
export default ManagePNR;
