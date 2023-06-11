import React, { Component, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Warning from "../hoc/Warning/Warning";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";
import Back from "../../utils/images/back.svg";
import DeleteIcon from "../../utils/images/trash.svg";
import { Table, Label } from "semantic-ui-react";
export default class Birthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: +props.offset / +props.limit,
      rowsPerPage: +props.limit,
    };
  }

  setPage = (event, newPage) => {
    this.setState({ page: newPage });
    this.props.changeOffset(newPage);
  };

  setRowsPerPage = (event) => {
    let temp = this.state.rowsPerPage;

    this.setState({ rowsPerPage: +event.target.value, page: 0 });
    this.props.changeLimit(+event.target.value);
  };

  updateOccassion = (data) => {
    this.props.history.push({
      pathname: "/confirm/birthday",
      state: {
        birthdayData: data,
      },
    });
  };

  historyFunction(request) {
    console.log();
    this.props.history.push({
      pathname: "/occasion/birthday",
      state: { occasion: request },
    });
  }

  render() {
    console.log(" Props", this.props);
    const birthdayData = this.props.data;
    console.log("Birthday Data", birthdayData);

    if (birthdayData.error) {
      return <Warning warningMsg="No Data Found" />;
    } else {
      return (
        <Fragment style={{ width: "1000px" }}>
          <div className="FormOuterFrame">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    style={{
                      width: "27%",
                      paddingLeft: "2%",
                      borderTop: "none",
                    }}
                  >
                    <p className="HeadingTxt">Name</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    style={{
                      width: "18%",
                      borderTop: "none",
                    }}
                  >
                    <p className="HeadingTxt">Constituency</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "13%", borderTop: "none" }}>
                    <div style={{ height: "100%" }}>
                      <p className="HeadingTxt">Birthday</p>
                    </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "14%", borderTop: "none" }}>
                    <p className="HeadingTxt">Anniversary</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "14%", borderTop: "none" }}>
                    <p className="HeadingTxt">Calling No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "18%", borderTop: "none" }}>
                    <p className="HeadingTxt">Whatsapp No</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ borderTop: "none" }} />
                  <Table.HeaderCell style={{ borderTop: "none" }} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {birthdayData.data.rows.map((data) => {
                  console.log("Data", data);
                  return (
                    <Table.Row>
                      <Table.Cell style={{ paddingLeft: "2%" }}>
                        <p className="DataTxt">{data.meta.name}</p>
                        <p className="DataTxt1">
                          {typeof data.meta.designation === "object"
                            ? data.meta.designation.name
                            : data.meta.designation}
                          ,{" "}
                          {typeof data.meta.house === "object"
                            ? data.meta.house.name
                            : data.meta.house}
                        </p>
                        <p className="DataTxt">{data.meta.party}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ alignSelf: "center", textAlign: "left" }}>
                          <p className="DataTxt">{data.meta.constituency}</p>
                          <p className="DataTxt">{data.meta.state}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {data.meta.dateOfBirthday
                            ? moment(data.meta.dateOfBirthday).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">
                          {data.meta.dateOfAnniversary
                            ? moment(data.meta.dateOfAnniversary).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">{data.meta.callingNumber1}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="DataTxt">{data.meta.whatsappNumber}</p>
                      </Table.Cell>

                      <Table.Cell onClick={() => this.props.onDeleteData(data)}>
                        <img src={DeleteIcon} alt="" className="Back" />
                      </Table.Cell>

                      <Table.Cell onClick={() => this.historyFunction(data)}>
                        <img src={Back} alt="" className="Back" />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <TablePagination
              style={{ width: "500px", position: "relative", left: "300px" }}
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={birthdayData.data.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.setPage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </div>
        </Fragment>
      );
    }
  }
}
