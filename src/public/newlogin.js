

$(document).ready( function(){

$("#sndBtn").click(function(){
      
    var emailInput = document.getElementById('emailInput');
    console.log("post sent");
    $.post(
        '/passreset',
        {   email:emailInput.value  },
        function(data){
        }
    )
  
    location.href="/resetpassword.html";
});

});
