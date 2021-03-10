if (window.File && window.FileReader && window.FileList && window.Blob) {
    
} else {
  alert('The File APIs are not fully supported in this browser.');
}

const dealinput = document.getElementById('dealinput');
const agentinput = document.getElementById('agentinput');

const hesapla = document.getElementById('hesapla')
hesapla.onclick = async function(){
    
    let deals = []
    let table = {}

    const reader = await new FileReader();
    
    reader.onload = await function(){ 
        //var string = new TextDecoder().decode(reader.result);
        
        
        
        
        deals = reader.result.split("\n");
        deals.shift();
        deals.shift();
        deals.pop();
        deals.pop();

        
        

        for(i=0;i<deals.length;i++) {
            let lineelement = deals[0];
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

            
            
            if (table[lineelement[2]] === undefined) {table[lineelement[2]] = {Login:parseInt(lineelement[2]),Markupkar:0,Swapkar:0,Komisyonkar:0,AgentKom:0}}
            table[lineelement[2]]["Swapkar"] = Math.round((table[lineelement[2]]["Swapkar"] + (lineelement[9] * -1)) * 100) / 100
            table[lineelement[2]]["Komisyonkar"] = Math.round((table[lineelement[2]]["Komisyonkar"] + (lineelement[8] * -1)) * 100) / 100
            deals.shift();
            deals.push(lineelement);
        }


        
        

        console.log("deal okuma bitti")
        
    }

    

    
    await reader.readAsText(dealinput.files[0]);

    const reader2 = new FileReader();
    reader2.onload = await function() {
        let agents = reader2.result.split("\n");
        
        agents.shift();
        agents.shift();
        agents.pop();
        agents.pop();


        for(i=0;i<agents.length;i++) {
            let lineelement = agents[0];
            
            lineelement = lineelement.split("	");
            lineelement.pop();
            lineelement.shift();
            lineelement.shift();
            lineelement.shift();
            lineelement.shift();
            lineelement.shift();
            lineelement.push(lineelement[0].split("#")[1]);
            lineelement.push(parseFloat(lineelement[0].split("#")[0].split("'")[1]));
            lineelement.shift();
            
            agents.shift();
            agents.push(lineelement);

            if (table[lineelement[2]] === undefined) {table[lineelement[2]] = {Login:parseInt(lineelement[2]),Markupkar:0,Swapkar:0,Komisyonkar:0,AgentKom:0}}
            table[lineelement[2]]["AgentKom"] = Math.round((table[lineelement[2]]["AgentKom"] + parseFloat(lineelement[0])) * 100) / 100

        }
        console.log("agents okuma bitti")
        for (i=0;i<Object.keys(table).length;i++){
            let tablerow = document.createElement("tr");
            
            let td1 = document.createElement("td")
            td1.innerHTML = table[Object.keys(table)[i]]["Login"];
            tablerow.appendChild(td1)
    
            let td2 = document.createElement("td")
            td2.innerHTML = table[Object.keys(table)[i]]["Swapkar"] + "$";
            tablerow.appendChild(td2)
    
            let td3 = document.createElement("td")
            td3.innerHTML = table[Object.keys(table)[i]]["Komisyonkar"] + "$";
            tablerow.appendChild(td3)
    
            let td4 = document.createElement("td")
            td4.innerHTML = " ";
            tablerow.appendChild(td4)
    
            let td5 = document.createElement("td")
            td5.innerHTML = table[Object.keys(table)[i]]["AgentKom"] + "$";
            tablerow.appendChild(td5)
            
            document.getElementById("ozettable").appendChild(tablerow)
        }

    }
    let blob2 = agentinput.files[0]
    await reader2.readAsText(blob2);

    

    await console.log("tablo oluşturma bitti")

    



        
}