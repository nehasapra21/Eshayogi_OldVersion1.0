import React from 'react'
import MiddleFooter from './MiddleFooter'
import IconFooter from './IconFooter'
import CopyRightFooter from './CopyRightFooter'

import './footerSyles.css'

/* Includes all footers */
const Footer1 = () => (
  <div className="footer">
    <IconFooter />
    <MiddleFooter />
    <CopyRightFooter />
  </div>
)

/* Includes only middle and lower footer */
const Footer2 = () => (
  <div className="footer">
    <MiddleFooter style={{ borderRadius: '30px 30px 0 0' }} />
    <CopyRightFooter />
  </div>
)

export default {
  Footer1,
  Footer2,
}
