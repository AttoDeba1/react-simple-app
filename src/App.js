import React, { Component } from 'react';
import logo from './logo.svg';
import HomePage from './shared/HomePage';

class App extends Component {

  render() {
    var data = {
  name: "name",
  email: "email@email.com",
}



fetch('http://localhost:8080/api/paths/', {
  method: 'put',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
 body: JSON.stringify({data:data})
})
.then(response=>
  response.json())
.catch( error=>console.log("error",error) )
.then( res=>{
  console.log("success", res)
});

    return (
       <HomePage/>
    );
  }
}

export default App;
