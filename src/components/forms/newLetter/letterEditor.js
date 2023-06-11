import React, { Component, Fragment } from 'react'
import Header from '../../header/Header'
import { Editor } from '@tinymce/tinymce-react'
import './letter.css'
import api from '../../../utils/api'
import { toast } from 'react-toastify'
import Loader from '../../hoc/Loader/Loader'
import Footer from '../../footer/Footer'
import CopyrightFooter from '../../footer/CopyrightFooter'
import PrintWarning from './printWarning'
import { charmapChars } from './charmapPlugin'

class letterEditor extends Component {
  constructor(props) {
    super(props)
    if (this.props.location.state.letterFormData) {
      this.state = {
        ...this.props.location.state.letterFormData,
        showLoader: true,
        showWarning: false,
      }
    }
  }

  handleEditorChange = (content, editor) => {
    this.setState({ content: content })
  }

  handleSubmit = async () => {
    let requestData = {
      ...this.state,
    }

    delete requestData.isUpdate
    delete requestData.showLoader
    delete requestData.folderName
    delete requestData.folderNumber
    delete requestData.foldersData
    delete requestData.selectedfile
    delete requestData.showWarning

    let citizenData = {
      recommendedName: this.state.recommendedName,
      recommendedNumber: this.state.recommendedNumber,
      citizenAddress: this.state.citizenAddress,
      citizenPincode: this.state.citizenPincode,
      citizenName: this.state.citizenName,
      citizenMobileNumber: this.state.citizenMobileNumber,
      contactNo: this.state.contactNo,
    }

    let newDate = new Date()

    await api
      .createRequest({
        dd: `${newDate.getDate()}`,
        mm: `${newDate.getMonth() + 1}`,
        yy: `${newDate.getFullYear()}`,
        ref: this.state.ref,
        typeOfRequest: 'LETTERS',
        status: this.state.status,
        request: requestData,
        citizen: citizenData,
        meta: {
          name: this.state.folderName,
          number: this.state.folderNumber,
        },
      })
      .then(
        (response) => {
          if (response.ok) {
            console.log('Letter responnse', response.data)
            console.log(response.data, 'xxx')
            if (response.data.error) {
              if (response.data.error === 'REQUEST ALREADY EXIST') {
                toast.error('DO Number should be different.', {
                  autoClose: 1250,
                  closeButton: false,
                })
              } else {
                toast.error('Request Failed', {
                  autoClose: 1250,
                  closeButton: false,
                })
              }
            } else {
              toast.success('Letter added Successfully!', {
                autoClose: 1250,
                closeButton: false,
              })
              this.props.history.push({
                pathname: '/manage-request',
                state: {
                  manage: 'LETTERS',
                },
              })
            }
          } else {
            alert('Error occured')
            console.log(response.data)
          }
        },
        (err) => {
          console.log('err ', err)
        }
      )
  }

  handleUpdate = async () => {
    let {
      byUser,
      content,
      contactNo,
      citizenAddress,
      citizenMobileNumber,
      citizenName,
      citizenPincode,
      date,
      id,
      orgId,
      ref,
      status,
      recommendedName,
      recommendedNumber,
      dd,
      mm,
      yy,
      followUp1,
      followUp2,
      attachments,
      acknowlegement,
    } = { ...this.state }

    let requestData = {
      content,
      contactNo,
      citizenPincode,
      citizenAddress,
      citizenMobileNumber,
      citizenName,
      ref,
      status,
      recommendedName,
      recommendedNumber,
      date,
      followUp1,
      followUp2,
      attachments,
      acknowlegement,
    }

    await api
      .updateRequest({
        dd,
        mm,
        yy,
        typeOfRequest: 'LETTERS',
        status,
        byUser,
        ref,
        orgId,
        id,
        request: { ...requestData },
        meta: {
          name: this.state.folderName,
          number: this.state.folderNumber,
        },
      })
      .then(
        (response) => {
          if (response.ok) {
            console.log('updated the Letter', response.data)
            if (response.data.error) {
              toast.error('Request Failed', {
                autoClose: 1250,
                closeButton: false,
              })
            } else {
              toast.success('Letter updated Successfully!', {
                autoClose: 1250,
                closeButton: false,
              })
              this.props.history.push({
                pathname: '/manage-request',
                state: {
                  manage: 'LETTERS',
                },
              })
            }
          } else {
            console.log('Some Error occured', response)
          }
        },
        (err) => {
          console.log('Rejected Error', err)
        }
      )
  }

  stopLoader = () => {
    console.log('stop loader called')
    let boolVal = this.state.showLoader
    this.setState({ showLoader: !boolVal })
  }

  componentDidMount() {
    localStorage.setItem('x', 1.9)
    localStorage.setItem('y', 1.2)
    localStorage.setItem('z', 1.5)
    localStorage.setItem('v', 1.2)
    document.getElementById('letterDiv').focus()
  }

