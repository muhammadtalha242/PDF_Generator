import  {  createContext } from "react";
export const DataContext = createContext({
    inputData:[],     
    outputData:[],
    currentDateRange:{},
    currentSensors:""

});
