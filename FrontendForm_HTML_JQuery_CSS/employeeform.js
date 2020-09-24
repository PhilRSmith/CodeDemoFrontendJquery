$(document).ready(function(){
    var inputState=''; //declared for input listener
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
        /*var inputState handled in .on function for input of state*/
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
            $.ajax({
                type: "POST", 
                url: "notreal.com/api/employee",
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
                    $('#returnmessage').append(JSON.stringify(res)); //displays green message with server success response
                    console.log(status);
                },
                error: function (error, status){
                    $('#errormessage').append(JSON.stringify(error)); //displays red message with server error response
                    console.log(error);
                    console.log(status);
                }
            })
        }
    })
})


