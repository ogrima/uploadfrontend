import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import './main.css';

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
    fetch('https://uploadbackend.paas.sualmerica.br/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        console.log("Response Code" + response.status)
        if(response.status === 200){
          this.setState({ imageURL: `Upload realizado com sucesso.` });
        }else{
          this.setState({imageURL: `Falha ao realizar upload.`})
        }
        
      });
    });
  }

  render() {
    return (
    
    <Paper className="paper" >
 <span> {process.env.REACT_APP_PROJECT_VERSION} </span> 
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
            required
          />
        </div>
              
        <div>
          <Button type="submit" variant="contained" color="primary">Upload</Button>
        </div>
        <p>{this.state.imageURL}</p>
      </form>

     </Paper>
    );
  }
}
/* <img src={this.state.imageURL} alt="img" />*/
export default Main;