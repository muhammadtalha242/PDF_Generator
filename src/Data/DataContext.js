import React, { useState, useEffect, createContext } from "react";
import { ascending, csv } from 'd3';
import csvData from './2021_week19_climate_data.csv';

export const DataContext = createContext();

const csvURL =
    'https://gist.githubusercontent.com/muhammadtalha242/f960d2b81ab04f7e5bac5d00cecb4b1a/raw/worldPop.csv';

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