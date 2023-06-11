import React, { Component } from 'react'
import Header from '../../header/Header'
import api from '../../../utils/api'
import { toast } from 'react-toastify'

class AddFolder extends Component {
  constructor(props) {
    super(props)

    if (this.props.location.state) {
      this.state = {
        ...this.props.location.state.folderData,
        isUpdate: true,
      }
    } else {
      this.state = {
        number: '',
        name: '',
        isUpdate: false,
      }
    }
  }

  addFolder = async (e) => {
    e.preventDefault()
    let folderData = {
      ...this.state,
    }

    delete folderData.isUpdate

    await api
      .addFolder({
        ...folderData,
        meta: {},
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('Folder Unsuccessful', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.success('Folder Created Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.props.history.push({
              pathname: '/manage-request',
              manage: 'LETTERS',
            })
          }
        }
      })
    console.log('Folder added', this.state)
  }

  updateFolder = async (e) => {
    e.preventDefault()
    let folderData = {
      ...this.state,
    }

    delete folderData.isUpdate
    delete folderData.createdAt
    delete folderData.updatedAt

    await api
      .updateFolder({
        ...folderData,
      })
      .then((response) => {
        if (response.ok) {
          if (response.data.error) {
            toast.error('Folder Update Unsuccessful', {
              autoClose: 1250,
              closeButton: false,
            })
          } else {
            toast.success('Folder Updated Successfully', {
              autoClose: 1250,
              closeButton: false,
            })
            this.props.history.push({
              pathname: '/manage-folders',
              manage: 'LETTERS',
            })
          }
        }
      })
  }

  render() {
    return (
      <div className="NewClientForm">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div className="DivHeading">
              <p className="TxtHeading">Add Folder</p>
            </div>
            <div className="FormFrame">
              <form>
                <div className="TxtInputFrame">
                  <p className="TxtInput">Folder Number</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="folderNumber"
                  className="InputFrame"
                  placeholder="Please Enter Folder Number"
                  value={this.state.number}
                  required
                  onChange={(e) => {
                    this.setState({ number: e.target.value })
                  }}
                />

                <div className="TxtInputFrame">
                  <p className="TxtInput">Folder Name</p>
                  <p className="TxtStar">*</p>
                </div>
                <input
                  type="text"
                  id="folderName"
                  className="InputFrame"
                  placeholder="Please Enter Folder Name"
                  value={this.state.name}
                  required
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
                {this.state.isUpdate ? (
                  <input
                    type="submit"
                    value="Update"
                    className="BtnSubmit"
                    onClick={(e) => this.updateFolder(e)}
                  />
                ) : (
                  <input
                    type="submit"
                    value="Submit"
                    className="BtnSubmit"
                    onClick={(e) => this.addFolder(e)}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="emptyDiv"></div>
      </div>
    )
  }
}

export default AddFolder
