/************************** Import library/fungsi ****************************/
//library React dan modul-modul React yang diperlukan
import React from 'react'

import { CSVReader } from 'react-papaparse'

//modul-modul Bootstrap
import Button from 'react-bootstrap/Button'

/************************ Deklarasi objek/variabel ***************************/
const buttonRef = React.createRef()
export var localCSVDataset;

/************************ Deklarasi kelas/komponen ***************************/
class FileUploader extends React.Component {
	handleOpenDialog = (e) => {
		// Note that the ref is set async, so it might be null at some point
		if (buttonRef.current) {
		  buttonRef.current.open(e)
		}
	  }
	
	  handleOnFileLoad = (data) => {
		console.log('---------------------------')
		console.log(data)
		console.log('---------------------------')
		localCSVDataset = data;
	  }
	
	  handleOnError = (err, file, inputElem, reason) => {
		console.log(err)
	  }
	
	  handleOnRemoveFile = (data) => {
		console.log('---------------------------')
		console.log(data)
		console.log('---------------------------')
		localCSVDataset = data;
	  }
	
	  handleRemoveFile = (e) => {
		// Note that the ref is set async, so it might be null at some point
		if (buttonRef.current) {
		  buttonRef.current.removeFile(e)
		}
	  }
	
	  render() {
		return (
		  <> {/* ini adalah cara cepat menulis <Fragment> */}
		    <h1 className="centeredH1">Read CSV File</h1>
			<CSVReader
			  config={{header:true}}
			  ref={buttonRef}
			  onFileLoad={this.handleOnFileLoad}
			  onError={this.handleOnError}
			  noClick
			  noDrag
			  onRemoveFile={this.handleOnRemoveFile}
			>
			  {({ file }) => (
				<aside
				  style={{
					display: 'flex',
					flexDirection: 'row',
					marginBottom: 10
				  }}
				>
				  <button
					type='button'
					onClick={this.handleOpenDialog}
					style={{
					  borderRadius: 0,
					  marginLeft: 0,
					  marginRight: 0,
					  width: '40%',
					  paddingLeft: 0,
					  paddingRight: 0
					}}
				  >
					Browse file
				  </button>
				  <div
					style={{
					  borderWidth: 1,
					  borderStyle: 'solid',
					  borderColor: '#ccc',
					  height: 45,
					  lineHeight: 2.5,
					  marginTop: 5,
					  marginBottom: 5,
					  paddingLeft: 13,
					  paddingTop: 3,
					  width: '60%'
					}}
				  >
					{file && file.name}
				  </div>
				  <button
					style={{
					  borderRadius: 0,
					  marginLeft: 0,
					  marginRight: 0,
					  paddingLeft: 20,
					  paddingRight: 20
					}}
					onClick={this.handleRemoveFile}
				  >
					Remove
				  </button>
				</aside>
			  )}
			</CSVReader>
		  </>
		)
	}
}

export default FileUploader;