function register() {
    console.log("register");
}

function checkUsernameValidity(username) {
    if(username == "")
	return false;
    var output = ($.ajax({
     	type: 'GET',
     	url: 'check-username-validity/' + username,
	async: false,
    }).responseText == "0");
    return output;
}

$(document).ready(function(){
    // Document initialisation
    console.log("document ready");
    
    // Registration Form validation
    $("#registration-form").bind("keyup change", function(event){
	var registrationForm = $(this)
	var usernameField = registrationForm.find("[name=username]");
	var passwordField = registrationForm.find("[name=password]");
	var formMessages = registrationForm.find(".form-messages");
	var submit = registrationForm.find("[type=submit]");
	var username = usernameField.val();
	var isValidUsername = checkUsernameValidity(username);
	var isValidPassword = (passwordField.val() != "");
	var isValidForm = (isValidUsername && isValidPassword);

	console.log("username: " + username);
	console.log("isValidUsername: " + isValidUsername);
	console.log("isValidPassword: " + isValidPassword);
	if(!isValidUsername){
	    console.log("warning message");
	    formMessages.text("Sorry the username is unavailable");
	} else {
	    formMessages.text("");
	}
	submit.prop("disabled", !isValidForm);
    });
});
