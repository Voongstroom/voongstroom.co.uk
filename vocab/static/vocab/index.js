$(document).ready(function(){
    $(".entry").click(function(){
	if ($(this).has($(".control-panel")).length > 0){
	    console.log("has control-panel");
	    // $(".control-panel").slideToggle("slow");
	} else {
	    console.log("does not have control panel");
	    $(".control-panel").attr("delete-me", true);
	    $(".control-panel").slideUp("slow", function(){
		$(".control-panel[delete-me=true]").remove();
	    });
	    var control_panel = document.createElement("div");  // Create with DOM
	    control_panel.className = "control-panel";
	    control_panel.style.clear = "both";
	    control_panel.style.display = "None";
	    $(this).append(control_panel);
	    // var edit_icon = document.createElement("img");
	    // edit_icon.src = "/static/vocab/edit-icon.png"
	    // edit_icon.style.width = "10px;";
	    // // edit_icon.width = "50px";
	    // $(".control-panel").append(edit_icon);
	    $(".control-panel").slideDown("slow");
	}


	// if ($(this).has($(".control-panel")).length > 0){
	//     console.log("has control-panel");
	//     // $(".control-panel").slideUp("slow", function(){
	//     // 	$(".control-panel").remove();
	//     // });
	// }
	// else{
	//     console.log("does not have control panel");
	//     // $(".control-panel").slideUp("slow"), function(){
	//     // 	$(".control-panel").remove();
	//     // });
	//     var control_panel = document.createElement("div");  // Create with DOM
	//     control_panel.className = "control-panel";
	//     control_panel.innerHTML = "Control Panel";
	//     control_panel.style.clear = "both";
	//     control_panel.style.display = "None";
	//     $(this).append(control_panel);
	//     // $(".control-panel").slideDown("slow");
	// }
	// $(".control-panel").slideUp("slow");
	// $(this).has($(".control-panel")).slideToggle("slow");
    });
});

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function addWord(word_id, description_id){
    word_element = document.getElementById(word_id);
    description_element = document.getElementById(description_id);
    word = word_element.value;
    description = description_element.value;
    console.log("word: " + word);
    console.log("description: " + description);
    
    // Initialize the Ajax request
    var csrftoken = getCookie('csrftoken');
    console.log("csrftoken: " + csrftoken.toString());
    var xhr = new XMLHttpRequest();
    $.ajaxSetup({
     	beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
    		xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
    	}
    });
    $.ajax({
     	type: 'POST',
     	url: 'add-word',
     	data: { 
            'word': word, 
    	    'description': description,
     	},
     	success: function(msg){
            console.log(msg);
     	}
    });
}
