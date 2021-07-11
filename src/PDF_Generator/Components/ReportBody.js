import React from "react";
import "./ReportBody.css"
export const ReportBody = (props) => {


    if (props.display) {
        return <React.Fragment>
            <div className='report-details'>
                <span >
                    Report created by: <span className="report-creater"> Talha </span>
                </span>
                <span>
                    Report Date: Date
                </span>
            </div>
            <div className="main-text">
                <span className="company-name">Scimetic | Epic Solutions</span>
                <span className="greenhouse-name">Test Greenhouse</span>
                <span>
                    Genealogy: test Genealogy
                </span>
                <span>
                    Date of Plating: {new Date().toDateString()}
                </span>


            </div>


            <span className="d3-chart">
                {props.children}
            </span>

        </React.Fragment>
    }
    return <React.Fragment> {props.children}</React.Fragment>

}
