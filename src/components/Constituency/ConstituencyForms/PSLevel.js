import React, { Component } from 'react';
import { Fragment } from 'react';
import api from '../../../utils/api';
import ConstituencyAlert from './constituencyAlert';
import { Typeahead } from 'react-bootstrap-typeahead';
import warningLogo from '../../../utils/images/warningLogo.png';

export default class PSLevel extends Component {
  constructor(props) {
    super(props);

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        district: this.props.data.data.meta.district,
        updateConstData: this.props.data.updateConstData,
      };
    } else {
      this.state = {
        name: '',
        district: '',
        updateConstdistrict: false,
      };
    }
  }

  district = [];
  showWarning = false;

  componentDidMount() {
    api
      .getConstituencyData({
        type: 'Zila Level',
        limit: '100',
        offset: '0',
        status: true,
      })
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetch constituency', response);
          if (response.data.data === undefined) {
            this.showWarning = true;
          } else {
            response.data.data.rows.map((wonderer) =>
              this.district.includes(wonderer.meta.name)
                ? null
                : this.district.push(wonderer.meta.name)
            );
          }
        }
      });
  }

  showConfirmBox = false;

  render() {
    return (
      <Fragment>
        {this.showWarning ? (
          <div className='warningMsg'>
            <div className='warningHead'>
              <img className='warningLogo' src={warningLogo} alt=''></img>
              <p>Warning</p>
            </div>
            <p className='warningTxt'>Please Make atleast one Zila</p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state);
              }}
            >
              <div className='TxtInputFrame'>
                <p className='TxtInput'>Panchayat Samiti</p>
                <p className='TxtStar'>*</p>
              </div>
              <input
                type='text'
                className='InputFrame'
                placeholder='Please enter Panchayat Samiti'
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>District</p>
                <p className='TxtStar'>*</p>
              </div>
              <Typeahead
                id='district'
                labelKey='district'
                placeholder='Please select a District'
                onChange={(district) =>
                  this.setState({ district: district[0] })
                }
                options={this.district}
                defaultInputValue={this.state.district}
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
              <ConstituencyAlert msg = 'Panchayat Samiti Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
              <ConstituencyAlert msg = 'Panchayat Samiti Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
              null
            } */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
