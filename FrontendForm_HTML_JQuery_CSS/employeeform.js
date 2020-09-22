$(document).ready (function(){
    $("#submit").click(function(){
        var empName = $('#employeeName').val();
        var empNumber = $('#employeeNumber').val();
        var phoneNumber = $('#phoneNumber').val();
        $("#returnmessage").empty(); //clear server response message
        $("#returnmessage").append(empName + " : " , empNumber + " : ", phoneNumber); /*Just a test of input fields*/
        $.ajax({
            type: "POST",
            url: "fictitious ",
            data: {
                employeeName : empName , 
                employeeNumber : empNumber ,
                phone : phoneNumber
            },
            dataType: "json"
        },function(res){
            /*On success, returns a success message into #returnmessage from the server, since server doesn't exist, this won't happen*/
            $("#returnmessage").append(res);
        }
        )
    })
})


