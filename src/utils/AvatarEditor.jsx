import React from 'react';
// import ReactDOM from 'react-dom'
// https://kirill3333.github.io/react-avatar/
import Avatar from 'react-avatar-edit'

const SOURCE_PATH = '';

class AvatarEditor extends React.Component {

  constructor(props) {
    super(props)
    const preview = localStorage.getItem('preview');
    console.log('getItem: ');
    this.state = {
      preview: preview,
      // src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    this.onLoadNewImage = this.onLoadNewImage.bind(this)
    // this.saveImage = this.saveImage.bind(this)
  }
 
  onClose() {
    this.setState({preview: null})
  }
  
  onCrop(preview) {
    this.setState({preview})
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 3145728){ // 3mb
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  onLoadNewImage() {
    const src = './einshtein.jpg'
    this.setState({src})
    console.log('src =', src);
  }
  saveImage = (preview) => {
    if (preview)
      localStorage.setItem('preview',  this.state.preview);
    console.log('saveImage: ', ( this.state.preview)? 'y': 'n');
  }
  
  render () {
    return (
      <div className="container-fluid" >
        <div className="row" style={{padding: '10px 0'}}>
          {/* <div className="col-2"/> */}
          <div className="col-6">
            <Avatar
              width={300}
              // height={400}
              imageWidth={300}
              cropRadius={110}
              onCrop={this.onCrop}
              onClose={this.onClose}
              onBeforeFileLoad={this.onBeforeFileLoad}
              src={this.state.src}
              // img={'./einshtein.jpg'}
              exportAsSquare
              exportSize={300}
            />
            <div  style={{paddingTop: 20, paddingBottom: 10}}>
              <button onClick={() => this.saveImage(this.state.preview)} type="button" className="btn btn-primary">Save image</button>
            </div>
          </div>
          <div className="col-1"/>
          <div className="col-4 ">
            <h5>Preview</h5>
            <img alt="" style={{width: '200px', height: '200px'}} src={this.state.preview}/>
          </div>
        </div>
        {/* <img src={this.state.preview} alt="Preview" /> */}
      </div>
    )
  }
}

export default AvatarEditor;
