$(document).ready(function(){
    $("#ddlMonth").change(function(){
        FetchMagazineDetails();
    });

    $("#ddlYear").change(function(){
        FetchMagazineDetails();
    });
    FetchMagazineDetails();
})

function FetchMagazineDetails(){


    debugger;
    $("#tblMagazine").empty();
    var year = $("#ddlYear option:selected").text();
    var month = $("#ddlMonth option:selected").text();

    $.ajax({
        url: '/FetchMagazineList',
        type: 'GET',
        dataType: 'text',
        data: {year : year, month : month},
        success: function(data){
            debugger;
            var parsedData = JSON.parse(data);
            var tableRows = "<tr>";
            if(parsedData.length > 0){
                for(var i = 0 ; i<parsedData.length ; i++){
                    tableRows += "<td><a href='"+parsedData[i].PdfPath +"'><img target='_blank' src='" + parsedData[i].ImagePath + "' width='300' height='500'></a></td>"
                }
                tableRows += "</tr>"
                tableRows += "<tr>";
                for(var i = 0 ; i<parsedData.length ; i++){
                    tableRows += "<td><center>"+parsedData[i].MagazineName+"</center></td>"
                }
                tableRows += "</tr>"
                $("#tblMagazine").append(tableRows);
            }
            else{
                tableRows += "<td colspan='3'>No Record Found</td>";
                tableRows += "</tr>";
            }
        },
        error: function(err){
            alert("error occurred");
        }
    })
}