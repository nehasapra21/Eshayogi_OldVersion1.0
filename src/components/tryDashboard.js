import React, { Component } from 'react'

import { PieChart } from 'react-minimal-pie-chart';

class TryDashboard extends Component {
  render() {
    return (
      <div id="chart">
        <PieChart
          paddingAngle='2'
          radius = '10'
          center = { [ 50, 50 ] }
          segmentsShift ={() => { shiftSize : 0.5}}
          data={[
            { title: '', value: 16, color: '#00B8EB' },
            { title: '', value: 18, color: '#FDB81C' },
            { title: '', value: 15, color: '#00D57D' },
            { title: '', value: 14, color: '#B572F3' },
            { title: '', value: 17, color: '#F28854' },
            { title: '', value: 8, color: '#62D6D6' },
            { title: '', value: 12, color: '#4696AB' }
          ]}
        />
      </div>
    )
  }
}

export default TryDashboard
