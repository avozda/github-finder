import React, { Component } from 'react'

export class sEARCH extends Component {
   state = {
      text: ""
   }
   onSubmit = (e) => {
      e.preventDefault();
      
   }
   onChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
   }
  
   render() {
      return (
         <div>
            <form className="form" onSubmit={this.onSubmit}>
               <input type="text" name="text" placeholder="Search Users..." valus={this.state.text} onChange={this.onChange}/>
               <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
         </div>
      )
   }
}

export default sEARCH
