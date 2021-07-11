// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// // Create Document Component
//     const MyDocument = ({CompanyName, GreenhouseName, createdBy, DateCreation, Genealogy, DateofPlating}) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default MyDocument;
import React from "react";
import Pdf from "react-to-pdf";
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import html2PDF from 'jspdf-html2canvas';
import domtoimage from 'dom-to-image';
import Button from '@material-ui/core/Button';

export const GeneratePDF = (props) => {
    const printDocument = () => {
        const input = document.getElementById('divToPrint');

        domtoimage.toPng(input)
            .then(function (dataUrl) {
                var clientHeight = document.getElementById('divToPrint').clientHeight;
                var clientWidth = document.getElementById('divToPrint').clientWidth;

                console.log("clientWidth: ", clientWidth)
                console.log("clientHeight: ", clientHeight)

                var rect = input.getBoundingClientRect();
                console.log("rect.top: ",rect.top, " rect.left:  " ,rect.left, " rect.right ", rect.right, " rect.bottom " , rect.bottom);
                const pdf = new jsPDF();
                pdf.addImage(dataUrl, 'PNG', 0, 0);
                        // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
                // var img = new Image();
                // img.src = dataUrl;
                // console.log("dataUrl->",dataUrl)
                // document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

        // html2canvas(input , {
        //     width: 1200,
        //     height: 1200,
        //     useCORS: true,
        //     allowTaint:true
        //   })
        //     .then((canvas) => {

        //         const imgData = canvas.toDataURL('image/png');
        //         console.log("imgData->",imgData)
        //         const pdf = new jsPDF();
        //         pdf.addImage(imgData, 'JPEG', 0, 0);
        //         // pdf.output('dataurlnewwindow');
        //         pdf.save("download.pdf");
        //     })
        //     ;
    }

    if (props.display) {
        return <React.Fragment>

            <Button variant="outlined" color="primary" aria-label="text primary button" onClick={printDocument}>Print</Button>

        </React.Fragment>;
    }
    return <React.Fragment></React.Fragment>
}



// const printDocument = () => {
//     const input = document.getElementById('divToPrint');

//     html2canvas(input)
//         .then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'JPEG', 0, 0);
//             // pdf.output('dataurlnewwindow');
//             pdf.save("download.pdf");
//         })
//         ;
// }

// export const GeneratePDF = React.forwardRef((props, ref) => {
//     const options = {
//         unit: 'in',
//         format: [12, 13]
//     };
//     if (props.display) {
//         return <React.Fragment>
//             <Pdf targetRef={ref} filename="PDF Generator.pdf" style={{display: "visible"}} options={options} x={-0.1} y={-0.1} >
//                 {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
//             </Pdf>
//         </React.Fragment>;
//     }
//     return <React.Fragment></React.Fragment>

// })

