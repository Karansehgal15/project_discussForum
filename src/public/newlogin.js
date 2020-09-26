var button = document.querySelector(".img__btn");
button.addEventListener("click", function() {document.querySelector(".cont").classList.toggle("s--signup"); });



$(document).on("click", "#sndBtn", function() {
    var emailInput = document.getElementById('emailInput');

    $.post(
        '/passreset',
        {   email:emailInput.value},
        function(data){
            fillData();
        }
    )
});