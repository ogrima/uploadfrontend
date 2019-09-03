import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    //data.append('filename', this.refs.fileName.input.value);
    fetch('https://uploadbackend:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `https://uploadbackend:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadFile}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }}
            accept="*.jmx"
            id="contained-button-file"
            multiple
            type="file"
          />        
        </div>
        
        <div>
          <TextField
            label="Nome do Arquio"
            inputRef={ref => (this.fileName = ref)}            
            type="text"
            margin="normal"
            required="true"
          />
        </div>
              
        <div>
          <Button type="submit" variant="contained" color="primary">Upload</Button>
        </div>
        
      </form>
    );
  }
}
/* <img src={this.state.imageURL} alt="img" />*/
export default Main;