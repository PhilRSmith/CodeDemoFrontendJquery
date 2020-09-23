$(document).ready(function(){
    var inputState='';
    /*InputMask Library functions by Josh Bush */
    var phoneMasks = [{ "mask": "(###) ###-####"}, { "mask": "(###) ###-##############"}]; 
    var zipcodeMask = [{"mask" : "#####"}];
    $('#phoneNumber').inputmask({ 
        mask: phoneMasks, 
        greedy: false, 
        definitions: { '#': { validator: "[0-9]", cardinality: 1}}
    });
    $('#zipCode').inputmask({ 
        mask: zipcodeMask, 
        greedy: false, 
        definitions: { '#': { validator: "[0-9]", cardinality: 1}}
    });

    /*grab combo box value on change*/
    $('input[name = "state"]').on('input' , function(e){ 
        inputState = $(this).val();
    })

    /*On clicking submit, send post req to server with form information, then return server success/error msg*/
    $("#submit").click(function(){
        var inputEmpName = $('#employeeName').val();
        var inputEmpNumber = $('#employeeNumber').val();
        var inputPhoneNumber = $('#phoneNumber').val();
        /*var inputState = $('#state').val(); //Handled in .on function for input of state*/
        var inputZipCode = $('#zipCode').val();
        var inputStreetAddress = $('#address').val(); 
        var inputCity = $('#city').val();
        var isEmployee = $('#isEmployee').is(':checked');

        $("#returnmessage").empty(); //clear server response messages
        $("#errormessage").empty();
        if(inputEmpName=='' || inputEmpNumber =='' || inputPhoneNumber =='' || inputState=='' 
        ||inputZipCode==''||inputStreetAddress==''||inputCity==''){
            $('#errormessage').append('Please enter your information for all fields before submitting');
        }
        else {
            //$('#returnmessage').append(inputEmpName + ' | ' ,inputEmpNumber + ' | ' , inputPhoneNumber + ' | ' ,inputState + ' | ' ,inputZipCode + ' | ' ,inputStreetAddress + ' | ' ,inputCity + ' | ' ,isEmployee)
            $.ajax({
                type: "GET",
                url: "notreal.com/employee-information/",
                data: JSON.stringify({
                    'employeeName' : inputEmpName , 
                    'employeeNumber' : inputEmpNumber ,
                    'phone' : inputPhoneNumber,
                    'zipCode' : inputZipCode,
                    'state' : inputState,
                    'address' : inputStreetAddress,
                    'city' : inputCity,
                    'isEmployee' : isEmployee
                }),
                dataType: "json",
                success: function(res, status){
                    $('#returnmessage').append(JSON.stringify(res));
                    console.log(status);
                },
                error: function (error, status){
                    $('#errormessage').append(JSON.stringify(error));
                    console.log(error);
                    console.log(status);
                }
            })
        }
    })
})


