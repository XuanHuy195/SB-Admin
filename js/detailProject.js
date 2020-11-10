
$(document).ready(function(){
  var listProjectUrl = 'https://learn.landsoftapis.com/api/Project/GetAll?UID=1';
  var id = localStorage.getItem('projectId');
  var idToken = localStorage.getItem('idToken');
  var content = ``;
  fetch(listProjectUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + idToken,
      }

  }).then(function(response){
      if(response.status != 200){
          throw Error(status);
      }
      return response.json();
  }).then(function(data){
      function randomItem(items) {
          return items[Math.floor(Math.random()*items.length)];
      }
      var dataArr = [];
      for(var i= 0;i< 3;i++) {
        dataArr[i] = randomItem(data);
      }
      dataArr.forEach(element => {
          content += `
              <div class="cardProject card shadow-card my-2 w-100 h-100">
                  <img src="${element.ImageUrl}" class="card-img-top" style="height:70%"></img>
                  <div class="card-body">
                      <h4 class="card-title text-primary">${element.Name}</h4>
                  </div>
              </div>
          `;
      });
      $('#sidebarProject').html(content);

  }).catch(function(err){
    alert('Hết thời gian sử dụng');
    $(location).attr('href', './index.html');
  });


  $('.iconUpDown').on('click', function() {
      $(this).children('.fas').toggleClass('fa-angle-down fa-angle-up');
  }); 

     var Id = localStorage.getItem('Id');
    var contentUrl = 'https://learn.landsoftapis.com/api/Project/GetContent?Id='+ Id +'&CateId=1';

    fetch(contentUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        }

    }).then(function(response){
        if(response.status != 200){
            throw Error(status);
        }
        return response.json();
    }).then(function(data){
       
        //('#collapse1').text(data.Content);
    }).catch(function(err){
        console.log(err);
    })
   
    $('#items').on('click', function(){
    
    })
})