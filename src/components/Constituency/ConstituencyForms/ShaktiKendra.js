import React, { Component, Fragment } from 'react';
import api from '../../../utils/api';
import ConstituencyAlert from './constituencyAlert';
import { Typeahead } from 'react-bootstrap-typeahead';
import warningLogo from '../../../utils/images/warningLogo.png';

export default class ShaktiKendra extends Component {
  constructor(props) {
    super(props);

    if (this.props.data !== undefined) {
      this.state = {
        name: this.props.data.data.meta.name,
        mandal: this.props.data.data.meta.mandal,
        updateConstData: this.props.data.updateConstData,
      };
    } else {
      this.state = {
        name: '',
        mandal: '',
        updateConstdistrict: false,
      };
    }
  }

  mandal = [];
  showWarning = false;

  componentDidMount() {
    api
      .getConstituencyData({
        type: 'Mandal Level',
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
              this.mandal.includes(wonderer.meta.name)
                ? null
                : this.mandal.push(wonderer.meta.name)
            );
          }
        }
      });

    /* setTimeout(() => {
      let constituencies = []
    let obj = {}
    let inc = 7, i, j
    for(i = 7; i < this.mandal.length; i++) {
      for ( j = 1; j <= 10; j++) {
        obj = {
          type : 'Shakti Kendra',
          meta : {
            name : `Kendra_${inc}`,
            mandal : `Mandal_${i}`
          }
        }
        inc = inc + 1
        constituencies.push(obj)
      }
    }
    console.log('data ban gya', constituencies)
    api.bulkImport({constituencies}).then( response => {
      console.log('data ban gya ?', response)
    } )
    }, 2000);*/
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
            <p className='warningTxt'>Please Make atleast one Mandal</p>
          </div>
        ) : (
          <Fragment>
            <form
              onSubmit={(e) => {
                this.props.getConstituencyData(e, this.state);
              }}
            >
              <div className='TxtInputFrame'>
                <p className='TxtInput'>Shakti Kendra</p>
                <p className='TxtStar'>*</p>
              </div>
              <input
                type='text'
                className='InputFrame'
                placeholder='Please enter Shakti Kendra'
                onChange={(e) => this.setState({ name: e.target.value })}
                value={this.state.name}
                required
              />

              <div className='TxtInputFrame'>
                <p className='TxtInput'>Mandal</p>
                <p className='TxtStar'>*</p>
              </div>
              <Typeahead
                id='mandal'
                labelKey='mandal'
                placeholder='Please select a Mandal'
                onChange={(mandal) => this.setState({ mandal: mandal[0] })}
                options={this.mandal}
                defaultInputValue={this.state.mandal}
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
              <ConstituencyAlert msg = 'Shakti Kendra Updated' showConfirmBox = { this.showConfirmBox } location = {'/manage-constituency'} /> : 
              <ConstituencyAlert msg = 'Shakti Kendra Created' showConfirmBox = { this.showConfirmBox } location = {'/add-constituency'} /> :
              null
            } */}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
