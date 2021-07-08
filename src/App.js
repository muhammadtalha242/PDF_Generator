
import React from 'react';

import { useData } from './Data/useData';
import { BarChar } from './Chart/BarChart';
import DataSelect from "./shared/uiElements/DataSelectors"
import { DateSelectorButtonGroup } from "./shared/uiElements/DateSelector"
import { DataProvider } from "./Data/DataContext"
import StackedBarChart from "./Chart/StackedBarChart"

import "./App.css"

const dataSetSelecots = [
  { key: "Temperature", value: ["Temperature_2", "Temperature_137522"] },
  { key: "Co2 Levels", value: ["CarbonDioxide_2", "CarbonDioxide_137522"] },
  { key: "Humidity", value: ["Humitidy_2", "Humitidy_137522"] },
  { key: "VPD", value: ["Vpd_2","Vpd_137522"] },
  { key: "All", value: ["temperature", "co2","humitidy", "vpd"]}
]
const dateSelector = [
  { key: "12 hours", days: 0.5 },
  { key: "1 day", days: 1 },
  { key: "7 days", days: 7},
  { key: "14 days", days: 14},
  { key: "30 days", days: 30},
  { key: "custome date", days: "date"},
] 

const App = () => {
  const data = useData();
  const [currentSensor, setcurrentSensor] = React.useState(dataSetSelecots[0].value);
  const [currentDate, setCurrentDate] = React.useState({startDate:dateSelector[0].days, endDate:undefined});
  

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <DataProvider>
      <React.Fragment>
        <DateSelectorButtonGroup currentDate={currentDate} setCurrentDate={setCurrentDate} dateSelector={dateSelector}/>

        <DataSelect currentSensor={currentSensor}  dataSetSelecots={dataSetSelecots} setcurrentSensor={setcurrentSensor}/>
        {/* <BarChar data={data} date={currentDate} sensors={currentSensor} /> */}
        <StackedBarChart data={data} date={currentDate} sensors={currentSensor} /> 

      </React.Fragment>
    </DataProvider>
  );
};

export default App;

