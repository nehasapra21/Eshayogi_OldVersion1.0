import React, { Component, Fragment } from 'react';
import api from '../../../utils/api';
import ConstituencyAlert from './constituencyAlert';
import { Typeahead } from 'react-bootstrap-typeahead';
import warningLogo from '../../../utils/images/warningLogo.png';

export default class RevenueVillage extends Component {
  constructor(props) {
    super(props);

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        type: this.props.data.data.meta.type,
        totalPopulation: this.props.data.data.meta.totalPopulation,
        gramPanchayat: this.props.data.data.meta.gramPanchayat,
        updateConstData: this.props.data.updateConstData,
      };
    } else {
      this.state = {
        name: '',
        type: '',
        totalPopulation: '',
        gramPanchayat: '',
        updateConstdistrict: false,
      };
    }
  }

  type = ['Village', 'Dhani'];
  gramPanchayat = [];
  showWarning = false;

  componentDidMount() {
    api
      .getConstituencyData({
        type: 'Gram Panchayat',
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
              this.gramPanchayat.includes(wonderer.meta.name)
                ? null
                : this.gramPanchayat.push(wonderer.meta.name)
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
            <p className='warningTxt'>Please Make atleast one Gram Panchayat</p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state);
              }}
            >
              <div className='TxtInputFrame'>
                <p className='TxtInput'>Revenue Village</p>
                <p className='TxtStar'>*</p>
              </div>
              <input
                type='text'
                className='InputFrame'
                placeholder='Please enter Revenue Village'
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>Type</p>
                <p className='TxtStar'>*</p>
              </div>
              <Typeahead
                id='type'
                labelKey='type'
                placeholder='Please select a Type'
                onChange={(type) => this.setState({ type: type[0] })}
                options={this.type}
                defaultInputValue={this.state.type}
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>Total Population</p>
                <p className='TxtStar'>*</p>
              </div>
              <input
                type='text'
                className='InputFrame'
                placeholder='Please enter Total Population'
                onChange={(e) =>
                  this.setState({ totalPopulation: e.target.value })
                }
                value={this.state.totalPopulation}
                required
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>Gram Panchayat</p>
                <p className='TxtStar'>*</p>
              </div>
              <Typeahead
                id='gramPanchayat'
                labelKey='gramPanchayat'
                placeholder='Please select a Gram Panchayat'
                onChange={(gramPanchayat) =>
                  this.setState({ gramPanchayat: gramPanchayat[0] })
                }
                options={this.gramPanchayat}
                defaultInputValue={this.state.gramPanchayat}
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
              <ConstituencyAlert msg = 'Revenue Village Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
              <ConstituencyAlert msg = 'Revenue Village Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
              null
            } */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
