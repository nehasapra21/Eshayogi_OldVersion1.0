import React, { Component, Fragment } from 'react';
import api from '../../../utils/api';

import ConstituencyAlert from './constituencyAlert';

class Zila extends Component {
  constructor(props) {
    super(props);

    console.log('Props recieved', this.props);

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        constituency: this.props.data.data.meta.constituency,
        updateConstData: this.props.data.updateConstData,
      };
    } else {
      this.state = {
        name: '',
        constituency: '',
        updateConstData: false,
      };
    }

    console.log('States', this.state);
  }

  showConfirmBox = false;

  render() {
    return (
      <Fragment>
        <form
          onSubmit={(e) => {
            this.props.getConstituencyData(e, this.state);
          }}
        >
          <div className='TxtInputFrame'>
            <p className='TxtInput'>District</p>
            <p className='TxtStar'>*</p>
          </div>
          <input
            type='text'
            className='InputFrame'
            placeholder='Please enter Zila'
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            required
          />

          <div className='TxtInputFrame'>
            <p className='TxtInput'>Constituency</p>
            <p className='TxtStar'>*</p>
          </div>
          <input
            type='text'
            className='InputFrame'
            placeholder='Please enter Constituency'
            onChange={(e) => this.setState({ constituency: e.target.value })}
            value={this.state.constituency}
            required
          />
          {this.state.updateConstData ? (
            <input
              type='submit'
              value='Update'
              className='BtnSubmit'
              onClick={() => {
                console.log('Enters Function');
                this.showConfirmBox = true;
              }}
            />
          ) : (
            <input
              type='submit'
              value='Submit'
              className='BtnSubmit'
              onClick={() => {
                console.log('Enters Function');
                this.showConfirmBox = true;
              }}
            />
          )}
        </form>
        {/* {
        this.showConfirmBox ? this.state.updateConstData ?
        <ConstituencyAlert msg = 'Zila Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
        <ConstituencyAlert msg = 'Zila Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
        null
      } */}
      </Fragment>
    );
  }
}

export default Zila;
