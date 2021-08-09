import React from 'react';
import axios from 'axios';



export default class Scrape extends React.Component {
  
    state={imgVdData:[null]};

    async componentDidMount() {
        
        let response = await axios.get(`http://localhost:3000/readScraped`,
        {headers: {'Authorization': `Basic dGVzdDp0ZXN0MTIz`}});
        this.setState({ imgVdData:response.data.data });
    }
  
    render() {


      const style = {
        backgroundColor:'black',
        border:'1px solid blue',
        padding:'8px',
        height:'100px',
        width:'100px',
      }

      return (
        <ul>
          { this.state.imgVdData.map(data => <img style={style} src={data}></img>)}
        </ul>
      )
    }
  }