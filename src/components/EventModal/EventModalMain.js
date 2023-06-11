import React, { Component } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import './Modal.css'
import locationIcon from '../../utils/images/location.png'
import dateIcon from '../../utils/images/dateIcon.png'
import photosIcon from '../../utils/images/photosIcon.png'
import videoIcon from '../../utils/images/videoIcon.png'
import tabSlider from '../../utils/images/tabSlider.png'
import api from '../../utils/api'

import Pictures from './Gallery/Pictures'
import Videos from './Gallery/Videos'
import PressClippings from './Gallery/PressClippings'

class EventModalMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gallery: 'photos',
      photos: [],
      videos: [],
      pressClippings: [],
      isLoading: true,
      event: {
        request: {
          eventTitle: 'EventName',
          location: 'Delhi',
          eventDate: '2020-12-14T14:18:58.383Z',
        },
      },
    }
  }

  componentDidMount() {
    this.fetchEventGallery()
  }

  fetchEventGallery() {
    this.setState({ manage: 'EVENT', requestStatus: '', isLoading: true })

    api
      .getAllGalleryImages({
        uid: this?.props?.event?.ref,
        limit: '100',
        offset: '0',
      })
      .then(
        (response) => {
          if (response.ok) {
            console.log('Event Response', response)
            if (response.data.data == undefined) {
            } else {
              const photos = response.data.data.rows.filter(
                (item) => item.type === 'photos'
              )
              // const videos = response.data.data.rows.filter(
              //   (item) => item.mimeType === 'VIDEO'
              // )
              const pressClippings = response.data.data.rows.filter(
                (item) => item.type === 'pressClippings'
              )
              this.setState(
                {
                  photos: photos,
                  pressClippings: pressClippings,
                  isLoading: false,
                },
                () => {
                  console.log(this.state.photos)
                }
              )
            }
          } else {
            console.log('something error occured ', response)
          }
        },
        (err) => {
          console.log('err is', err)
        }
      )
  }

  buildArray = (event) => {
    const selectedPhotos = new FormData()
    const array = []
    const {
      target: { files },
    } = event
    Array.from(files).forEach((file) => {
      if (file.size <= 1048576) {
        array.push(file)
      } else {
        toast.error('File Exceeds Size Limit', {
          autoClose: 1250,
          closeButton: 'false',
        })
      }
    })
    if (array.length) {
      for (let i = 0; i < array.length; i++) {
        selectedPhotos.append('files', array[i])
      }
      api.uploadFiles(selectedPhotos).then(
        (response) => {
          if (response.ok) {
            toast.success('File Uploaded Successfully!')
            response.data.data.forEach((url) => {
              api
                .addGallery({
                  uid: this?.props?.event?.ref,
                  url: url,
                  mimeType: 'IMAGE',
                  type: this.state.gallery,
                })
                .then(
                  (res) => {
                    this.setState({
                      [this.state.gallery]: [
                        ...this.state[this.state.gallery],
                        res.data.data,
                      ],
                    })
                  },
                  (err) => {
                    console.log('err in adding file to gallary', err)
                  }
                )
            })
          } else {
            toast.error('File Upload Failed!')
            console.log(response)
          }
        },
        (err) => {
          toast.error('File Upload Failed!')
          console.log('err in uploading files', err)
        }
      )
    }
  }

  render() {
    const {
      state: { event, isLoading, photos, videos, gallery, pressClippings },
      props,
    } = this
    let {
      request: { eventTitle, location, eventDate },
    } = event
    if (this.props?.event?.request) {
      eventTitle = props.event.request.eventTitle
      location = props.event.request.location
      eventDate = props.event.request.eventDate
    }
    return (
      <div className="Modal">
        <div className="modalContainer">
          <div
            className="closeModalBtn"
            onClick={() => this.props.showEventModal()}
          >
            <div className="upper"></div>
            <div className="lower"></div>
          </div>
          <div className="modalHeads" style={{ margin: '15px 0' }}>
            <p className="eventHead">{eventTitle}</p>
            {gallery !== 'videos' && (
              <div className="uploadBtn" onChange={(e) => this.buildArray(e)}>
                <label className="btnLabel">Upload Image</label>
                <input type="file" accept="image/*" />
              </div>
            )}
          </div>
          <div className="modalHeads">
            <div className="eventInfo">
              <img src={locationIcon} alt="" className="eventIcons"></img>
              <p className="Head"></p>
              <p className="infoName">{location}</p>
            </div>
            <div className="eventInfo">
              <img src={dateIcon} alt="" className="eventIcons"></img>
              <p className="Head">Date :</p>
              <p className="infoName">
                {moment(eventDate).format('Do MMMM YYYY')}
              </p>
            </div>
          </div>
          <ul className="modalTabs">
            <li onClick={() => this.setState({ gallery: 'photos' })}>
              <img src={photosIcon} alt="" className="tabImg"></img>
              <p className="infoName">Photos</p>
            </li>
            <li onClick={() => this.setState({ gallery: 'pressClippings' })}>
              <img src={videoIcon} alt="" className="tabImg"></img>
              <p className="infoName">Press Clippings</p>
            </li>
            <li onClick={() => this.setState({ gallery: 'videos' })}>
              <img src={videoIcon} alt="" className="tabImg"></img>
              <p className="infoName">Videos (Coming Soon)</p>
            </li>
            <img
              src={tabSlider}
              alt=""
              className={
                (gallery === 'photos' && 'tabSlider Left') ||
                (gallery === 'pressClippings' && 'tabSlider Center') ||
                (gallery === 'videos' && 'tabSlider Right')
              }
            ></img>
          </ul>
          <div className="galleryContainer">
            {gallery === 'photos' && (
              <Pictures pictures={photos} isLoading={isLoading} />
            )}
            {gallery === 'pressClippings' && (
              <PressClippings pictures={pressClippings} isLoading={isLoading} />
            )}
            {gallery === 'videos' && (
              <Videos videos={videos} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EventModalMain
