
 
// document.addEventListener('DOMContentLoaded', () => {
//     const selectCity = document.querySelector('#city');//Add select id or class here 


//     fetch('https://countriesnow.space/api/v0.1/countries').then(res =>{
//         return res.json();
//     }).then(rawData => {
//         console.log(rawData);
//         let output = "";
//         let raw = rawData.data[97].cities;
//         raw.forEach(cities => {
//             output += `<option>${cities}</option>`;
//         })
//         selectCity.innerHTML = output
// }).catch(err => {
//         console.log(err);
//     })
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const selectState = document.querySelector('#state'); //Add select id or class here 


//     fetch('https://countriesnow.space/api/v0.1/countries').then(res =>{
//         return res.json();
//     }).then(rawData => {
//         console.log(rawData);
//         let output = "";
//         let raw = rawData.data[97].cities;
//         raw.forEach(cities => {
//             output += `<option>${cities}</option>`;
//         })
//         selectState.innerHTML = output
// }).catch(err => {
//         console.log(err);
//     })
// });

document.getElementById('country').addEventListener('focus', () => {
    const selectCountry = document.querySelector('#country'); //Add select id or class here 


    fetch('https://countriesnow.space/api/v0.1/countries').then(res =>{
        return res.json();
    }).then(rawData => {
        let output = "";
        let raw=[]
        for (let i in rawData.data) {
            raw.push(rawData.data[i].country)
        }
        raw.forEach(count => {
            output += `<option>${count}</option>`;
        })
        selectCountry.innerHTML = output
        
}).catch(err => {
        console.log(err);
    })
    
});
//state list generation----------------------------------------------
document.getElementById('state').addEventListener('focus',() => {
    document.querySelector("#country");
    let selectedCountry = {};
    selectedCountry["country"] = readFormData().Country;


fetch('https://countriesnow.space/api/v0.1/countries/states', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(selectedCountry),
})
.then(response => response.json())
.then(data => {
let stat = data.data.states;
let output ="";
let raw=[];
for (let i in stat) {
    raw.push(stat[i].name)
}
raw.forEach(count => {
    
    output += `<option>${count}</option>`;
})
document.getElementById('state').innerHTML = output  
statesLoadStatus = true;
})
.catch((error) => {
  console.error('Error:', error);
});

})
//City list generation-------------------------------------------
document.getElementById('city').addEventListener('focus',() => {
    document.querySelector("#state");
    let postInput = {};
    postInput["country"] = readFormData().Country;
    postInput["state"] = readFormData().State;


fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postInput),
})
.then(response => response.json())
.then(data => {
// console.log('Success:', data.data.states);
console.log('city:', data);
let stat = data.data;
let output ="";
let raw=[];
for (let i in stat) {
    raw.push(stat[i])
}
raw.forEach(count => {
    
    output += `<option>${count}</option>`;
})
document.getElementById('city').innerHTML = output  

})
.catch((error) => {
  console.error('Error:', error);
});
})

var dataSet = [];
var selectedR = null;
function onFormSubmit()
{
    
    if(validate()){
    var formData = {}
    formData = readFormData();
    
    
    if(selectedR == null){
        let j =[];
        for (let i in formData) {
            j.push(formData[i])
        }
        dataSet.push(j)
        console.log("onSubmit",dataSet);
        dataTabeInitialization(dataSet);
    }
        
    else{
        updateList(formData);
    }
    resetForm(); 
    }     
}

function readFormData()
{
    var male = document.querySelector(".male");
    var female = document.querySelector(".female");
    
    var formData = {};
    formData["Name"] = document.getElementById("name").value;
    if(male.checked==true){
        formData["Gender"] = "Male";
        
    }
    else if(female.checked==true){
        formData["Gender"] = "Female";
    }
    if(document.getElementById("Age").value=='')
    {
        formData["Age"] = "NA"
    }
    else{
        formData["Age"] = document.getElementById("Age").value;
    }
    
    formData["Country"] = document.getElementById("country").value;
    formData["State"] = document.getElementById("state").value;
    formData["City"] = document.getElementById("city").value;
    console.log(formData["Name"] = document.getElementById("name").value);

    return formData;
}
function dataTabeInitialization(dataSet)
{
//     var table = document.getElementById("personList").getElementsByTagName("tbody")[0];
//     var dat = Object.values(data);
//     var tr = table.insertRow(-1);
    
    
//     for (let i = 0; i < dat.length; i++) {
//         var tabCell = tr.insertCell(i)
//         tabCell.innerHTML = dat[i];
        
//     }
//     var tabCell = tr.insertCell(4)
//     tabCell.innerHTML = `<a onClick="onEdit(this);">Edit</a>
//                                 <a onClick="onDelete(this);">Delete</a>`;

    $(document).ready(function() {
        $('#personList').DataTable( {
            data: dataSet, 
            columns: [
             { title: "Name" },
             { title: "Gender" },
             { title: "DOB" },
             { title: "Country" },
             { title: "State" },
             { title: "City" }
         ] 
         } );
        // document.getElementById('table').classList.remove("hide")
        // if( !$.fn.DataTable.isDataTable('#personList')){
            
        // } 
        // else{
        //     $('#personList').DataTable( {
        //         paging:false
        //  } );
        // }
        
    } );
 }
function validateDataTable(){
    var isDataTabe = true;

    
}
function resetForm()
{
    document.getElementById("name").value = '';
        var male = document.querySelector('.male');
        var female = document.querySelector('.female');
        male.checked = false;
        female.checked = false;
    document.getElementById("Age").value = ''; 
    document.getElementById("city").value = '';
    document.getElementById("state").value = '';
    document.getElementById("country").value = '';
    
    
    selectedR = null;
}

function onEdit(td)
{
    selectedR = td.parentElement.parentElement;
    var gend = selectedR.cells[1].innerHTML;
    document.getElementById("name").value = selectedR.cells[0].innerHTML;
    if(gend == "Male"){
        document.querySelector(".male").checked = true;
    }
    else{
        document.querySelector(".female").checked = true;
    }    
    document.getElementById("Age").value = selectedR.cells[2].innerHTML; 
    document.getElementById("city").value = selectedR.cells[3].innerHTML; 
    console.log(selectedR);
}
function updateList(formData)
{
    console.log(selectedR);
    selectedR.cells[0].innerHTML = formData.Name;
    selectedR.cells[1].innerHTML = formData.Gender;
    selectedR.cells[2].innerHTML = formData.Age;
    selectedR.cells[3].innerHTML = formData.City;
    console.log(formData.Gender);
}
function onDelete(td)
{
    if(confirm("Are you sure to delete this record ?")){
        row = td.parentElement.parentElement;
        document.getElementById("personList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate(){
    isValid = true;
    var emptyName=document.getElementById('name').value==''
    var FalseRadio=document.getElementById('male').checked == false && document.getElementById('female').checked ==false
    var emptyCity=document.getElementById('city').value==''

    console.log(emptyName);
    console.log(FalseRadio);
    console.log(emptyCity);
    if((emptyName)||(FalseRadio)||(emptyCity)){
        isValid = false;
        document.getElementById('allValidationError').classList.remove("hide");
    }
   else{
    isValid= true;
    if(!document.getElementById('allValidationError').classList.contains('hide')){
    document.getElementById('allValidationError').classList.add('hide');
    }
    
    }
    return isValid;
}

document.getElementById('Age').addEventListener('focusin', () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById('Age').setAttribute('max',today);
})



