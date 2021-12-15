document.addEventListener('DOMContentLoaded', () => {
    const selectDrop = document.querySelector('#city');


    fetch('https://countriesnow.space/api/v0.1/countries').then(res =>{
        return res.json();
    }).then(rawData => {
        let output = "";
        let raw = rawData.data[97].cities;
        raw.forEach(cities => {
            output += `<option>${cities}</option>`;
        })
        selectDrop.innerHTML = output
    }).catch(err => {
        console.log(err);
    })
});
let temp = [];
function handleSubmit(event) 
{
    event.preventDefault();

    const data = new FormData(event.target);

    const Person = Object.fromEntries(data.entries());

    console.log(Person);
    temp.push(Person)
    
    var col =[];
    for (let i = 0; i < temp.length; i++) {
        for(var key in temp[i]){
            if (col.indexOf(key)=== -1){
                col.push(key);
            }
        }
            
    }
    // Create dynamic table
    var table = document.createElement("table");

    var tr = table.insertRow(-1);       //Table Row.

    for (let i = 0; i < col.length; i++) {
        var th = document.createElement("th");   //Table Header
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //Add json data to the table as rows.

    for (var i = 0; i < temp.length; i++) 
    {
        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {

            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = temp[i][col[j]];
        }
        
    }
    // Adding the newly created table with json data to a container.
    var divContainer = document.querySelector(".resultJsonOutput");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}
 form = document.querySelector('form');
 form.addEventListener('submit', handleSubmit);
