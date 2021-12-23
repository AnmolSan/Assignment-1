var editor; // use a global for the submit and return data rendering in the examples
 var dataSet = { ID: 1, Name: "Anmol", Gender: "Male", DOB: "2021-12-07", Country: "India", State: "Maharashtra", City: "Pune" }
$(document).ready(function() {
    editor = new $.fn.DataTable.Editor( {
        
        table: "#personList",
        fields: [ {
            label: "firstName",
            name: "firstName"
        }, {
            label: "LastName",
            name: "lastName"
        }, {
            label: "Gender",
            name: "Gender"
        }, {
            label: "DOB",
            name: "DOB",
            type:"datetime"
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
 
    $('personList').DataTable( {
        dom: "Bfrtip",
        data: dataSet,
        columns: [
            {
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            {  data: "ID" },
            {  data: "Name" },
            {  
                data: "Gender" },
            { 
                data: "DOB" },
            { 
                data: "Country" },
            { 
                data: "State" },
            { 
                data: "City" }
        ],
        order: [ 1, 'asc' ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    } );
} );