
$(document).ready(function() {
    var id = localStorage.getItem('projectId');
    var idToken = localStorage.getItem('idToken');
    var urlBlocks = 'https://learn.landsoftapis.com/api/Product/DictionaryBlocks?ProjectId=' + id;
    fetch(urlBlocks, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ idToken,
        }
    }).then(function(response){
        if(response.status != 200){
            throw Error(status);
        }
        return response.json();
    }).then(function(data){
        var content = ``;
        data.forEach(element => {
            content += `
            <div class="cardProject card shadow-card my-2 w-50 h-50 mr-2 font-weight-bold">
                <div class="card-body">
                    <h4 class="card-title text-primary">KHU ${element.Name}</h4>
                    <span>Tòa nhà landmark</span>
                </div>
            </div>
            `
        });
       $('#products').html(content);
    })
     //get all by group
    $('#products').on('click', function(){
        var urlAllByGroup = 'https://learn.landsoftapis.com/api/Product/GetAllByGroup?ProjectId='+163 +'&BlockId='+164 + '&Keyword=a' + '&StatusId=0&SortId=0&GroupId=1';
        fetch(urlAllByGroup, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            }
            
        }).then(function(response){
            if(response.status != 200) {
                throw Error(status);
            }
            return response.json();
        }).then(function(response){
            var data = response.Data[0].Items;
            var floor = response.Data[0].GroupName;
            
            var content =`<div class="col-lg-12 col-md-12 col-12 font-weight-bold text-gray-800">${floor}</div><br/>`;
            var countRoom = ``;
            var countStatus1 = 0;
            var countStatus2 = 0;
            var countStatus3 = 0;
            var countStatus4 = 0;
            var countStatus5 = 0;
            var countStatus6 = 0;
            data.forEach(element => {
                switch(element.StatusColor) {
                    case "#9329f7":
                        countStatus1++;
                      break;
                    case "#87CEEB":
                        countStatus2++;
                      break;
                    case "#FF0000":
                        countStatus3++;
                        break;
                    case "#FFFF00":
                        countStatus4++;
                        break;
                    case "#FFC0FF":
                        countStatus5++;
                        break;
                    case "#00FF00":
                        countStatus6++;
                        break;
                    default:
                        break;
                     
                  };
               
                content += `
                <div id="${element.Id}" class="col-lg-1 col-md-2 col-3 m-1" style="background-color:${element.StatusColor}; color:${element.TextColor};font-size:0.8em" role="button" data-toggle="modal" data-target="#infoRoom">
                    <span class="font-weight-bold">${element.Code}</span><br>
                    <span>${element.Area} m²</span><br>
                   <span>${element.Total}</span>
                </div>
                `
            })
            countRoom = `
                <div class="p-1 m-3 text-gray-900" style="background-color: #9329f7;"><span>Khóa (${countStatus1})</span></div>
                <div class="p-1 m-3 text-gray-900 " style="background-color: #87CEEB;"><span>Mở bán (${countStatus2})</span></div>
                <div class="p-1 m-3 text-gray-900 " style="background-color:#FF0000;"><span>Giữ chỗ (${countStatus3})</span></div>
                <div class="p-1 m-3 text-gray-900 " style="background-color: #FFFF00;"><span>Đặt cọc (${countStatus4})</span></div>
                <div class="p-1 m-3 text-gray-900 " style="background-color: #FFC0FF;"><span>Góp vốn (${countStatus5})</span></div>
                <div class="p-1 m-3 text-gray-900 " style="background-color: #00FF00;"><span>Mua bán (${countStatus6})</span></div>
            `
            $("#countRooms").html(countRoom);
            $('#allRooms').html(content);

            
        }).catch(function(err){
            console.log(err);
        })
    
    })
    //detail information room
   
   $('#allRooms').delegate('div','click', function(){
    var id = $(this).attr('id');
    var urlGetDetailRoom = "https://learn.landsoftapis.com/api/Product/Get?Id="+id;
    fetch(urlGetDetailRoom, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + idToken
        }
    }).then(function(response){
        if(response.status != 200) {
            throw Error(response.status)
        }
        return response.json();
    }).then(function(data){
        var detailContent = ``;
            detailContent += `
            <div>-Mã sản phẩm: ${data.Id}</div><br>
            <div>-Trạng thái: ${data.Status}</div><br>
            <div>-Diện tích xây dựng: ${data.AreaLand} m² </div><br>
            <div>-Dự án: ${data.ProjectName}</div><br>
            <div>-Khu: ${data.ZoneName}</div><br>
            `
        $('#detailRoom').html(detailContent);
        $("#info").on('click', function(){
            $("#payMents").removeClass("border-hover");
            $("#info").addClass("border-hover");
            $('#detailRoom').html(detailContent);
        })
        $('#payMents').on('click', function(){
            $(this).addClass("border-hover");
            $("#info").removeClass("border-hover");
            var listPay = data.Payments;
            var payment = `<h4>Thông tin thanh toán</h4>`;
            for(var i=0 ; i<listPay.length; i++){
                payment += `
                   <div class="d-flex text-gray-800">
                        <div class="m-3">Đợt: ${listPay[i].Stage}</div><br>
                        <div class="m-3">${listPay[i].Percentage}%</div><br>
                        <div class="m-3">Số tiền: ${listPay[i].Total}</div><br>
                   </div>
                `;
            }
            $('#detailRoom').html(payment);
        })
        
        
    }).catch(function(err){
        console.log(err);
    })
   
   })
})