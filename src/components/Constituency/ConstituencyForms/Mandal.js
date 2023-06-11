import React, { Component, Fragment } from 'react';
import api from '../../../utils/api';
import ConstituencyAlert from './constituencyAlert';
import { Typeahead } from 'react-bootstrap-typeahead';
import warningLogo from '../../../utils/images/warningLogo.png';

export default class Mandal extends Component {
  constructor(props) {
    super(props);

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        vidhanSabha: this.props.data.data.meta.vidhanSabha,
        updateConstData: this.props.data.updateConstData,
      };
    } else {
      this.state = {
        name: '',
        vidhanSabha: '',
        updateConstdistrict: false,
      };
    }
  }

  /*componentDidMount = () => {
    
  }*/

  vidhanSabha = [];
  showWarning = false;

  componentDidMount() {
    api
      .getConstituencyData({
        type: 'Vidhan Sabha',
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
              this.vidhanSabha.includes(wonderer.meta.name)
                ? null
                : this.vidhanSabha.push(wonderer.meta.name)
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
            <p className='warningTxt'>Please Make atleast one Vidhan Sabha</p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state);
              }}
            >
              <div className='TxtInputFrame'>
                <p className='TxtInput'>Mandal</p>
                <p className='TxtStar'>*</p>
              </div>
              <input
                type='text'
                className='InputFrame'
                placeholder='Please enter Mandal'
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>Vidhan Sabha</p>
                <p className='TxtStar'>*</p>
              </div>
              <Typeahead
                id='vidhanSabha'
                labelKey='vidhanSabha'
                placeholder='Please select a Vidhan Sabha'
                onChange={(vidhanSabha) =>
                  this.setState({ vidhanSabha: vidhanSabha[0] })
                }
                options={this.vidhanSabha}
                defaultInputValue={this.state.vidhanSabha}
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
              <ConstituencyAlert msg = 'Mandal Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
              <ConstituencyAlert msg = 'Mandal Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
              null
            } */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
