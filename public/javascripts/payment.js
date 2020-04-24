
var amt = 0;
    $('input[type="checkbox"]').on('click',function(){
        var selected = $(this).parent().parent().parent();
        $(selected).toggleClass('highlight');
    });

    $(document).ready(function(){
        amt = GetParameterValues("amount");
        $(".spnAmt").text(amt);

        $("#btnNext").click(function(){
            DonateNow();
        });
    })

    function GetParameterValues(param) {
       var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }

    function DonateNow(){
            debugger;
        $.ajax({
            url: '/DonateNow',
            type: 'GET',
            dataType: 'text',
            data: {Amount : amt},
            success: function (data) {
                if(data == "failed"){
                    window.location.href = "/login";
                }
                else{
                    window.location.href = "/home";
                }
            },
            error: function (err) {

                debugger;
            }
        });
    }