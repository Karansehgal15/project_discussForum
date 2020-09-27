

$(document).ready( function(e){

    
    $("#submitBtn").click(function(e){
        let email = document.getElementById('email').value;
        let pass =  document.getElementById('pass').value;
        let confirmPass = document.getElementById('confirmPass').value;
        let otp = document.getElementById('otp').value;
        
        e.preventDefault();
        console.log("email: ", email)
        console.log("pass: ",pass)
        if(pass==confirmPass){
            $.post(
                '/passreset/checkPass',
                {   email:email, otp:otp, pass:pass  },
                function(data){
                    var statusDiv=document.getElementById('statusDiv');
                    if(data.status=="success"){
                        statusDiv.append(`password reset sucessful`);
                    }else{
                        statusDiv.append(`you have submitted incorect otp, please try again`);
                    }
                }
            )
        }
    });
    
    });
    