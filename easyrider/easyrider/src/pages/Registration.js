import React, { Component } from 'react'; 

//import { render } from 'react-dom';



class Registration extends Component {
    render () { 
        return ( 
            <div class="container">
    <form class="registration" action="action_page.php"/>
        <div class="added"/>
          <h1 class="registration">Registration</h1>
          <p>Please fill in this form to create an account.</p>
          <hr/>
      
          <label class="elabel" data-component="Elabel" for="email"></label>
          <input class="email" data-component="Email" type="text" placeholder="Enter Email" name="emailInput" required/>
      
          <label class="plabel" data-component="Plabel" for="psw"></label>
          <input class="enter" data-component="Password" type="password" placeholder="Enter Password" name="passwordInput" required/>
      
          <label class="repeat"  data-component="Repeat" for="psw-repeat"></label>
          <input class="pass" type="password"  data-component="Password" placeholder="Repeat Password" name="psw-repeat" required/>
            
           
            {/* <input class="box" data-component="Box" type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> 
            Remember me
            </input>
            </label> */}
         
            
            <button data-component="Cancelbtn" type="button" class="cancelbtn">
           <a href="/"> Cancel</a>
            </button>
    
            
           
            <button data-component="Signupbtn" type="submit" class="signupbtn">
            <a href="/Home">submit</a>
            </button>
            
        </div> 
        ); 
    }
}
 

export default Registration; 