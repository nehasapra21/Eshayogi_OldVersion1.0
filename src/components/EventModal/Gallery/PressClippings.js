import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import downloadBtn from '../../../utils/images/downloadBtn.png'
import axios from 'axios'
import fileDownload from 'js-file-download'
import api from '../../../utils/api'

export default class PressClippings extends Component {
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
                <Grid
                  item
                  xs={4}
                  style={{
                    border: '3px solid gainsboro',
                    margin: '2px',
                    flexBasis: '32%',
                  }}
                >
                  <div className="gallery">
                    <img src={`${api.BASE_URL_1}/${photo.url}`} alt="" />
                    <div
                      onClick={() => {
                        this.downloadImage(`${api.BASE_URL_1}/${photo.url}`)
                      }}
                      className="hoverLay"
                    >
                      <a
                        href={`${api.BASE_URL_1}/${photo.url}`}
                        target="_blank"
                        download
                      >
                        <img
                          src={downloadBtn}
                          alt=""
                          className="downloadBtn"
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
