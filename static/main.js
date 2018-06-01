// document.getElementById("submitSignUpButton").addEventListener("click", function(event){
//     event.preventDefault();
//     submit_sign_up();
// });
//
// $("#signUpForm").submit(function( event ) {
//     console.log($(this).serializeArray());
//     event.preventDefault();
// });
//
// function submit_sign_up() {
//     console.log('submitting...');
//     console.log($('#firstName').val());
//     console.log($('#signUpForm').serializeArray());
// }

$("#signUpForm").submit(function (event) {

    // check that the form fields are completed
    $("form#signUpForm :input").each(function() {

        if($(this).val() === "") {
            console.log($(this));
            if (!($(this).get(0).id === "submitSignUpButton")) {
                let fields_alert = '<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> Fill out all fields before submitting.</div>';
                $("#fieldsMissingAlert").html(fields_alert);
                event.preventDefault();
                return false;
            }

        }
    });


});
