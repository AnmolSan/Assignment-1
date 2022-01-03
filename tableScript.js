//code to return list of country from api------------------------------

window.addEventListener('load', () => {
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
        $("#country").chosen({
            no_results_text: "Oops, nothing found!"
            ,width:"auto"
            
            })
        
}).catch(err => {
        console.log(err);
    })
    
});
document.getElementById('country').addEventListener('focusin', () => {
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
        $("#country").chosen({
            no_results_text: "Oops, nothing found!"
            ,width:"auto"
            
            })
        
}).catch(err => {
        console.log(err);
    })
    
});

//code to return list of state on the selected country-----------------
document.getElementById('state').addEventListener('focusin',() => {
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
document.getElementById('state').innerHTML = output  ;
$("#state").chosen({
    no_results_text: "Oops, nothing found!"
    ,width:"auto"
    })
})

.catch((error) => {
  console.error('Error:', error);
});

})

//code to return list of city on the selected city---------------------
document.getElementById('city').addEventListener('focusin',() => {
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
let stat = data.data;
let output ="";
let raw=[];
for (let i in stat) {
    raw.push(stat[i])
}
raw.forEach(count => {
    
    output += `<option>${count}</option>`;
})
document.getElementById('city').innerHTML = output;
$("#city").chosen({
    no_results_text: "Oops, nothing found!"
    ,width:"auto"
    })

})

.catch((error) => {
  console.error('Error:', error);
});
})

document.getElementById('Age').addEventListener('focusin', () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById('Age').setAttribute('max',today);
})


var ID = 0; //  serializing by addind incremental function to a new row in DataTable  

function validate(){
    isValid = true;
    var emptyName=document.getElementById('name').value==''
    var FalseRadio=document.getElementById('male').checked == false && document.getElementById('female').checked ==false
    var emptyCountry=document.getElementById('country').value==''
    var emptyState=document.getElementById('state').value==''
    if((emptyName)||(FalseRadio)||(emptyCountry)||(emptyState)){
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
function readFormData()
{
    var male = document.querySelector(".male");
    var female = document.querySelector(".female");
    
    var formData = {};
    formData["ID"] = window.ID
    formData["Name"] = document.getElementById("name").value;
    if(male.checked==true){
        formData["Gender"] = "Male";
        
    }
    else if(female.checked==true){
        formData["Gender"] = "Female";
    }
    if(document.getElementById("Age").value=='')
    {
        formData["DOB"] = "NA"
    }
    else{
        formData["DOB"] = document.getElementById("Age").value;
    }
    formData["Working Days"] = multiDaysSelect();

    formData["Country"] = document.getElementById("country").value;
    formData["State"] = document.getElementById("state").value;
    formData["City"] = document.getElementById("city").value;
    

    return formData;
}
function onFormSubmit()
{
    
    const dataSet = [];
    
    if(validate()){
        
    window.ID+=1;
    var formData = {};
    formData = readFormData();
    document.getElementById('personList').classList.remove('hide');
    
    
    for (let i in formData) {
        dataSet.push(formData[i])
    }
    console.log("onSubmit",formData);
    
    if ( !$.fn.DataTable.isDataTable( '#personList' ) ) {
        dataTabeInitialization([formData]);
    }
    else{
        dataTableInsertRow(formData);
        // console.log('dataSet',formData)
    }
    resetForm(); 
    }
}
    
    


//data table initialization with editor 
function dataTabeInitialization(dataSet){
    var editor;
    $(document).ready(function() {
        editor = new $.fn.DataTable.Editor( {
            
            table: "#personList",
            idSrc:'ID',
            fields: [ {
                label: "Name",
                name: "Name"
            }, {
                label: "Gender",
                name: "Gender"
            }, {
                label: "DOB",
                name: "DOB",
            }, {
                label: "Working Days",
                name: "Working Days",
            }, {
                label: "Country",
                name: "Country",
            }, {
                label: "State",
                name: "State",
            }, {
                label: "City",
                name: "City",
            }
        ]
        
    } );
    $('personList').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editor.inline( this, {
            submit: 'allIfChanged'
        } );
    } );

    $('#personList').DataTable( {
        dom: "Bfrtip",
        data: dataSet, 
        // "dom": '<"top"i>rt<"bottom"flp><"clear">',   // to get search option below dataTable
        columns: [
            // { title: "Name" },
            // { title: "Gender" },
            // { title: "DOB" },
            // { title: "Country" },
            // { title: "State" },
            // { title: "City" },
            // { title: "" },
            // { title: "" },
            // {
            //     data: null,
            //     defaultContent: '',
            //     className: 'select-checkbox',  // to get check box for visual easy of row selection
            //     orderable: false
            // },
            {  data: "ID" },
            {  data: "Name" },
            {  
                data: "Gender" },
            { 
                data: "DOB" },
            { 
                data: "Working Days" },
            { 
                data: "Country" },
            { 
                data: "State" },
            { 
                data: "City" }
        ],
        // order: [ 1, 'asc' ],
        select: {
            style:    'os',
            selector: 'tr'
        },
            buttons: [
                { extend: "edit",   editor: editor },
                { extend: "remove", editor: editor }
            ]

    } )

    // to change the color of the button if needed -------

    // let table =  $('#personList').DataTable()
    
    // table.button(0).nodes().css('background', 'white');
    // table.button(1).nodes().css('background', 'white');
    //--------------------------------------------------
    
    
   
    } );


 
}
// to have our own select Delete and edit button 
// function rowSelection()
// {
    
//     $(document).ready(function() {
//         if ( $.fn.DataTable.isDataTable( '#personList' ) ){
//         var t = $('#personList').DataTable();
    
//             $('#personList tbody').on('click','tr', function(){
//                 if($(this).hasClass('selected')){
//                     $(this).removeClass('selected');
//                 }
//                 else{
//                     t.$('tr.selected').removeClass('selected');
//                     $(this).addClass('selected');
//                 }
//             });
        
//             $('.delete').click( function () {
//                 t.row('.selected').remove().draw( false );
//                 console.log(t.row('.selected').remove().draw( true ))
//             } );
//             $('.edit').click(function(){
//                 t.row('selected').edit( {
//                     buttons: [
//                         { label: 'Cancel', fn: function () { this.close(); } },
//                         'Edit'
//                     ]
//                 } );
//             });
//         }
    
        
//     });
// }
// to insert a new row to the data table dynamically.
function dataTableInsertRow(dataSet){
    
    $(document).ready(function() {
        var t = $('#personList').DataTable();
        t.row.add(dataSet).draw();
    });
}


// to Reset form field 
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
    
    $('.chosen-select option').prop('selected', false).trigger('chosen:updated');
    // $('#country').chosen('destroy');
    $('#state').chosen('destroy');
    $('#city').chosen('destroy');
        
}
var expanded = false;

function chosenInit(){
    $(".chosen-select").chosen({
        no_results_text: "Oops, nothing found!",
        max_selected_options: 5,
        allow_single_deselect: false
    })

    $(".chosen-select").bind("chosen:maxselected", function () { 
        alert("5 Days maximum"
        )}); 

}
chosenInit()


// to get the input from Days multiSelect 
function multiDaysSelect(){
    let searchChoice =[];
    $(".search-choice").each(function() {
        $(this).children("span").each(function() {
            searchChoice.push(this.innerHTML);
        });
      });
      console.log('sear', searchChoice)
      return searchChoice;
}

//load image 
$(window).on('load', function () {
    $('#loading').hide();
  })

