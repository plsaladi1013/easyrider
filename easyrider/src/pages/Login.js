import React, { Component } from 'react'; 

class Login extends Component {
  
  
    render () {
          return (
              
              <div className="Login">
             
 <form className="login" data-component="Login"/>
     <h1 className="head" data-component="Head" >
         Easy Rider 
       </h1>
   <div className="row" data-component="Row"/>
     <div className="six columns" data-component="Six"/>
       <label className="mailabel" data-component="Mailabel"for="exampleEmailInput">E-Mail</label>
       <input className="u-full-width" data-component="Full"  type="email" id="exampleEmailInput"/>
     
     <div className="six columns" data-component="Six"/>
       <label className="password" data-component="Password" >Password</label>
       <input className="u-full-width" data-component="Full" type="password"/> 
      
    
   
  <button className="signin">
  <a href="/Home">
  Sign in
  </a>
  </button>
 
 <h5 className="bottom" data-component="Bottom">
   Don't have an account with us yet?
 </h5>
 
 
 <button className="signup" data-component="Signup">
   <a href="/Register">Register </a>
 </button>
 
 
 </div> 
 
             
          ); 
          
     }
 }
 
  export default Login; 