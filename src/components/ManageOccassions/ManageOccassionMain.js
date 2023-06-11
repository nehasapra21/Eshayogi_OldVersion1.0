import React, { Component, Fragment } from "react";
import importLogo from "../../utils/images/ImportLogo.png";
import Header from "../header/Header";
import "../ManageConstituency/ManageConstituency.css";
import Birthday from "./Birthday";
import Condolence from "./Condolence";
import Footer from "../footer/Footer";
import CopyRightFooter from "../footer/CopyrightFooter";
import api from "../../utils/api";
import Search from "../../utils/images/search.svg";
import Plus from "../../utils/images/plus.svg";
import { Link } from "react-router-dom";
import Loader from "../hoc/Loader/Loader";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import DateIcon from "../../utils/images/dateIcon.png";
import { toast } from "react-toastify";

export default class ManageOccassionMain extends Component {
  constructor(props) {
    super(props);
    document.title = "Manage Occasion";
    if (this.props.location.state) {
      console.log("Working");
      this.state = {
        occassionType: this.props.location.state.occassionType,
        occassionData: "",
        mountComponent: false,
        isLoading: true,
        searchInput: "",
        file: {},
        data: [],
        date: "",
        showCalender: false,
        search: "",
        limit: "25",
        offset: "0",
      };

      console.log("Set Sates", this.state);
    } else {
      console.log("not working");
      this.state = {
        occassionType: "Birthday",
        occassionData: "",
        mountComponent: false,
        isLoading: true,
        searchInput: "",
        file: {},
        data: [],
        date: "",
        showCalender: false,
        search: "",
        limit: "25",
        offset: "0",
      };
    }
  }

  filteredData = {
    data: {
      rows: [],
    },
  };

  componentDidMount() {
    console.log("component did mount of manage occasion");
    this.fetchOccasions("Birthday");
  }

  setSearchOccasions = (event) => {
    let searchValue = event.target.value;
    this.setState({ search: searchValue, showCalender: false, date: "" }, () =>
      this.searchOccasions()
    );
  };

  searchOccasions = () => {
    api
      .manageOccassion({
        type: "Birthday",
        search: `${this.state.search}`,
        queryOn: "name, callingNumber, whatsappNumber",
        limit: this.state.limit,
        offset: this.state.offset,
      })
      .then((response) => {
        if (response.ok) {
          console.log("Succesfully fetch constituency", response);
          this.setState({ occassionData: response.data, isLoading: false });
          console.log("State data updated", this.state.occassionData);
        } else {
          console.log("Response is not ok", response);
        }
      });
  };

  fetchOccasions = (occasion) => {
    this.setState({ isLoading: true });
    console.log("Occasion args", occasion);
    api
      .manageOccassion({
        type: occasion,
        search: `${this.state.search}`,
        queryOn: "",
        limit: this.state.limit,
        offset: this.state.offset,
      })
      .then((response) => {
        if (response.ok) {
          console.log("Succesfully fetch constituency", response);
          this.setState({ occassionData: response.data, isLoading: false });
          console.log("State data updated", this.state.occassionData);
        } else {
          console.log("Response is not ok", response);
        }
      });
  };

  resetHandler = () => {
    this.setState({
      search: "",
      date: "",
    });
    this.fetchOccasions("Birthday");
  };

