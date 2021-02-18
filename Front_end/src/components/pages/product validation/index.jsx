import { NULL } from 'node-sass';
import React, {Component} from 'react';

   const FormErrors = (props)=> {
       const formErrors=props.formErrors;
    return(
        <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName] !=null){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
    )
   }

export default FormErrors;