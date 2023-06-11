import React from 'react'
import Footers from '../footers/index'

import './ContainerStyles.css'

/* 1597px( All Dashboards ) */
const Container1WithFooter1 = (props) => (
  <div className="container_1">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container1WithFooter2 = (props) => (
  <div className="container_1">
    {props.children ? props.children : null}
    <Footers.Footer2 />
  </div>
)

/* 1450px( All Manage Sections ) */
const Container2WithFooter1 = (props) => (
  <div className="container_2">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container2WithFooter2 = (props) => (
  <div className="container_2">
    {props.children ? props.children : null}
    <Footers.Footer2 />
  </div>
)

/* 1232px( Login Screen, Homepage ) */
const Container3WithFooter1 = (props) => (
  <div className="container_3">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container3WithFooter2 = (props) => (
  <div className="container_3">
    {props.children ? props.children : null}
    <Footers.Footer2 />
  </div>
)

/* 880px ( All forms, error screen ) */
const Container4WithFooter1 = (props) => (
  <div className="container_4">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container4WithFooter2 = (props) => (
  <div className="container_4">
    {props.children ? props.children : null}
    <Footers.Footer2 />
  </div>
)

/* 595px ( All confirm screens ) */
const Container5WithFooter1 = (props) => (
  <div className="container_5">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container5WithFooter2 = (props) => (
  <div className="container_5">
    {props.children ? props.children : null}
    <Footers.Footer2 />
  </div>
)

/* 1732px ( My drive ) */
const Container6WithFooter1 = (props) => (
  <div className="container_6">
    {props.children ? props.children : null}
    <Footers.Footer1 />
  </div>
)

const Container6WithFooter2 = (props) => (
  <div className="container_6">{props.children ? props.children : null}</div>
)

export default {
  Container1WithFooter1,
  Container1WithFooter2,
  Container2WithFooter1,
  Container2WithFooter2,
  Container3WithFooter1,
  Container3WithFooter2,
  Container4WithFooter1,
  Container4WithFooter2,
  Container5WithFooter1,
  Container5WithFooter2,
  Container6WithFooter1,
  Container6WithFooter2,
}
