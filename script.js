const workTableBody = document.getElementById("work_table_body");
const textAreaZeus = document.getElementById("zeus_text_area");

function convertToZEB() {
    workTableBody.innerHTML = "";
    let ignoreArray = ["Sa", "So", "---", "Periode", "Datum"];
    let zeusText = textAreaZeus.value;
    let zeusLines = zeusText.split("\n").slice(6, -9);
    let cleanedLines = [];
    lineloop:    
    for(let i in zeusLines) {
        let line = zeusLines[i];
        for (let o in ignoreArray) {
            if (line.includes(ignoreArray[o]) || line.charAt(83) != '.') {
                continue lineloop;
            }
        }
        cleanedLines.push(line);
    }
    for (let i in cleanedLines) {
        let line = cleanedLines[i]+"";
        let date = line.slice(3, 5);
        let time = line.slice(81, 86);
        let hours = parseInt(time.slice(0,-3));
        let minutes = Math.ceil(parseInt(time.slice(3))/6.0)/10.0;
        time = hours+minutes+0.0;
        addTableRow(date, time);
    }
}

function copyMe(element) {
    let copyText = element.lastElementChild.innerText;
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(copyText);
        }
      });
}

function addTableRow(day, value) {
    row = "<tr onclick='copyMe(this)' title='Click2Copy'><td>"+day+".</td><td>"+value+"</td></tr>";
    workTableBody.innerHTML += row;
}