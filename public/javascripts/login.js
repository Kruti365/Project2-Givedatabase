$(document).ready(function(){

    $("#btnLogin").click(function(){
        LoginUsers();
    });
});

function LoginUsers(){
    var userName = $("#txtUsername").val();
    var password = $("#txtPassword").val();

    $.ajax({
        url: '/LoginUsers',
        type: 'GET',
        dataType: 'text',
        data: {UserName : userName , Password : password},
        success: function(data){
            debugger;
            var jsonData = JSON.parse(data);
            if(jsonData.length > 0){
                window.location.href ="/index";
            }
            else{
                alert("Invalid Credentials");
            }
        },
        error: function(err){

        }
    })
}