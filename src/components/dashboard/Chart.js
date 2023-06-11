import React from 'react'

const Chart = (props) => {
  console.log('Chart props', props)

  let chartInfo = [
    { status: 'PENDING', classNameInfo: 'ChartIndicatorPending' },
    { status: 'ASSIGNED', classNameInfo: 'ChartIndicatorAssigned' },
    { status: 'SOLVED', classNameInfo: 'ChartIndicatorSolved' },
    { status: 'DISCUSS', classNameInfo: 'ChartIndicatorDiscuss' },
    { status: 'DELEGATED', classNameInfo: 'ChartIndicatorDelegated' },
    { status: 'UNSUCCESSFUL', classNameInfo: 'ChartIndicatorUnsuccessful' },
    { status: 'SCHEDULED', classNameInfo: 'ChartIndicatorScheduled' },
    { status: 'ATTENDED', classNameInfo: 'ChartIndicatorAttended' },
    { status: 'REJECTED', classNameInfo: 'ChartIndicatorRejected' },
    { status: 'SANCTIONED', classNameInfo: 'ChartIndicatorSanctioned' },
    { status: 'WORKINPROGRESS', classNameInfo: 'ChartIndicatorWorkInProgress' },
    { status: 'WORK DONE', classNameInfo: 'ChartIndicatorWorkDone' },
    { status: 'INAUGURATED', classNameInfo: 'ChartIndicatorInaugurated' },
    { status: 'PROCESSING', classNameInfo: 'ChartIndicatorProcessing' },
    { status: 'CLEARED', classNameInfo: 'ChartIndicatorCleared' },
    { status: 'RESPONSENEEDED', classNameInfo: 'ChartIndicatorResponseNeeded' },
    {
      status: 'RESPONSENOTNEEDED',
      classNameInfo: 'ChartIndicatorResponseNotNeeded',
    },
    { status: 'RESPONDEDTO', classNameInfo: 'ChartIndicatorRespondedTo' },
    { status: 'SHARED', classNameInfo: 'ChartIndicatorShared' },
    { status: 'PLACED', classNameInfo: 'ChartIndicatorPlaced' },
    { status: 'IMPORTANT', classNameInfo: 'ChartIndicatorUnsuccessful' },
    { status: 'VERYIMPORTANT', classNameInfo: 'ChartIndicatorPending' },
    { status: 'GENERAL', classNameInfo: 'ChartIndicatorResponseNeeded' },
    { status: 'CONFIRMED', classNameInfo: 'ChartIndicatorUnsuccessful' },
    { status: 'NOTCONFIRMED', classNameInfo: 'ChartIndicatorPending' },
    { status: 'UNDERREVIEW', classNameInfo: 'ChartIndicatorPending' },
  ]

  let chartData = []

  for (let i = 0; i < props.data.length; i++) {
    for (let j = 0; j < chartInfo.length; j++) {
      if (props.data[i].status === chartInfo[j].status) {
        chartData.push({
          status: props.data[i].status,
          classNameInfo: chartInfo[j].classNameInfo,
          count: props.data[i].count,
        })
      }
    }
  }

  console.log('data daalo array nikalo', chartData)

  return (
    <div className="IndicatorLayout">
      {chartData.map((data) => {
        return (
          <div className="requestDiv">
            <div className={data.classNameInfo} />
            <p className="ChartTxt">{data.status}</p>
            <p className="ChartValue">{data.count}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Chart
