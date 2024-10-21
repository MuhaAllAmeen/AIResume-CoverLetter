'use client'
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

const CoverLetter=()=>{

    const doc = new jsPDF()
    const content = typeof window !== 'undefined' ? localStorage.getItem("cover_letter") : ""
    async function onDownload(){
        let strippedContent = new DOMParser().parseFromString(content!, 'text/html').body.textContent
        var splitTitle = doc.splitTextToSize(strippedContent!, 270);
        var pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(11);
        doc.setFillColor(84, 183, 240)
        doc.lines([[25,0],[-25,25]],0,0,[1.0,1.0],'F')
        doc.lines([[255,pageHeight],[-255,pageHeight]],0,pageHeight-25,[1.0,1.0],'F')
        var y = 25;
        for (var i = 0; i < splitTitle.length; i++) {                
            if (y > 280) {
                y = 28;
                doc.addPage();
            }
            doc.text(splitTitle[i],15, y );
            y = y + 7;
        }
        // await doc.html(`<div style="font-size:12px"> ${content!}</div>`,{callback: function (doc) {
        //     return doc;
        //   },
        //   width: 550,
        //   windowWidth: 550, 
        //       html2canvas: {
        //           letterRendering: true
        //       },
        //   x: 20,
        //   y: 20,
        //   autoPaging: "text"})
        
        doc.output("dataurlnewwindow")
    }
    return(
        <>
        <div className="flex flex-col ml-12 mt-12 gap-2 mb-10">
        <h2 className="ml-24 mt-10 text-2xl font-bold">Your Cover Letter</h2>
        <div className="flex justify-around ">
            
            <div id="letter" className=" p-10 rounded-sm bg-yellow-100 w-[1000px]" dangerouslySetInnerHTML={{__html: content!}} />
            <div className=" self-center">
                <div className="flex flex-col items-center">
                    <button className="bg-black text-white px-5 py-2 rounded-md" onClick={onDownload}>Download</button>    
                    <label className="text-gray-500 text-sm" htmlFor="">as PDF</label>
                </div>
                
            </div>
        </div>
        </div>
        
        {/* {content} */}
        </>
    )
}

export default CoverLetter