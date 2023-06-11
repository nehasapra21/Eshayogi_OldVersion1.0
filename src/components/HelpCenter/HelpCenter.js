import React, { Component } from 'react';

import Header from '../header/Header';

import arrowBullets from '../../utils/images/arrowBullets.png';
import mail from '../../utils/images/mail.png';
import phone from '../../utils/images/phone.png';
import location from '../../utils/images/location.png';

import CopyRightfooter from '../footer/CopyrightFooter';
import Footer from '../footer/Footer';

import './HelpCenter.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
class HelpCenter extends Component {
  render() {
    return (
      <div className='BackgroundHomeframe'>
        <Header />
        <div className='frame curveBorders'>
          <div className='FormOuterFrame' style={{ textAlign: 'left' }}>
            <div className='DivHeading'>
              <p className='TxtHeading'>Help Center</p>
            </div>
            <div className='FormFrame' style={{ paddingBottom: '30px' }}>
              {/* <p  style={{display:"none"}} className='helpHead'>
                Popular Topics
              </p>
              <ul style={{display:"none"}} className='helpList'>
                <li>
                  <img src={arrowBullets} alt="" className='arrowBullets'></img>
                  <p className='info'>
                    Change or cancel your booking
                  </p>
                </li>
                <li>
                  <img src={arrowBullets} alt="" className='arrowBullets'></img>
                  <p className='info'>
                    View or find your booking confirmation
                  </p>
                </li>
                <li>
                  <img src={arrowBullets} alt="" className='arrowBullets'></img>
                  <p className='info'>
                    How we determine our sort order
                  </p>
                </li>
                <li>
                  <img src={arrowBullets} alt="" className='arrowBullets'></img>
                  <p className='info'>
                    Change or cancellation fees
                  </p>
                </li>
              </ul>
              <hr className='partition'/>
              <div className='helpFooter'>
                <div className='iconParaGroups'>
                  <div className='iconParaGroup'>
                    <div style={{display:"none"}}>
                      <img src={mail} alt="" className='icon' style={{ width: '38px' }} />
                    </div>
                    <a style={{display:"none"}} className='helpLinks' href='mailto: esahiyogi@gmail.com'>esahiyogi@gmail.com</a>
                  </div>
                  <div className='iconParaGroup'>
                    <div>
                      <img src={phone} alt="" className='icon' style={{ width: '27px' }} />
                    </div>
                    <a className='helpLinks' herf='tel:0172-2367484'>0172-2367484</a>
                  </div>
                  <div style={{display:"none"}} className='iconParaGroup'>
                    <div>
                      <img src={location} alt="" className='icon' style={{ width: '24px' }} />
                    </div>
                    <a className='helpLinks' href='/'>Location</a>
                  </div>
                </div>
                <div style={{display:"none"}} className='helpBtn'>
                    <a href='/home'>
                      <button className='BtnSubmit'>Contact Us</button>
                    </a>
                </div>
              </div> */}

              <Accordion defaultActiveKey='0'>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey='0'>
                    <FontAwesomeIcon icon={faPlus} className='plusIcon' />
                    ESAHYOGI - How To Upload Letter And Set Page Margins
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <iframe
                        width='100%'
                        height='500'
                        src='https://www.youtube.com/embed/-lsUTa7D16k'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                      ></iframe>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey='1'>
                    <FontAwesomeIcon icon={faPlus} className='plusIcon' />
                    ESAHYOGI - How to Enable Hindi Language Typing and Set
                    Shortcuts
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>
                      <iframe
                        width='100%'
                        height='500'
                        src='https://www.youtube.com/embed/XnsfQJKdPM0'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                      ></iframe>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey='2'>
                    <FontAwesomeIcon icon={faPlus} className='plusIcon' />
                    Esahyogi - How To Type Hindi in Kruti Dev Keyboard Format
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='2'>
                    <Card.Body>
                      <iframe
                        width='100%'
                        height='500'
                        src='https://www.youtube.com/embed/xl0jYALaKw4'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                      ></iframe>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
          <div className='DashboardFooter'>
            <Footer />
            <CopyRightfooter />
          </div>
        </div>
      </div>
    );
  }
}

export default HelpCenter;
