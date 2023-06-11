import React, { Component } from 'react'
import Header from '../header/Header'
import BottomNavigation from '../header/BottomNavigation'
import Esahyogi from '../../utils/images/esahyogiwhite.svg'
import Tif from '../../utils/images/tif.svg'
import Footer from '../footer/Footer'
import IconFooter from '../footer/IconFooter'
import CopyrightFooter from '../footer/CopyrightFooter'
import DrBR from '../../utils/images/drBR.png'
import '../home/Home.css'

import api from '../../utils/api'

class Home extends Component {
  constructor(props) {
    super(props)
    document.title = 'Home'
    const { state: historyState } = props.location

    const { data } = { ...historyState }

    const { leftImage, rightImage, h1, h2, h3 } = JSON.parse(
      localStorage.getItem('HomePage')
    )

    console.log('homepage data', JSON.parse(localStorage.getItem('HomePage')))

    this.state = {
      isLoading: false,
      leftImage: leftImage,
      rightImage: rightImage,
      headerDesignationLine1: h1,
      headerDesignationLine2: h2,
      headerDesignationLine3: h3,
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
  }

  renderMainContent() {
    const {
      headerDesignationLine1,
      headerDesignationLine2,
      headerDesignationLine3,
      leftImage,
      rightImage,
    } = this.state

    return window.innerWidth > 480 ? (
      <div>
        <div className="BackgroundHomeframe">
          <Header />
          <div className="frame">
            <div className="LoginframeBackground">
              <div className="HomeFrame">
                <div className="Home">
                  <p className="TxtWelcome">Welcome to eSahyogi</p>
                  <div className="ImgDiv">
                    <img
                      src={`${api.BASE_URL_1}/${leftImage}`}
                      alt=""
                      className="ImgClient"
                    />
                    <img
                      src={`${api.BASE_URL_1}/${rightImage}`}
                      alt=""
                      className="ImgClient"
                    />
                  </div>
                  <p className="TxtOfficeOf">
                    {/*Office Of */}
                    {headerDesignationLine1 && headerDesignationLine1}
                  </p>
                  <p className="TxtDesignation">
                    {headerDesignationLine2 && headerDesignationLine2}
                  </p>

                  <p className="TxtHelpLink">
                    <a href="">Facing trouble? visit:sahyogi.com</a>
                  </p>
                  <div className="DivCopyright">
                    <p className="TxtCopyright">Copyright of</p>
                    <img src={Tif} alt="" className="ImgTif" />
                  </div>
                </div>
              </div>
            </div>

            <div className="DashboardFooter">
              <IconFooter />
              <Footer />
              <CopyrightFooter />
            </div>
          </div>
          <div className="emptyDiv" />
        </div>
      </div>
    ) : (
      <div>
        <div className="BackgroundHomeframe">
          <div className="frame">
            <div className="LoginframeBackground">
              <div className="HomeFrame">
                <div className="Home">
                  <div>
                    <p className="TxtWelcome">Welcome to</p>
                    <img src={Esahyogi} style={{ width: '120px' }} />
                  </div>
                  <div className="ImgDiv">
                    <img src={leftImage} alt="" className="ImgClient" />
                    <img src={rightImage} alt="" className="ImgClient" />
                  </div>
                  <p className="TxtOfficeOf">
                    {headerDesignationLine1 && headerDesignationLine1}
                  </p>
                  <p className="TxtDesignation">
                    {headerDesignationLine2 && headerDesignationLine2}
                  </p>

                  <p className="TxtHelpLink">
                    <a href="">Facing trouble? visit:sahyogi.com</a>
                  </p>
                  <div className="DivCopyright">
                    <p className="TxtCopyright">Copyright of</p>
                    <img src={Tif} alt="" className="ImgTif" />
                  </div>
                </div>
              </div>
            </div>
            <BottomNavigation />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderMainContent()
  }
}
export default Home
