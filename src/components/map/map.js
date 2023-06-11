import himachal from '../../utils/images/states/whiteBorderHP.svg'
import React, { Component } from 'react'
import mapData from './himachal.json'
import classes from './map.module.css'
import Header from '../header/Header'
import '../ManageConstituency/ManageConstituency.css'
import Footer from '../footer/Footer'
import CopyRightFooter from '../footer/CopyrightFooter'
import ImageMapper from 'react-image-mapper'
import gradient from '../../utils/images/gradient.png'
import { Link } from 'react-router-dom'
import Plus from '../../utils/images/plus.svg'

class Map extends Component {
  constructor(props) {
    super(props)
    document.title="constituency-map"
    this.state = {
      hoveredArea: null,
    }
  }

  enterArea(area) {
    this.setState({ hoveredArea: area })
  }

  leaveArea(area) {
    this.setState({ hoveredArea: null })
  }

  getTipPosition(area) {
    return { top: `${area.center[1] - 25}px`, left: `${area.center[0]}px` }
  }

  clicked(area) {
    this.props.history.push(
      `/constituency/manage-booth-details/${area.name.split(' ')[1]}`
    )
  }

  render() {
    const map = {
      name: 'my-map',
      areas: [],
    }
    mapData.mandals.forEach((mandal) => {
      map.areas.push({
        id: mandal.id,
        name: `${mandal.id} ${mandal.name} has ${mandal.booth.length} booths`,
        shape: 'poly',
        coords: [...mandal.coords],
        strokeColor: '#ffffff',
      })
    })

    return (
      <div className="BackgroundHomeframe">
        <Header />
        <div className="frame">
          <div className="FormOuterFrame">
            <div
              className="DivHeading"
              style={{ justifyContent: 'center', position: 'relative' }}
            >
              <p className="ConstituencyHead">Constituency Dashboard</p>
              <Link
                style={{ display: 'block', position: 'absolute', right: '4%' }}
                to={'/add-constituency'}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p className="UpperTabTxt" style={{ marginRight: '10px' }}>
                    Add
                  </p>
                  <img src={Plus} alt="" />
                </div>
              </Link>
            </div>
            <div className="constituencyTabs">
              <ul className={classes.areaListUl}>
                {mapData.mandals.map((mandal) => (
                  <li className={classes.areaListItems}>
                    <p>{`${mandal.id} ${mandal.name}`}</p>
                  </li>
                ))}
              </ul>
              <div className={classes.container}>
                <ImageMapper
                  src={himachal}
                  map={map}
                  width={735.1}
                  height={473.41}
                  onMouseEnter={(area) => this.enterArea(area)}
                  onMouseLeave={(area) => this.leaveArea(area)}
                  onClick={(area) => this.clicked(area)}
                />
                {this.state.hoveredArea && (
                  <span
                    className={classes.tooltip}
                    style={{ ...this.getTipPosition(this.state.hoveredArea) }}
                  >
                    {this.state.hoveredArea && this.state.hoveredArea.name}
                  </span>
                )}
              </div>
              <img src={gradient} alt="gradient" />
            </div>
            <div className="DashboardFooter">
              <Footer />
              <CopyRightFooter />
            </div>
          </div>
        </div>
        <div className="emptyDiv"></div>
      </div>
    )
  }
}
export default Map
