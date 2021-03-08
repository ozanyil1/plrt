if (window.File && window.FileReader && window.FileList && window.Blob) {
    
} else {
  alert('The File APIs are not fully supported in this browser.');
}

const dealinput = document.getElementById('dealinput');

const hesapla = document.getElementById('hesapla')
hesapla.onclick = function(){
    
    const reader = new FileReader();
    reader.onload = function(){ 
        //var string = new TextDecoder().decode(reader.result);
        //console.log(string)
        console.log(reader.result)
        
        let table = {}
        const lines = reader.result.split("\n");
        lines.shift();
        lines.shift();
        lines.pop();
        lines.pop();

        
        

        for(i=0;i<lines.length;i++) {
            let lineelement = lines[0];
            lineelement = lineelement.split("	");
            lineelement.pop();
            lineelement.pop();
            lineelement.pop();
            lineelement.pop();
            lineelement.splice(13,1);
            lineelement.splice(12,1);
            lineelement.splice(11,1);
            lineelement.splice(7,1);
            lineelement.splice(4,1);
            lineelement.splice(1,1);
            lineelement.splice(8,1,lineelement[8].replace(" ",""))
            lineelement.splice(9,1,lineelement[9].replace(" ",""))

            
            
            if (table[lineelement[2]] === undefined) {table[lineelement[2]] = {Login:lineelement[2],Markupkar:0,Swapkar:0,Komisyonkar:0}}
            table[lineelement[2]]["Swapkar"] = Math.round((table[lineelement[2]]["Swapkar"] + (lineelement[9] * -1)) * 100) / 100
            table[lineelement[2]]["Komisyonkar"] = Math.round((table[lineelement[2]]["Komisyonkar"] + (lineelement[8] * -1)) * 100) / 100
            lines.shift();
            lines.push(lineelement);
        }



        

        for (i=0;i<Object.keys(table).length;i++){
            let tablerow = document.createElement("tr");
            
            let th1 = document.createElement("th")
            th1.innerHTML = table[Object.keys(table)[i]]["Login"];
            tablerow.appendChild(th1)

            let th2 = document.createElement("th")
            th2.innerHTML = table[Object.keys(table)[i]]["Swapkar"] + "$";
            tablerow.appendChild(th2)

            let th3 = document.createElement("th")
            th3.innerHTML = table[Object.keys(table)[i]]["Komisyonkar"] + "$";
            tablerow.appendChild(th3)

            let th4 = document.createElement("th")
            th4.innerHTML = table[Object.keys(table)[i]]["MarkupKar"] + "$";
            tablerow.appendChild(th4)


            
            document.getElementById("ozettable").appendChild(tablerow)
        }

        
        
    }

    reader.addEventListener('progress',(eve) => {
        if(eve.loaded && eve.total) {
            const percent = (eve.loaded / eve.total)*100;
            console.log('Progress:' + Math.round(percent))
        }
    })

    let blob = dealinput.files[0]
    reader.readAsText(blob);
        
}