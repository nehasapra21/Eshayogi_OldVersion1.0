import React, { Component } from "react";
import Header from "../../header/Header";
import { toast } from "react-toastify";
import Footer from "../../footer/Footer";
import CopyrightFooter from "../../footer/CopyrightFooter";
import "../newclient/NewClient.css";
import Trash from "../../../utils/images/trash.svg";
import Attach from "../../../utils/images/attach.svg";
import api from "../../../utils/api";
import { Helmet } from "react-helmet";

class NewClient extends Component {
  constructor(props) {
    super(props);
    const { id } = JSON.parse(localStorage.getItem("eSahyogiUser")).data;
    this.state = {
      clientName: "",
      password: "",
      licenseDuration: "",
      licenseFee: "",
      adminEmail: "",
      phone: "",
      headerDesignationLine1: "",
      headerDesignationLine2: "",
      headerDesignationLine3: "",
      leftImageFormData: new FormData(),
      signImageFormData: new FormData(),
      rightImageFormData: new FormData(),
      ImageFormData: new FormData(),
      leftImage: null,
      rightImage: null,
      signImage: null,
      image: null,
      createdBy: id,
    };
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
    this.ref4 = React.createRef();
  }

  createAccount = () => {
    api.createUser({
      mobileNumber: this.state.phone,
      password: this.state.password,
    });
  };

