$(document).ready(function(){
    
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

    /*On clicking submit, send post req to server with form information, then return server success/error msg*/
    $("#submit").click(function(){
        var inputEmpName = $('#employeeName').val();
        var inputEmpNumber = $('#employeeNumber').val();
        var inputPhoneNumber = $('#phoneNumber').val();
        var inputState = $('#state').val();
        var inputZipCode = $('#zipCode').val();
        var inputStreetAddress = $('#address').val(); 
        var inputCity = $('#city').val();
        var isEmployee = $('#isEmployee').is(':checked')
        $("#returnmessage").empty(); //clear server response message
        $("#returnmessage").append(inputEmpName + " : " , inputEmpNumber + " : ", inputPhoneNumber); /*Just a test of input fields*/
        $.ajax({
            type: "POST",
            url: "https://fictitious.notreal",
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
            success: function(data, status){
                $('#returnmessage').append(JSON.stringify(data));
                console.log(status);
            },
            error: function (error, status){
                console.log(error);
                console.log(status);
            }
        })
    })
})


