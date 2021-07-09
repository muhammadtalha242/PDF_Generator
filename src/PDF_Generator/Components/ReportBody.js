import React from "react";

export const ReportBody = (props)=>{

    
    if (props.display) {
        return <div>
            {props.children}
            displaying
            </div>;
      }
      return <React.Fragment></React.Fragment>
      
}
