function editEntry(id, word, description){
    console.log("editEntry");
    console.log("id: " + id);
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
    return $.ajax({
     	type: 'POST',
     	url: 'edit-entry',
     	data: { 
	    'id': id,
            'word': word, 
    	    'description': description,
     	},
     	success: function(msg){
            console.log(msg);
     	},
	async: true,
    }).responseText;
}


function createNewEntry(){
    var newEntry = document.createElement("div");
    newEntry.className = "new-entry";
    var word = document.createElement("div");
    word.className = "word";
    word.innerHTML = 'New word';
    word.setAttribute("contenteditable", true);
    word.setAttribute("placeholder", true);
    var description = document.createElement("div");
    description.className = "description";
    description.innerHTML = 'Description of new word.';
    description.setAttribute("contenteditable", true);
    description.setAttribute("placeholder", true);
    var controlPanel = document.createElement("div");
    controlPanel.className = "control-panel";
    var saveIcon = document.createElement("img");
    saveIcon.className = "control-panel-icon save-icon";
    saveIcon.setAttribute("width", "40px");
    saveIcon.setAttribute("src", "/static/vocab/save_icon.png");
    var tagIcon = document.createElement("img");
    tagIcon.className = "control-panel-item tag-icon";
    tagIcon.setAttribute("width", "40px");
    tagIcon.setAttribute("src", "/static/vocab/tag_icon.png");
    
    newEntry.appendChild(word);
    newEntry.appendChild(description);
    newEntry.appendChild(controlPanel);
    controlPanel.appendChild(saveIcon);
    controlPanel.appendChild(tagIcon);

    return newEntry;
}

$(document).ready(function(){

    // Document initialisation
    console.log("document ready");
    $("div.entry-container").prepend(createNewEntry());
    $("div.new-entry").find(".word, .description").find(".input-text").prop("contenteditable", true);
    $("div.new-entry").find(".word").find(".input-text").focus();

    // Add tags
    $(document).on("click", ".add-tag-icon", function() {
	var entry = $(this).parents(".entry");
	var tags = $(this).parents(".tags");
	var newTag = document.createElement("div");
	newTag.className = "tag";
	// newTag.innerHTML = "New tag";
	// newTag.setAttribute("placeholder", true);
//	newTag.setAttribute("display", "none");
	$(this).before(newTag);
	// tags.find(newTag).hide('slide',{direction:'right'},1000);
	// tags.find(newTag).show("slide", {direction: "left"}, 1000);
	// tags.find(newTag).toggle("slide", {direction: "left"}, 1000);
	// tags.find(newTag).animate({width: "50px"});
	// tags.find(newTag).show("slow");
	tags.find(newTag).slideDown();
	entry.attr("edit-mode", true);
	newTag.setAttribute("contenteditable", true);
	tags.find(newTag).focus();
    });

    // Save tag or cancel
    $(document).on("blur", ".tag", function() {
	var entry = $(this).parents(".entry");
	if($(this).text().length == 0){
	    $(this).remove();
	}
	entry.attr("edit-mode", false);
    });

    // Placeholder text for new entry
    $(document).on("focus", "div.new-entry .word[placeholder=true]", function() {
	$(this).text("");
	$(this).attr("placeholder", false);
    });
    $(document).on("blur", "div.new-entry .word", function() {
	if($(this).text().length == 0){
	    $(this).text("New word");
	    $(this).attr("placeholder", true);
	}
    });
    $(document).on("focus", "div.new-entry .description[placeholder=true]", function() {
	$(this).text("");
	$(this).attr("placeholder", false);
    });
    $(document).on("blur", "div.new-entry .description", function() {
	if($(this).text().length == 0){
	    $(this).text("Description of new word.");
	    $(this).attr("placeholder", true);
	}
    });
    
    // Save new entry
    $(document).on("click", "div.new-entry .save-icon", function(){
	console.log("clicked new-entry");
	var entry = $(this).parents(".new-entry");
	var word = entry.find(".word");
	var description = entry.find(".description");
	console.log(word.attr("placeholder"));
	console.log(description.attr("placeholder"));
	if(word.attr("placeholder") == "true" || description.attr("placeholder") == "true"){
	    console.log("dont save");
	    return;
	}

	console.log("save new entry");
	entry.removeClass("new-entry");
	entry.addClass("entry");
	
	console.log(word);
	console.log(description);
	word.prop("contenteditable", false);
	description.prop("contenteditable", false);
	
	var controlPanel = entry.find(".control-panel");
	controlPanel.slideUp("", function(){
	    controlPanel.remove();
	});
	
	var newEntry = createNewEntry();
 	newEntry.style.display = "none";
	$(".entry-container").prepend(newEntry);
	$(".entry-container").find(".new-entry").slideDown();
	$(".entry-container").find(".new-entry").find(".word, .description").prop("contenteditable", true);

	// send new word to server
	var model_id = addWord(word.text(), description.text());
	console.log("model_id");
	console.log(model_id);

	entry.attr("model-id", model_id);
    });

    // Debugging
    $("div.entry").on("click", ".control-panel-icon", function(){
	console.log("control-panel-icon clicked");
    });
    
    // Edit Entry
    $(document).on("click", "div.entry .edit-icon", function(){
	console.log("edit-icon clicked");
	var entry = $(this).parents(".entry");
	entry.attr("edit-mode", true);
	var word = entry.find(".word");
	var description = entry.find(".description");
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

    // Save edits
    $(document).on("click", "div.entry .save-icon", function(){
	console.log("save-icon clicked");
	var entry = $(this).parents(".entry");
	entry.attr("edit-mode", false);
	var word = entry.find(".word");
	var description = entry.find(".description");
	word.prop("contenteditable", false);
	description.prop("contenteditable", false);
	$(this).removeClass("save-icon");
	$(this).addClass("edit-icon");
	$(this).attr("src", "/static/vocab/edit_icon.png");
	editEntry(entry.attr("model-id"), word.text(), description.text());
    });

    // Modify Tags
    $("div.entry").on("click", ".tag-icon", function() {
	console.log("tag-icon clicked");
    });
    
    // Delete Entry
    $(document).on("click", "div.entry .delete-icon", function(){
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
    $(document).on("click", "div.entry", function(event){
	console.log("clicked");
	
	var control_panels = this.getElementsByClassName("control-panel");
	var control_panel = (control_panels) ? control_panels[0] : null;
	
	if (control_panel == null) {
	    var control_panel = document.createElement("div");
	    control_panel.setAttribute("class", "control-panel");
	    control_panel.style.display = "none";

	    hr = document.createElement("hr");
	    control_panel.appendChild(hr);
	    
	    var edit_icon = document.createElement("img");
	    edit_icon.setAttribute("width", "35px");
	    edit_icon.setAttribute("src", "/static/vocab/edit_icon.png");
	    edit_icon.setAttribute("class", "control-panel-icon edit-icon");
	    control_panel.appendChild(edit_icon);
	    
	    var tag_icon = document.createElement("img");
	    tag_icon.setAttribute("width", "35px");
	    tag_icon.setAttribute("src", "/static/vocab/tag_icon.png");
	    tag_icon.setAttribute("class", "control-panel-icon tag-icon");
	    control_panel.appendChild(tag_icon);
	    
	    var delete_icon = document.createElement("img");
	    delete_icon.setAttribute("width", "35px");
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

function addWord(word, description){
    console.log("addWord")
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
    return $.ajax({
     	type: 'POST',
     	url: 'add-word',
     	data: { 
            'word': word, 
    	    'description': description,
     	},
     	success: function(msg){
            console.log(msg);
     	},
	async: false,
    }).responseText;
}