  fetchOccasionsWithDate = (occasion) => {
    this.setState({ isLoading: true, search: "" });
    let date = new Date(this.state.date);

    api
      .manageOccassion({
        type: "ALL",
        limit: this.state.limit,
        offset: this.state.offset,
        search: "",
        queryOn: "",
        dd: date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`,
        mm:
          date.getMonth() + 1 > 9
            ? `${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}`,
      })
      .then((response) => {
        if (response.ok) {
          console.log("Succesfully fetch constituency", response);
          this.setState({ occassionData: response.data, isLoading: false });
          console.log("State data updated", this.state.occassionData);
        } else {
          console.log("Response is not ok", response);
        }
      });
  };

  captureSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
    this.filterDataAccToSearch(event.target.value);
  };

  filterDataAccToSearch = (inputValue) => {
    console.log("filter function executes");
    console.log("filtered data", this.state.occassionData);

    this.filteredData.data.rows = this.state.occassionData.data.rows.filter(
      (data) => {
        console.log("METADATA", data.meta);
        if (data.meta.callingNumber) {
          return (
            data.meta.name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
              -1 ||
            data.meta.callingNumber.toString().includes(inputValue.toString())
          );
        } else {
          return (
            data.meta.name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
            -1
          );
        }
      }
    );
  };

  changeLimit = (value) => {
    this.setState(
      {
        offset: "0",
        limit: `${value}`,
      },
      () => {
        if (this.state.date) {
          this.fetchOccasionsWithDate("Birthday");
        } else if (this.state.search) {
          this.searchOccasions();
        } else {
          this.fetchOccasions("Birthday");
        }
      }
    );
  };

  changeOffset = (value) => {
    console.log("offset value", value, this.state.offset, this.state.limit);
    const newOffset = +value * +this.state.limit;
    this.setState({ offset: `${newOffset}` }, () => {
      if (this.state.date) {
        this.fetchOccasionsWithDate("Birthday");
      } else if (this.state.search) {
        this.searchOccasions();
      } else {
        this.fetchOccasions("Birthday");
      }
    });
  };

  handleDeleteData = (data) => {
    api
      .deleteOccasion({
        id: data.id,
      })
      .then((response) => {
        if (response.ok) {
          console.log("Successfully deleted Occasion", response);
          toast.success("Successfully deleted Occasion", {
            autoClose: 1250,
            closeButton: false,
          });
          this.setState({ isLoading: true }, () =>
            this.fetchOccasions("Birthday")
          );
        } else {
          console.log("Response is not ok", response);
        }
      });
  };

  switchStatement = (occassion) => {
    console.log("Switch Function Called");
    switch (occassion) {
      case "Birthday":
        return (
          <Birthday
            occassionType={this.state.occassionType}
            history={this.props.history}
            data={
              this.state.searchInput === ""
                ? this.state.occassionData
                : this.filteredData
            }
            limit={this.state.limit}
            offset={this.state.offset}
            changeLimit={this.changeLimit}
            changeOffset={this.changeOffset}
            onDeleteData={this.handleDeleteData}
          />
        );

      case "Condolence":
        return (
          <Condolence
            occassionType={this.state.occassionType}
            history={this.props.history}
            data={
              this.state.searchInput === ""
                ? this.state.occassionData
                : this.filteredData
            }
          />
        );

      default:
        return "hello this is default";
    }
  };

  render() {
    console.log("Manage constituency states", this.state.date);
    return (
      <div className="BackgroundHomeframe">
        <Header isLoading={this.state.isLoading} />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="ConstituencyHead" style={{ marginLeft: "33%" }}>
                Occasions Database
              </p>
              {/*<a href='/' className='import' style={{ left : '30%' }}>
                  <p>Export</p>
                  <img src={importLogo} alt=''></img>
                  </a>*/}
              <Link style={{ marginLeft: "21%" }} to={"/occasion/birthday"}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p className="UpperTabTxt" style={{ marginRight: "10px" }}>
                    Add
                  </p>
                  <img src={Plus} alt="" />
                </div>
              </Link>
            </div>

            {this.state.isLoading ? null : (
              <Fragment>
                <div className="constituencyTabs">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      onClick={() =>
                        this.setState({
                          showCalender: !this.state.showCalender,
                        })
                      }
                      style={{ borderRight: "1px solid #E3E3E8" }}
                    >
                      <img className="calender" src={DateIcon} alt=""></img>
                    </div>
                    <div className="SearchDivLayout">
                      <input
                        type="text"
                        placeholder="Search Requests (Name,Calling Number, Whatsapp Number)"
                        className="SearchInput"
                        value={this.state.search}
                        onChange={(e) => {
                          this.setSearchOccasions(e);
                        }}
                      />
                      <img src={Search} alt="" className="SearchIcon" />
                    </div>
                    <button
                      type="button"
                      className="resetBtn"
                      onClick={() => this.resetHandler()}
                    >
                      Reset
                    </button>
                  </div>
                  {this.state.showCalender ? (
                    <div
                      style={{
                        position: "absolute",
                        left: "200px",
                        zIndex: "1",
                      }}
                    >
                      <Calendar
                        onChange={(date) => {
                          console.log("calender date", date);
                          this.setState(
                            { date: date, showCalender: false },
                            () => this.fetchOccasionsWithDate("Birthday")
                          );
                        }}
                        date={this.state.date}
                        color="#2f2d64"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="FormFrame">
                  {this.state.isLoading
                    ? null
                    : this.state.occassionData === "" ||
                      this.state.occassionData === undefined
                    ? null
                    : this.switchStatement(this.state.occassionType)}
                </div>
              </Fragment>
            )}
          </div>
          <div className="DashboardFooter">
            <Footer />
            <CopyRightFooter />
          </div>
        </div>
        {this.state.isLoading ? <Loader /> : null}
        <div className="emptyDiv"></div>
      </div>
    );
  }
}
