var infoRequest;
var infoRequestObj;
var cookieNumber;
var date = new Date();

date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30));
//date.setTime(date.getTime() + (2592000000));
function createCookie(value) {
    var cookie = "teamID=" + value + ";expires=" + date.toGMTString() + ";";
    document.cookie = cookie;
    console.log(cookie);
    console.log("Creating new cookie with key: teamID value: " + value);
    window.location.reload();
}

function checkCookie(){
    let key = "teamID=";
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                console.log(cookie);
                cookieNumber = cookie.toString().slice(7);
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(key) === 0) {
                    return cookie.substring(key.length, cookie.length);
                }
            }

    
}

function workCookie(){
    
   setTimeout(function(){
    if(cookieNumber.length == 4){
        $('.teamNumForm').hide();
        document.getElementById('numHeading').innerHTML = 'Your Team Number: ' + cookieNumber + " (<a onclick='deleteCookie()' href=''>change/remove team number</a>)";
        $('.showNum').show();
    } else {
        $('.teamNumForm').show();
        $('.showNum').hide();
    }
  }, 1000)
}


 function deleteCookie() {
        createCookie("teamID", "", -1);
    }
	

function getMyTeamInfo(){

  infoRequest = new XMLHttpRequest();
  infoRequest.open("GET", "https://www.thebluealliance.com/api/v3/team/frc" + cookieNumber + "/" , true);
  infoRequest.setRequestHeader("X-TBA-Auth-Key", "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5");
  infoRequest.send();
  infoRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){

          infoRequestObj = JSON.parse(this.responseText);
          var a;
          var titleNameHeading = document.getElementsById('nameHeading');
          titleNameHeading.innerHTML = "epic";
          console.log(infoRequestObj)
          
    

      }
    }

}

$(document).ready(checkCookie());
$(document).ready(workCookie());
$(document).ready(getMyTeamInfo());