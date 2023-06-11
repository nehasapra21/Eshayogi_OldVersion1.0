import React, { Component } from 'react'
import '../footer/IconFooter.css'
import LocalServer from '../../utils/images/Local Servers.svg'
import Madeinindia from '../../utils/images/makeinindia.png'
import bit from '../../utils/images/256 bit encryption.svg'
class IconFooter extends Component{
    render()
    {
        return(
            <div className="IconFooterframe">
                <div className="DivIcon">
                    <div className="InnerdivIcon">
                        <img src={LocalServer} alt="" className="ImgIcon1"/>
                        <p className="TxtIcon">Local Servers</p>
                    </div>
                    <div className="InnerdivIcon" style={{ justifyContent : 'center' }}>
                        <img src={Madeinindia} alt="" className="ImgIcon2"/>
                        <p className="TxtIcon">Make in India</p>
                    </div>
                    <div className="InnerdivIcon" style={{ justifyContent : 'flex-end' }}>
                        <img src={bit} alt="" className="ImgIcon3"/>
                        <p className="TxtIcon">256 bit encryption</p>
                    </div>

                </div>
            </div>
        )
    }
}
export default IconFooter