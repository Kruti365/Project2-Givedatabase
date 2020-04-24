$(document).ready(function () {
    GetProvince();
    $("#btnSignUp").click(function () {
        //UserRegistration();
        CheckIfEmailIdExists($("#txtEmail").val());
    });
    $('#txtDob').datepicker({
        format: 'dd-mm-yyyy'
    });

    $("#ddlProvince").change(function(){
        GetCity();
    });
});


function UserRegistration() {
    debugger;
    var jsonData = {
        name : $("#txtName").val(),
        email : $("#txtEmail").val(),
        dob : $("#txtDob").val(),
        address1 : $("#txtAddress1").val(),
        address2 : $("#txtAddress2").val(),
        city : $("#ddlCity").val(),
        province : $("#ddlProvince").val(),
        postalCode : $("#txtPostalCode").val(),
        password : $("#txtPassword").val()
    }
    $.ajax({
        url: '/UserRegistration',
        type: 'GET',
        dataType: 'text',
        data: jsonData,
        success: function (data) {
            
            console.log("Success");
        },
        error: function (err) {
            
        }
    });
}

function CheckIfEmailIdExists(emailId){
    debugger;
    $.ajax({
        url: '/CheckIfEmailIdExists',
        type: 'GET',
        dataType: 'text',
        data: {EmailId : emailId},
        success: function (data) {
            debugger;
            var jsonData = JSON.parse(data);
            if(jsonData.length > 0){
                alert("Email Id already exists in database");
            }
            else{
                UserRegistration();
            }
        },
        error: function (err) {
            
        }
    });
}

function GetProvince() {
    $.ajax({
        url: '/GetProvince',
        type: 'GET',
        dataType: 'text',
        success: function (data) {
            
            var parsedData = JSON.parse(data);
            for(var i=0; i < parsedData.length; i++){
                $("#ddlProvince").append("<option value='"+ parsedData[i].ProvinceId + "'>" + parsedData[i].ProvinceName +"</option>");
            }
            GetCity();
        },
        error: function (err) {
            
        }
    });
}

function GetCity() {
    $("#ddlCity").empty();
    $.ajax({
        url: '/GetCity',
        type: 'GET',
        dataType: 'text',
        data: { ProvinceId : $("#ddlProvince").val() },
        success: function (data) {
            
            var parsedData = JSON.parse(data);
            for(var i=0; i < parsedData.length; i++){
                $("#ddlCity").append("<option value='"+ parsedData[i].CityId + "'>" + parsedData[i].CityName +"</option>");
            }
        },
        error: function (err) {
            
        }
    });
}