document.addEventListener('DOMContentLoaded', () => {
    const selectDrop = document.querySelector('#city'); //Add select id or class here 


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
function myRadio(Gender){
    var value = Gender;
    return value; 
}
var selectedR = null;
function onFormSubmit()
{
    
    if(validate()){
    var formData = {}
    formData = readFormData();
    console.log(formData);
    if(selectedR == null){
        insertNewRecord(formData);
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
    
    formData["City"] = document.getElementById("city").value;
    console.log(formData["Name"] = document.getElementById("name").value);
    console.log(myRadio());

    return formData;
}
function insertNewRecord(data)
{
    var table = document.getElementById("personList").getElementsByTagName("tbody")[0];
    var dat = Object.values(data);
    var tr = table.insertRow(-1);
    
    
    for (let i = 0; i < dat.length; i++) {
        var tabCell = tr.insertCell(i)
        tabCell.innerHTML = dat[i];
        
    }
    var tabCell = tr.insertCell(4)
    tabCell.innerHTML = `<a onClick="onEdit(this);">Edit</a>
                                <a onClick="onDelete(this);">Delete</a>`;    
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