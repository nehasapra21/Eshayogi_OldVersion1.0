import React, { Component } from 'react'
import csvToJson from 'convert-csv-to-json'
import Trash from '../utils/images/trash.svg'
import Attach from '../utils/images/attach.svg'
import fs from 'fs'

export default class CsvToJson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ImageFormData: new FormData(),
            image: null,
        }
        this.ref = React.createRef();

    }

    onFileChange = event => {
        let file = event.target.files[0];
        if (file.size < 100000) {
            this.setState({ image: file }, () => { this.convert() });
            
        }
        else {
            alert("File Size Exceeds")
        }
    };



    fileData = () => {
        console.log("xx")
        if (this.state.image) {
            console.log("Hii")
            return (
                <div className="SelectedItemFrame">
                    <img src={Trash} alt="" className="AttachFile" onClick={(e) => { this.setState({ image: null }) }} />
                    <p className="TxtBrowse">{this.state.image.name}</p>

                </div>
            );
        }
    };

    convert = () => {
        let json = csvToJson.getJsonFromCsv(`${this.state.image.name}`);
        for(let i=0; i<json.length;i++){
            console.log(json[i]);
        }
}
    
    
    render() {
        return (
            <div>
                <p className="TxtInput">Import CSV file</p>
                {this.fileData()}
                <input type="file" onChange={this.onFileChange} ref={this.ref} className="FileInput" />
                <div className="SelectFile" onClick={() => { this.ref.current.click() }}>
                    <img src={Attach} alt="" className="AttachFile" />
                    <p className="TxtBrowse">Browse Files</p>
                </div>
            </div>
        )
    }
}