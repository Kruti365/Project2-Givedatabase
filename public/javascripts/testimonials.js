$(document).ready(function(){

    $("#btnEnablePickup").click(function(){
        EnablePickUp();
    });
});

function EnablePickUp(){
    debugger;
    var date = $("#txtDop").val();
    var time = $("#ddlTime").val();
    var isEnable = $("#chkEnable").prop("checked") == true ? "1" : "0";
    $.ajax({
        url: '/EnablePickup',
        type: 'GET',
        dataType: 'text',
        data: {PickupDate : date,PickupTime : time, IsEnable : isEnable},
        success: function (data) {
            debugger;
            if(data == 'success'){

                window.location.href = '/tokenpage'
            }
            else{
                alert('Something went wrong');
            }
        },
        error: function (err) {
            debugger;
        }
    });
}
