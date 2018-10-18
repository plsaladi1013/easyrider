 import React, { Component } from 'react'; 
 import { BrowserRouter } from 'react-router-dom';
import './App.css';
//Importing Components
import Main from './components/main.js';
class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <div className="App">
                        <Main />
                    </div>
                </BrowserRouter>
        );
    }
}
export default App;






//    //render () {
//        //  return (
             
//         //     <div className="Login">
            
// <form className="login" data-component="Login"/>
//     <h1 className="head" data-component="Head" >
//         Easy Rider 
//       </h1>
//   <div className="row" data-component="Row"/>
//     <div className="six columns" data-component="Six"/>
//       <label className="mailabel" data-component="Mailabel"for="exampleEmailInput">E-Mail</label>
//       <input className="u-full-width" data-component="Full"  type="email" id="exampleEmailInput"/>
    
//     <div className="six columns" data-component="Six"/>
//       <label className="password" data-component="Password" >Password</label>
//       <input className="u-full-width" data-component="Full" type="password"/> 
     
   
  
//   <input className="button-primary" data-component="Primary" type="submit" value="Submit"/>

// <h5 className="bottom" data-component="Bottom">
//   Don't have an account with us yet?
// </h5>

// <Link to="./Registration.js">
// <button className="signup" data-component="Signup">
//   Register 
// </button>
// </Link>

// </div> 

            
//          ); 
         
//     }
// }

//  export default App; 