  saveToDocx = () => {
    let filename = this.state.ref
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>"
    var postHtml = '</body></html>'
    var html = preHtml + document.getElementById('element').innerHTML + postHtml

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    })

    var url =
      'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc'

    // Create download link element
    var downloadLink = document.createElement('a')

    document.body.appendChild(downloadLink)

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      // Create a link to the file
      downloadLink.href = url

      // Setting the file name
      downloadLink.download = filename

      //triggering the function
      downloadLink.click()
    }
    document.body.removeChild(downloadLink)
  }

  detectKeyPress = (event) => {
    var evtobj = window.event ? event : event
    if (evtobj.key === 'p' && evtobj.ctrlKey) {
      this.setState({ showWarning: true })
      event.preventDefault()
    }
  }

  closeWarning = () => {
    this.setState({ showWarning: false }, () => {
      document.getElementById('letterDiv').focus()
    })
  }

  insertParentheis = (editor) => {
    editor.shortcuts.add('ctrl+shift+q', 'Left Paranthesis', function () {
      editor.execCommand('mceInsertContent', false, 'Hello')
    })
  }

  render() {
    let letterDate = new Date(this.state.date)
    let initialContent = `<div><p style="text-align: right">${
      this.state.ref
    }</p><p style="text-align: right">Date: ${letterDate.getDate()}/${
      letterDate.getMonth() + 1
    }/${letterDate.getFullYear()}</p></div>`

    return (
      <Fragment>
        <div
          className="NewClientForm"
          onKeyDown={(e) => {
            this.detectKeyPress(e)
          }}
          tabIndex="0"
          id="letterDiv"
        >
          {this.state.showWarning ? (
            <PrintWarning closeWarning={this.closeWarning} />
          ) : null}
          <Header />
          <div className="frame2">
            {this.state.showLoader ? null : (
              <div className="letterHeader">
                <div className="fields">
                  <div className="headFields">
                    <p className="field">DO No. : </p>
                    <p className="value">{this.state.ref}</p>
                  </div>
                  <div className="headFields">
                    <p className="field">Folder No. : </p>
                    <p className="value">{this.state.folderNumber}</p>
                  </div>
                  <div className="headFields">
                    <p className="field">Folder Name : </p>
                    <p className="value">
                      {this.state.folderName.length > 15
                        ? `${this.state.folderName.slice(0, 10)}...`
                        : this.state.folderName}
                    </p>
                  </div>
                  <div className="headFields">
                    <p className="field">Status : </p>
                    <div
                      style={{ width: '140px', marginLeft: '5px' }}
                      className={
                        this.state.status === 'VERYIMPORTANT'
                          ? 'StatusDesc statusPending'
                          : this.state.status === 'GENERAL'
                          ? 'StatusDesc statusResponseNeeded'
                          : 'StatusDesc statusRespondedTo'
                      }
                    >
                      <p id="datatxt" className="StatusTxt whiteTxt">
                        {this.state.status == 'VERYIMPORTANT'
                          ? 'VERY IMPORTANT'
                          : this.state.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="buttons">
                  <button
                    type="button"
                    className="BtnSubmit"
                    onClick={() => this.saveToDocx()}
                  >
                    Save To Docx
                  </button>
                  {this.state.isUpdate ? (
                    <button
                      onClick={() => this.handleUpdate()}
                      type="button"
                      className="BtnSubmit"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => this.handleSubmit()}
                      type="button"
                      className="BtnSubmit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}

            <Editor
              selector="div#textEditorSelectorDiv"
              value={
                this.state.content === '' ? initialContent : this.state.content
              }
              onInit={(editor) => {
                this.stopLoader()
              }}
              apiKey="6sawb7w1dltk3as1x5ynt8bq35b4nmq1rztedd5t6oxljyd7"
              init={{
                selector: 'textarea',
                mode: 'exact',
                resize: 'both',
                height: 1140,
                menubar: true,
                lineheight_formats: '0.25 0.5 1 1.1 1.2 1.3 1.4 1.5 2',
                fontsize_formats:
                  '8pt 10pt 11p 12pt 13pt 14pt 15pt 16pt 18pt 24pt 36pt',
                element_format: 'html',
                charmap_append: charmapChars,
                external_plugins: {
                  Setting:
                    'https://sanjaybhatia.esahyogi.com/tinyPlugin/plugin.min.js',
                  Language:
                    'https://sanjaybhatia.esahyogi.com/tinyPlugin/language.min.js',
                },
                font_formats:
                  'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; KrutiDev=krutidev; Mangal=mangal',
                plugins: [
                  'paste print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons code  ',
                ],
                toolbar1:
                  'Setting | print | undo redo | customInsertButton | bold italic underline strikethrough | fontselect fontsizeselect formatselect | lineheight | alignleft aligncenter alignright alignjustify | numlist bullist ',
                toolbar2:
                  'Language | forecolor backcolor removeformat | pagebreak hr | emoticons | fullscreen  preview save | insertfile image media template link anchor codesample | ltr rtl | outdent indent | code',

                etd_file_name: `${this.state.ref}`,
                paste_as_text: true,
                content_css:
                  'https://anuragthakur.esahyogi.com/font/font-family.css',
                content_style: 'body { margin :1.9in 1.2in 1.2in 1.5in}',
              }}
              onEditorChange={this.handleEditorChange}
            />
            <div className="DashboardFooter">
              <Footer />
              <CopyrightFooter />
            </div>
          </div>
          <div className="emptyDiv" />
          <div
            id="element"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
            style={{ display: 'none' }}
          ></div>
          {this.state.showLoader ? <Loader /> : null}
        </div>
      </Fragment>
    )
  }
}

export default letterEditor
