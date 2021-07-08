
import React from 'react';

import { useData } from './Data/useData';
import DataSelect from "./shared/uiElements/DataSelectors"
import { DateSelectorButtonGroup } from "./shared/uiElements/DateSelector"
import StackedBarChart from "./Chart/StackedBarChart"
import { dataSetSelecots, dateSelector } from "./Data/SelectorData"
import { Grid } from '@material-ui/core';

import "./App.css"

import Pdf from "react-to-pdf";



const App = () => {
  const data = useData();
  const [currentSensor, setcurrentSensor] = React.useState(dataSetSelecots[0].value);
  const [currentDate, setCurrentDate] = React.useState({ startDate: dateSelector[0].days, endDate: undefined });
  const [display, setDisplay] = React.useState(true)
  const ref = React.createRef();


  if (!data) {
    return <div>loading</div>
  }

  if (display) {
    return (
      <React.Fragment>
          <Grid container spacing={3} ref={ref}>
            <Grid item md={1}></Grid>
            <Grid item md={9} >
              <div style={{ background: 'blue' }}> B </div>
              <DateSelectorButtonGroup currentDate={currentDate} setCurrentDate={setCurrentDate} dateSelector={dateSelector} />
              <StackedBarChart data={data} date={currentDate} sensors={currentSensor} />
            </Grid>
            <Grid item md={2} >
              <div style={{ background: "green" }}> C </div>
              <DataSelect currentSensor={currentSensor} dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor} display={display} setDisplay={setDisplay} />
            </Grid>
          </Grid>

        <Pdf targetRef={ref} filename="PDF Generator.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>


      </React.Fragment>
    );
  }
  // else {
  //   return (<PDFViewer>
  //         <DataSelect currentSensor={currentSensor} dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor} display={display} setDisplay={setDisplay} />

  //     <MyDocument />
  //   </PDFViewer>)
  // }
}


export default App;

