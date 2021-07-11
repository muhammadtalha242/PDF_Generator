
import React from "react";
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
import Button from '@material-ui/core/Button';

export const GeneratePDF = (props) => {
    const printDocument = () => {
        const input = document.getElementById('divToPrint');

        domtoimage.toPng(input)
            .then(function (dataUrl) {
                const pdf = new jsPDF();
                pdf.addImage(dataUrl, 'PNG', 0, 0);
                pdf.save("download.pdf");

            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });


    }

    if (props.display) {
        return <React.Fragment>

            <Button variant="outlined" color="primary" aria-label="text primary button" onClick={printDocument}>Print</Button>

        </React.Fragment>;
    }
    return <React.Fragment></React.Fragment>
}