  onFileChangeImage = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ image: file }, () => {
        console.log(this.state.image);
      });
    } else {
      toast.error("File Size Exceeds");
    }
  };

  fileDataImage = () => {
    if (this.state.image) {
      return (
        <div className="SelectedItemFrame">
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={(e) => {
              this.setState({ leftImage: null });
            }}
          />
          <p className="TxtBrowse">{this.state.image.name}</p>
        </div>
      );
    }
  };

  onFileChangeLeft = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ leftImage: file }, () => {
        console.log(this.state.leftImage);
      });
    } else {
      toast.error("File Size Exceeds");
    }
  };

  onFileUploadLeft = (event) => {
    const formData = new FormData();

    formData.append("myFile", this.state.leftImage, this.state.leftImage.name);
  };

  fileDataLeft = () => {
    if (this.state.leftImage) {
      return (
        <div className="SelectedItemFrame">
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={(e) => {
              this.setState({ leftImage: null });
            }}
          />
          <p className="TxtBrowse">{this.state.leftImage.name}</p>
        </div>
      );
    }
  };
  onFileChangeRight = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ rightImage: file }, () => {
        console.log(this.state.rightImage);
      });
    } else {
      toast.error("File Size Exceeds");
    }
  };

  fileDataRight = () => {
    if (this.state.rightImage) {
      return (
        <div className="SelectedItemFrame">
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={(e) => {
              this.setState({ rightImage: null });
            }}
          />
          <p className="TxtBrowse">{this.state.rightImage.name}</p>
        </div>
      );
    }
  };
  onFileChangeSign = (event) => {
    let file = event.target.files[0];
    if (file.size < 1048576) {
      this.setState({ signImage: file }, () => {
        console.log(this.state.signImage);
      });
    } else {
      toast.error("File Size Exceeds");
    }
  };

  fileDataSign = () => {
    if (this.state.signImage) {
      return (
        <div className="SelectedItemFrame">
          <img
            src={Trash}
            alt=""
            className="AttachFile"
            onClick={(e) => {
              this.setState({ signImage: null });
            }}
          />
          <p className="TxtBrowse">{this.state.signImage.name}</p>
        </div>
      );
    }
  };

  renderNewClientForm(handleSubmit) {
    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">New Client</p>
            </div>
            <div className="FormFrame">
              <form onSubmit={handleSubmit}>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Client Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    this.setState({ clientName: e.target.value });
                  }}
                  value={this.state.clientName}
                  id="clientname"
                  className="InputFrame"
                  placeholder="Please enter client name"
                  maxLength={24}
                  required
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Licence Duration</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="number"
                  maxLength="2"
                  id="licenceduration"
                  className="InputFrame"
                  placeholder="Please enter licence duration"
                  value={this.state.licenseDuration}
                  required
                  onChange={(e) => {
                    this.setState({ licenseDuration: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Licence Fee per Month</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="number"
                  maxLength="6"
                  id="licencefee"
                  className="InputFrame"
                  placeholder="Please enter licence fee"
                  value={this.state.licenseFee}
                  required
                  onChange={(e) => {
                    this.setState({ licenseFee: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Admin Email id</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="email"
                  id="email"
                  className="InputFrame"
                  placeholder="Please enter email"
                  required
                  value={this.state.adminEmail}
                  onChange={(e) => {
                    this.setState({ adminEmail: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Admin Mobile Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="number"
                  id="mobilenumber"
                  className="InputFrame"
                  maxLength="10"
                  minLength="10"
                  placeholder="Please enter mobile no."
                  value={this.state.phone}
                  required
                  onChange={(e) => {
                    this.setState({ phone: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Password</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="password"
                  id="password"
                  className="InputFrame"
                  placeholder="Please enter password"
                  value={this.state.password}
                  required
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Super Admin Image</p>
                  <p className="TxtStar">*</p>
                </div>
                {this.fileDataImage()}
                <input
                  type="file"
                  onChange={this.onFileChangeImage}
                  ref={this.ref3}
                  className="FileInput"
                />
                <div
                  className="SelectFile"
                  onClick={() => {
                    this.ref3.current.click();
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <p className="TxtInput">
                  Left Image (64x64 Pixels &amp; 100 dpi &amp; jpeg Format)
                </p>
                {this.fileDataLeft()}
                <input
                  type="file"
                  onChange={this.onFileChangeLeft}
                  ref={this.ref1}
                  className="FileInput"
                />
                <div
                  className="SelectFile"
                  onClick={() => {
                    this.ref1.current.click();
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <p className="TxtInput">
                  Right Image (64x64 Pixels &amp; 100 dpi &amp; jpeg Format)
                </p>
                {this.fileDataRight()}
                <input
                  type="file"
                  onChange={this.onFileChangeRight}
                  ref={this.ref2}
                  className="FileInput"
                />
                <div
                  className="SelectFile"
                  onClick={() => {
                    this.ref2.current.click();
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <p className="TxtInput">
                  Sign Image (64x64 Pixels &amp; 100 dpi &amp; jpeg Format)
                </p>
                {this.fileDataSign()}
                <input
                  type="file"
                  onChange={this.onFileChangeSign}
                  ref={this.ref4}
                  className="FileInput"
                />
                <div
                  className="SelectFile"
                  onClick={() => {
                    this.ref4.current.click();
                  }}
                >
                  <img src={Attach} alt="" className="AttachFile" />
                  <p className="TxtBrowse">Browse Files</p>
                </div>

                <div className="TxtInputFrame">
                  <p className="TxtInput">Header Designation Line 1</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="designation1"
                  className="InputFrame"
                  placeholder="Please enter designation1"
                  required
                  onChange={(e) => {
                    this.setState({ headerDesignationLine1: e.target.value });
                  }}
                />
                <div className="TxtInputFrame">
                  <p className="TxtInput">Header Designation Line 2</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="designation2"
                  className="InputFrame"
                  placeholder="Please enter designation2"
                  required
                  onChange={(e) => {
                    this.setState({ headerDesignationLine2: e.target.value });
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Header Designation Line 3</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="designation3"
                  className="InputFrame"
                  placeholder="Please enter designation3"
                  required
                  onChange={(e) => {
                    this.setState({ headerDesignationLine3: e.target.value });
                  }}
                />

                <input type="submit" value="Submit" className="BtnSubmit" />
              </form>
            </div>
          </div>
          <Footer />
          <CopyrightFooter />
        </div>
        <div className="emptyDiv" />
      </div>
    );
  }

  createNewclient = async (clientDetails) => {
    let leftData = "";
    let rightData = "";
    let imageData = "";
    let signData = "";

    const {
      clientName,
      licenseDuration,
      licenseFee,
      adminEmail,
      phone,
      password,
      leftImage,
      rightImage,
      signImage,
      headerDesignationLine1,
      headerDesignationLine2,
      headerDesignationLine3,
      createdBy,
      leftImageFormData,
      rightImageFormData,
      signImageFormData,
      image,
      ImageFormData,
    } = clientDetails;

    if (image) {
      ImageFormData.append("file", image);
      console.log(leftImage, "hey there!");

      await api.uploadFile(ImageFormData).then(
        (response) => {
          if (response.ok) {
            console.log("sdf", response.data.data);

            imageData = response.data.data;
            console.log(imageData, "i am here");
          } else {
            console.log(response);
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    }

    if (leftImage) {
      leftImageFormData.append("file", leftImage);
      console.log(leftImage, "hey there!");

      await api.uploadFile(leftImageFormData).then(
        (response) => {
          if (response.ok) {
            console.log("sdf", response.data.data);
            toast.success("File Uploaded");
            leftData = response.data.data;
            console.log(leftData, "i am here");
          } else {
            console.log(response);
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
    if (rightImage) {
      rightImageFormData.append("file", rightImage);
      await api.uploadFile(rightImageFormData).then(
        (response) => {
          if (response.ok) {
            rightData = response.data.data;
            toast.success("File Uploaded");
          } else {
            console.log(response);
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
    if (signImage) {
      signImageFormData.append("file", signImage);
      await api.uploadFile(signImageFormData).then(
        (response) => {
          if (response.ok) {
            signData = response.data.data;
            toast.success("File Uploaded");
          } else {
            console.log(response);
          }
        },
        (err) => {
          console.log("err", err);
        }
      );
    }

    await api
      .createClient({
        firstName: clientName,
        mobileNumber: phone,
        licDuration: licenseDuration,
        licFees: licenseFee,
        emailId: adminEmail,
        password,
        img: imageData,
        leftImage: leftData,
        rightImage: rightData,
        h1: headerDesignationLine1,
        h2: headerDesignationLine2,
        h3: headerDesignationLine3,
        meta: {
          sign: signData,
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.ok) {
            toast.success("User created");
            return;
          }
          toast.error("Error Occured");
        },
        (err) => {
          console.log(err);
        }
      );
  };

  render() {
    const { createdBy } = this.state;
    const handleSubmit = (event) => {
      event.preventDefault();
      this.createNewclient(this.state);
    };

    return (
      <>
        <Helmet>
          <title>Create Client</title>
        </Helmet>
        {this.renderNewClientForm(handleSubmit)}
      </>
    );
  }
  // TODO: add a loading spinner for better UX
}
export default NewClient;
