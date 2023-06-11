import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import downloadBtn from '../../utils/images/downloadBtn.png'
import axios from 'axios'
import fileDownload from 'js-file-download'
import classes from './Gallery.module.css'

import api from '../../utils/api'

class Videos extends Component {
  downloadVideo = (url) => {
    const temp = url.split('/')
    const filename = temp[temp.length - 1]
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }
  render() {
    const {
      props: { isLoading, videos },
    } = this

    return (
      <>
        {isLoading ? null : (
          <Fragment>
            <Grid container>
              {videos?.map((video) => (
                <Grid item xs={4} className={classes.gridItem}>
                  <div className={classes.gallery}>
                    <video
                      src={`${api.BASE_URL_1}/${video.url}`}
                      alt=""
                      className={classes.galleryImage}
                      autoPlay="true"
                    />
                    <div
                      onClick={() => {
                        this.downloadVideo(`${api.BASE_URL_1}/${video.url}`)
                      }}
                      className={`${classes.hoverEffect} ${classes.galleryImage}`}
                    >
                      <a
                        href={`${api.BASE_URL_1}/${video.url}`}
                        target="_blank"
                        download
                      >
                        <img
                          src={downloadBtn}
                          alt=""
                          className={classes.downloadIcon}
                          download
                        />
                      </a>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Fragment>
        )}
      </>
    )
  }
}

export default Videos
