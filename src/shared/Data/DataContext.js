import React, { useState, useEffect, createContext } from "react";
import { ascending, csv } from 'd3';
import csvData from './2021_week19_climate_data.csv';

export const DataContext = createContext();


export const DataProvider = (props) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        // const row = (d) => {
        //   d.Population = +d['2020'];
        //   return d;
        // };
        // csv(csvURL, row).then((data) => {
        //   setData(data.slice(0, 10));
        // });

        // csv(csvData).then(d => {
        //   console.log(d)
        // })

        async function fetchData() {
            const row = (d) => {
                d.Date = new Date(d.Date);
                return d;
            };

            const d = await csv(csvData, row)
            setData(d.slice(0, 10));


        }
        fetchData()

    }, []);

    return (
        <DataContext.Provider value={[data, setData]}>
            {props.children}
        </DataContext.Provider>
    )
}