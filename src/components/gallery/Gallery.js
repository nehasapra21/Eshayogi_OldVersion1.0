import React, { Component, Fragment, createRef } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import locationIcon from '../../utils/images/location.png'
import backIcon from '../../utils/images/icons-lelt-open-arrow.svg'
import photosIcon from '../../utils/images/photosIcon.png'
import videoIcon from '../../utils/images/videoIcon.png'
import tabSlider from '../../utils/images/tabSlider.png'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import loadingGIF from '../../utils/GIFs/loadingGIF.gif'
import Esahyogi from '../../utils/images/esahyogiblue.svg'

import Pictures from './Pictures'
import Videos from './Videos'
import PressClippings from './PressClippings'
import classes from './Gallery.module.css'

import Loader from '../hoc/Loader/Loader'

import axios from 'axios'

class Gallery extends Component {
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
      manage:
        this.props.location.search === '?event' ? 'EVENT' : 'POLITICALEVENT',
    }
    this.toastID = createRef(null)
    console.log('props of gallery', this.props.location.search)
  }

  componentDidMount() {
    this.fetchEventGallery()
  }

  fetchEventGallery() {
    this.setState({ requestStatus: '', isLoading: true })

    api
      .getAllGalleryImages({
        uid: this?.props?.location?.eventData?.ref,
        limit: '100',
        offset: '0',
      })
      .then(
        (response) => {
          if (response.ok) {
            console.log('Event Response', response)
            if (response.data.error) {
              this.setState({ isLoading: false })
            } else {
              const photos = response.data.data.rows.filter(
                (item) => item.type === 'photos'
              )
              const videos = response.data.data.rows.filter(
                (item) => item.type === 'videos'
              )
              const pressClippings = response.data.data.rows.filter(
                (item) => item.type === 'pressClippings'
              )
              this.setState(
                {
                  photos: photos,
                  pressClippings: pressClippings,
                  videos: videos,
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
    console.log('File event toast id', this.toastID)
    let selectedPhotos = new FormData()
    let array = []
    let {
      target: { files },
    } = event

    console.log('Files array', files)
    Array.from(files).map((file) => {
      console.log('File uploading', file)
      if (this.state.gallery === 'photos') {
        if (file.size <= 5120000) {
          array.push(file)
        } else {
          toast.error('File Exceeds Size Limit', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      } else {
        if (file.size <= 10485760) {
          array.push(file)
        } else {
          toast.error('File Exceeds Size Limit', {
            autoClose: 1250,
            closeButton: false,
          })
        }
      }
    })
    if (array.length) {
      for (let i = 0; i < array.length; i++) {
        selectedPhotos.append('file', array[i])
      }
      let toastID = this.toastID
      api.uploadFile({ selectedPhotos, toastID }).then(
        (response) => {
          toast.done(this.toastID.current)
          this.toastID.current = null
          if (response.ok) {
            if (response.data.error) {
              toast.error('File upload fail. Please Check file extension.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
            } else {
              let url = response.data.data
            api
              .addGallery({
                uid: this?.props?.location?.eventData?.ref,
                url: url,
                mimeType:
                  this.state.gallery === 'photos'
                    ? 'IMAGE'
                    : this.state.gallery === 'videos'
                    ? 'VIDEO'
                    : this.state.gallery === 'pressClippings'
                    ? 'PRESS CLIPPING'
                    : null,
                type: this.state.gallery,
              })
              .then(
                (res) => {
                  if (res.data.error) {
                    toast.error('File could not be added.', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  } else {
                    this.setState({
                    [this.state.gallery]: [
                      ...this.state[this.state.gallery],
                      res.data.data,
                    ],
                  })
                  toast.success('Upload Successful', {
                    autoClose: 1250,
                    closeButton: false,
                  })
                  }
                },
                (err) => {
                  toast.error('Upload Failed!')
                  console.log(
                    'err in adding file to gallary',
                    { autoClose: 1250, closeButton: false },
                    err
                  )
                }
              )
            }
          } else {
            console.log(response)
            toast.error('Something went wrong. Please refresh the page.', {
              autoClose: false,
            })
          }
        },
        (err) => {
          console.log('err in uploading files', err)
        }
      )
    }
  }

  returnToManage = (manage) => {
    console.log('Return button hit', this.state.manage)
    this.props.history.push({
      path: '/manage-request',
      state: {
        manage: this.state.manage,
      },
    })
  }

  render() {
    console.log('Gallery state', this.state)
    const {
      state: { event, isLoading, photos, videos, gallery, pressClippings },
      props,
    } = this
    let {
      request: { eventTitle, location, eventDate },
    } = event
    if (this.props?.location?.eventData?.request) {
      eventTitle = props.location.eventData.request.eventTitle
      location = props.location.eventData.request.location
      eventDate = props.location.eventData.request.eventDate
    } else {
      this.props.history.push({
        pathname: '/manage-request',
        state: {
          manage: this.state.manage,
        },
      })
    }
    return (
      <div className="BackgroundHomeframe">
        <div className="HeaderFrame">
          <div className="DivTabframe">
            <Link to="/home" className="img-link">
              <div className="DivEsahyogi">
                {this.props.isLoading ? (
                  <img src={loadingGIF} alt="" className="ImgeSahyogi" />
                ) : (
                  <img
                    src={Esahyogi}
                    alt=""
                    className="ImgeSahyogi"
                    onClick={() => {
                      this.setState({ section: 'home' })
                    }}
                  />
                )}
              </div>
            </Link>
          </div>
        </div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className={classes.frame}>
              <div>
                <div className={classes.heading}>
                  <img
                    src={backIcon}
                    className={classes.backButton}
                    alt="back"
                    onClick={() => this.returnToManage(this.state.manage)}
                  />
                  <p className={classes.eventHeading}>{eventTitle}</p>
                </div>
                <div className={classes.eventInfoSection}>
                  <div className={classes.eventInfo}>
                    <p className={classes.eventInfoHead}>Location:</p>
                    <p className={classes.eventInfoDetail}>{location}</p>
                  </div>
                  <div className={classes.eventInfo}>
                    <p className={classes.eventInfoHead}>Date :</p>
                    <p className={classes.eventInfoDetail}>
                      {moment(eventDate).format('Do MMMM YYYY')}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.optionsHeading}>
                  <ul className={classes.optionTab}>
                    <li
                      style={{ display: 'flow-root' }}
                      className={classes.optionTabList}
                      onClick={() => this.setState({ gallery: 'photos' })}
                    >
                      <img
                        src={photosIcon}
                        alt=""
                        className={classes.optionTabListImage}
                      />
                      <p className={classes.optionTabListHeading}>Photos</p>
                    </li>
                    <li
                      style={{ display: 'flow-root' }}
                      className={classes.optionTabList}
                      onClick={() =>
                        this.setState({ gallery: 'pressClippings' })
                      }
                    >
                      <img
                        src={videoIcon}
                        className={classes.optionTabListImage}
                        alt=""
                      />
                      <p className={classes.optionTabListHeading}>
                        Press Clippings
                      </p>
                    </li>
                    <li
                      style={{ display: 'flow-root' }}
                      className={classes.optionTabList}
                      onClick={() => this.setState({ gallery: 'videos' })}
                    >
                      <img
                        src={videoIcon}
                        className={classes.optionTabListImage}
                        alt=""
                      />
                      <p className={classes.optionTabListHeading}>Videos</p>
                    </li>
                  </ul>
                  <div className={classes.uploadButton}>
                    <label className={classes.btnLabel}>
                      Upload
                      <input
                        type="file"
                        accept={
                          this.state.gallery !== 'photos'
                            ? 'video/*'
                            : 'image/*'
                        }
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          this.buildArray(e)
                        }}
                        multiple
                      />
                    </label>
                  </div>
                </div>
                <img
                  src={tabSlider}
                  alt=""
                  className={
                    (gallery === 'photos' && classes.hoverImageLeft) ||
                    (gallery === 'pressClippings' &&
                      classes.hoverImageMiddle) ||
                    (gallery === 'videos' && classes.hoverImageRight)
                  }
                />
              </div>

              <div className={classes.galleryContainer}>
                {gallery === 'photos' && (
                  <Pictures pictures={photos} isLoading={isLoading} />
                )}
                {gallery === 'pressClippings' && (
                  <PressClippings
                    pressClippings={pressClippings}
                    isLoading={isLoading}
                  />
                )}
                {gallery === 'videos' && (
                  <Videos videos={videos} isLoading={isLoading} />
                )}
              </div>
            </div>
          </Fragment>
        )}
        <div className="emptyDiv"></div>
      </div>
    )
  }
}

export default Gallery
