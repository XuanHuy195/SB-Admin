
$(document).ready(function() {
    var id = localStorage.getItem('projectId');
    var idToken = localStorage.getItem('idToken');
    var urlBlocks = 'https://learn.landsoftapis.com/api/Product/DictionaryBlocks?ProjectId=' + id;
    // cái này đang bị dở hơi nên chưa làm tiếp
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
        console.log(data);
        var content = ``;
        data.forEach(element => {
            content += `
            <div class="card img-fluid mr-3 mt-2 card-blocks">
                <img class="card-img-top " src="./assets/img-example/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg" >
                <div class="card-img-overlay text-light bg-img">
                    <h6 class="text-uppercase font-weight-bolder text-spacing">${element.Name}</h6>
                    <p class="card-text text-sm card-text">Artist capital of Europe</p>
                </div>
            </div>
            `
        });
       $('#').html(content);
    })
     //get all by group
    $('.card').on('click', function(){
        var projectId = localStorage.getItem('projectId');
        var blockId = $(this).attr('id');
        var urlAllByGroup = 'https://learn.landsoftapis.com/api/Product/GetAllByGroup?ProjectId='+projectId +'&BlockId='+blockId + '&Keyword=1' + '&StatusId=1&SortId=1&GroupId=2';
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
        }).then(function(data){
            console.log(data);
            var content =``;
            data.FilterData.forEach(element => {
                content += `
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                <div class="col-lg-1 col-md-2 col-auto m-1 " style="background-color:${element.StatusColor}; color:${element.TextColor};" >
                    <span >${element.Status}</span><br>
                    <span >Số Tiền: ${element.Amount}</span>
                </div>
                
                `
            })
            $('#allRooms').html(content);
        })
    
    })
    
})