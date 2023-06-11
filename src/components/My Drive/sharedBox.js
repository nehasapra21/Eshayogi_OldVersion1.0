import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Avatar,
} from '@material-ui/core'
import { includes } from 'lodash'

import { crossGrey, accordIcon } from '../../utils/svg/index'

import api from '../../utils/api'

const SharedBox = (props) => {
  const { shareWith, shareDrive, removeDrive } = props
  const [expanded, setExpanded] = useState('share-to')
  const [shareToIds, setShareToIds] = useState([])
  const [accounts, setAccounts] = useState([])
  const [sharedwithIds, setSharedwithIds] = useState([])
  const [sharedArray, setSharedArray] = useState([])

  useEffect(() => {
    const closeBtn = document.getElementById('cross-btn')
    closeBtn.addEventListener('click', () => {
      props.controlSharedBox()
    })
    const temp = []
    shareWith &&
      shareWith.forEach((data) => {
        temp.push(data.id)
      })
    setSharedArray([...temp])
  }, [])

  useEffect(async () => {
    const response = await api.getUsers({
      limit: '100',
      offset: '0',
    })
    setAccounts([...response?.data?.rows])
  }, [])

  const addShareToList = (id, list) => {
    if (list === 'to-list') {
      const temp = [...shareToIds]
      temp.push(id)
      setShareToIds([...temp])
    } else {
      const temp = [...sharedwithIds]
      temp.push(id)
      setSharedwithIds([...temp])
    }
  }

  const removeShareToList = (id, list) => {
    if (list === 'to-list') {
      const temp = [...shareToIds]
      const index = temp.indexOf(id)
      temp.splice(index, 1)
      setShareToIds([...temp])
    } else {
      const temp = [...sharedwithIds]
      const index = temp.indexOf(id)
      temp.splice(index, 1)
      setSharedwithIds([...temp])
    }
  }

  const selectAll = (list) => {
    if (list === 'to-list') {
      const temp = [...shareToIds]
      accounts.forEach((data) => {
        if (!includes(shareToIds, data.id)) {
          temp.push(data.id)
        }
      })
      setShareToIds([...temp])
    } else {
      const temp = [...sharedwithIds]
      shareWith.forEach((data) => {
        if (!includes(sharedwithIds, data.id)) {
          temp.push(data.id)
        }
      })
      setSharedwithIds([...temp])
    }
  }

  return (
    <div className="dialog-box">
      <div className="box-body">
        <div className="box-head">
          <div>
            <h5>Share</h5>
          </div>
          <div className="cross-btn" id="cross-btn">
            {crossGrey}
          </div>
        </div>
        <Accordion
          expanded={expanded === 'share-to'}
          onChange={() => setExpanded('share-to')}
          className="shared-accordation"
        >
          <AccordionSummary
            expandIcon={accordIcon}
            aria-controls="share-to"
            className="share-to-header"
          >
            <Typography className="shared-head">Share To</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="select-all-div">
              <p>All</p>
              <Checkbox
                sx={{
                  color: '#727274',
                  '&.Mui-checked': {
                    color: '#2d2f64',
                  },
                }}
                checked={
                  shareToIds.length !== 0 &&
                  accounts.length === shareToIds.length
                    ? true
                    : false
                }
                onChange={() => {
                  if (accounts && accounts.length === shareToIds.length) {
                    setShareToIds([])
                  } else {
                    selectAll('to-list')
                  }
                }}
              />
            </div>
            <ul className="select-list">
              {accounts.map((account, index) => {
                if (!includes(sharedArray, account.id)) {
                  return (
                    <div className="select-item" key={index}>
                      <div className="avatar-name-div">
                        <Avatar alt={account.firstName} src={account.img} />
                        <li>{account.firstName}</li>
                      </div>

                      <Checkbox
                        value={account.id}
                        checked={includes(shareToIds, account.id)}
                        onChange={() => {
                          if (includes(shareToIds, account.id)) {
                            removeShareToList(account.id, 'to-list')
                          } else {
                            addShareToList(account.id, 'to-list')
                          }
                        }}
                        sx={{
                          color: '#727274',
                          '&.Mui-checked': {
                            color: '#2d2f64',
                          },
                        }}
                      />
                    </div>
                  )
                }
              })}
            </ul>
            <div className="accord-btn">
              <button type="submit" onClick={(e) => shareDrive(e, shareToIds)}>
                Share
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'share-with'}
          onChange={() => setExpanded('share-with')}
          className="shared-accordation"
        >
          <AccordionSummary
            expandIcon={accordIcon}
            aria-controls="share-with"
            className="share-with-header"
          >
            <Typography className="shared-head">Shared With</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="select-all-div">
              <p>All</p>
              <Checkbox
                sx={{
                  color: '#727274',
                  '&.Mui-checked': {
                    color: '#2d2f64',
                  },
                }}
                checked={
                  shareWith.length !== 0 &&
                  shareWith &&
                  shareWith.length === sharedwithIds.length
                    ? true
                    : false
                }
                onChange={() => {
                  if (shareWith && shareWith.length === sharedwithIds.length) {
                    setSharedwithIds([])
                  } else {
                    selectAll('with-list')
                  }
                }}
              />
            </div>
            <ul className="select-list">
              {shareWith &&
                shareWith.map((account, index) => (
                  <div className="select-item" key={index}>
                    <div className="avatar-name-div">
                      <Avatar alt={account.firstName} src={account.img} />
                      <li>{account.firstName}</li>
                    </div>

                    <Checkbox
                      value={account.id}
                      checked={includes(sharedwithIds, account.id)}
                      onChange={() => {
                        if (includes(sharedwithIds, account.id)) {
                          removeShareToList(account.id, 'with-list')
                        } else {
                          addShareToList(account.id, 'with-list')
                        }
                      }}
                      sx={{
                        color: '#727274',
                        '&.Mui-checked': {
                          color: '#2d2f64',
                        },
                      }}
                    />
                  </div>
                ))}
            </ul>
            {shareWith.length !== 0 ? (
              <div className="accord-btn">
                <button
                  type="button"
                  onClick={(e) => removeDrive(e, sharedwithIds)}
                >
                  Remove
                </button>
              </div>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default SharedBox
