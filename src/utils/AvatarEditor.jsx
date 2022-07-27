import React from 'react';
// import ReactDOM from 'react-dom'
// https://kirill3333.github.io/react-avatar/
import Avatar from 'react-avatar-edit'

const SOURCE_PATH = '';

class AvatarEditor extends React.Component {

  constructor(props) {
    super(props)
    const src = './user.png'
    this.state = {
      preview: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    this.onLoadNewImage = this.onLoadNewImage.bind(this)
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
  
  render () {
    return (
      <div className="container-fluid" >
        <div className="row">
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
            <div  style={{paddingTop: 20, paddingBottom: 20}}>
              <button onClick={this.onLoadNewImage} type="button" className="btn btn-primary">Load another image</button>
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
