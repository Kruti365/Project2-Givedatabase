$(document).ready(function(){
    $("#btnContactWithUs").click(function(){
        ConnectUsNow();
    });
});

function ConnectUsNow(){
    debugger;
    var name = $("#txtName").val();
    var emailId = $("#txtEmail").val();
    var message = $("#txtMessage").val();
    var subject = $("#txtSubject").val();

    $.ajax({
        url: '/ContactWithUs',
        type: 'GET',
        dataType: 'text',
        data: {name : name , emailId : emailId, message : message, subject : subject},
        success: function(data){
            debugger;
            alert("We will get back to you shortly.")
        },
        error: function(err){
            alert("error occurred");
        }
    })
}