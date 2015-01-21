$(document).ready(function(){

    console.log("document ready");
    $("div.new-entry").find(".word, .description").prop("contenteditable", true);
    $("div.new-entry").find(".word").focus()

    $("div.new-entry").on("click", ".save-icon", function(){
	console.log("save new entry");
	var entry = $(this).parents(".new-entry");
	var word = entry.find(".word");
	var description = entry.find(".description");

	console.log(word);
	console.log(description);

	word.prop("contenteditable", false);
	description.prop("contenteditable", false);

	// addWord("new-word", "new-description");
	console.log(entry);
	entry.attr("id", "entry-300");
	entry.removeClass("new-entry");
	entry.addClass("entry");
	// entry.find(".control-panel").slideUp();
	console.log(entry);
    });
    
    $("div.entry").on("click", ".control-panel-icon", function(){
	console.log("control-panel-icon clicked");
    });
    
    $("div.entry").on("click", ".edit-icon", function(){
	console.log("edit-icon clicked");
	var parent = $(this).parents(".entry");
	parent.attr("edit-mode", true);
	var word = parent.find(".word");
	var description = parent.find(".description");
	word.prop("contenteditable", true);
	description.prop("contenteditable", true);
	description.focus();
	// var tmpStr = description.text(); // should move the cursor to the end of the div but doesn't work
	// description.text('');
	// description.text(tmpStr);
	$(this).removeClass("edit-icon");
	$(this).addClass("save-icon");
	$(this).attr("src", "/static/vocab/save_icon.png");
    });

    $("div.entry").on("click", ".save-icon", function(){
	console.log("save-icon clicked");
	var parent = $(this).parents(".entry");
	parent.attr("edit-mode", false);
	var word = parent.find(".word");
	var description = parent.find(".description");
	word.prop("contenteditable", false);
	description.prop("contenteditable", false);
	$(this).removeClass("save-icon");
	$(this).addClass("edit-icon");
	$(this).attr("src", "/static/vocab/edit_icon.png");
    });

    $("div.entry").on("click", ".tag-icon", function() {
	console.log("tag-icon clicked");
    });
    
    $("div.entry").on("click", ".delete-icon", function(){
	console.log("delete-icon clicked");
	var parent = $(this).parents(".entry");
	console.log("deleting: id: " + parent.attr("model-id") + ", word: " + parent.find(".word").text());
	parent.slideUp();
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
     	    url: 'delete-entry',
     	    data: { 
		'id': parent.attr("model-id"),
     	    },
     	    success: function(msg){
		console.log(msg);
     	    }
	});
    });

    // Control Panel Management
    $("div.entry").click(function(event){
	console.log("clicked");
	console.log($(this));
	
	var control_panels = this.getElementsByClassName("control-panel");
	var control_panel = (control_panels) ? control_panels[0] : null;
	
	if (control_panel == null) {
	    var control_panel = document.createElement("div");
	    control_panel.setAttribute("class", "control-panel");
	    control_panel.style.display = "none";
	    
	    var edit_icon = document.createElement("img");
	    edit_icon.setAttribute("width", "40px");
	    edit_icon.setAttribute("src", "/static/vocab/edit_icon.png");
	    edit_icon.setAttribute("class", "control-panel-icon edit-icon");
	    control_panel.appendChild(edit_icon);
	    
	    var tag_icon = document.createElement("img");
	    tag_icon.setAttribute("width", "40px");
	    tag_icon.setAttribute("src", "/static/vocab/tag_icon.png");
	    tag_icon.setAttribute("class", "control-panel-icon tag-icon");
	    control_panel.appendChild(tag_icon);
	    
	    var delete_icon = document.createElement("img");
	    delete_icon.setAttribute("width", "40px");
	    delete_icon.setAttribute("src", "/static/vocab/delete_icon.png");
	    delete_icon.setAttribute("class", "control-panel-icon delete-icon");
	    control_panel.appendChild(delete_icon);
	    
	    this.appendChild(control_panel);
	}
	
	// Hide control panels that aren't in edit mode and do not belong to this entry
	$(".entry").not($(".entry[edit-mode='true']")).not($(this)).find(".control-panel").slideUp();
	
	// Toggle this control panel if it is not in edit mode and the user clicked off of the control-panel icons
	if (!event.target.classList.contains("control-panel-icon")){
	    $(this).not($("[edit-mode='true']")).find(".control-panel").slideToggle();
	}
    })
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

    console.log(word_id);
    console.log(word_element);
    console.log(description_id);
    console.log(description_element);

    word = word_element.innerHTML;
    description = description_element.innerHTML;
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
