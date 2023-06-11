import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import downloadBtn from '../../utils/images/downloadBtn.png'
import axios from 'axios'
import fileDownload from 'js-file-download'
import classes from './Gallery.module.css'
import api from '../../utils/api'

export default class Pictures extends Component {
  downloadImage = (url) => {
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
      props: { isLoading, pictures },
    } = this

    return (
      <>
        {isLoading ? null : (
          <Fragment>
            <Grid container>
              {pictures?.map((photo) => (
                <Grid item xs={4} className={classes.gridItem}>
                  <div className={classes.gallery}>
                    <img
                      src={`${api.BASE_URL_1}/${photo.url}`}
                      alt=""
                      className={classes.galleryImage}
                    />
                    <div
                      onClick={() => {
                        this.downloadImage(`${api.BASE_URL_1}/${photo.url}`)
                      }}
                      className={`${classes.hoverEffect} ${classes.galleryImage}`}
                    >
                      <a
                        href={`${api.BASE_URL_1}/${photo.url}`}
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
