$(document).ready(function(){
    $("#btnDonate").click(function(){
        CheckSession();
    })
});

function PayAmount(curr){
    $(".btnPay").attr("title","0");
    $(curr).attr("title","1");
}

function DonateNow(){
    var amount = "";
    var txtAmt = $("#txtAmount").val();

    if(txtAmt == ""){
        $('.btnPay').each(function(i, obj) {
            var isActive = $(obj).attr("title");
            if(isActive == "1"){
                amount = $(obj).text().replace("$",""); 
            }
        });
    }
    else{
        amount = txtAmt;
    }
    window.location.href = "/payment?amount="+amount;
}

function CheckSession(){
    $.ajax({
        url: '/CheckSession',
        type: 'GET',
        dataType: 'text',
        success: function (data) {
            if(data == "failed"){
                window.location.href = "/login";
            }
            else{
                DonateNow();
            }
        },
        error: function (err) {

            debugger;
        }
    });
}