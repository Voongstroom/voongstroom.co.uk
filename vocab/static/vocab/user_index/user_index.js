// function checkIfUserIsAuthor() {
//     console.log("checkIfUserIsAuthor");
//     var response = $.ajax({
// 	type: 'GET',
// 	url: document.URL + '/check-if-user-is-author',
// 	success: function(msg) {
// 	    console.log(msg);
// 	},
// 	async: false,
//     }).responseText;
//     return response == "1";
// }

// function getFriendsList() {
//     console.log("getFriendsList");
//     console.log(document.URL + '/get-friends');
//     var response = $.ajax({
// 	type: 'GET',
// 	url: document.URL + '/get-friends',
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: false,
//     }).responseText;
//     users = $.parseJSON(response).users;
//     console.log("users");
//     console.log(users);
//     return users;
// }

// function buildFriendsElement(section) {
//     console.log("buildFriendsElement");
//     var friends = getFriendsList();
//     buildFriendsList(friends, section);
// }

// function buildFriendsList(friends, section) {
//     console.log("buildFriendsList");
//     for(i=0; i<friends.length; i++) {
// 	var username = friends[i];
// 	var friendElement = document.createElement("a");
// 	friendElement.className = "friend";
// 	friendElement.innerHTML = username
// 	friendElement.setAttribute("href", "http://www.voongstroom.co.uk/vocab/user/" + username);
// 	section.append(friendElement);

// 	// friendsList[friendsList.length] = friendElement;
// 	// friendsList[friendsList.length] = document.createElement("br");
// 	// console.log("friend: " + friends[i]);
//     }
// }

// // Create the container for the tags and add the "Tag" label in there too
// function createTags(){
//     var tags = document.createElement("div");
//     tags.className = "tags";
//     var label = document.createElement("div");
//     label.className = "tag";
//     label.style.backgroundColor = "white";
//     label.innerHTML = "Tags";
//     tags.appendChild(label);
//     return $(tags);
// }

// function toggleFavourite(id, rating) {
//     console.log("toggleFavourite");
//     console.log("id: " + id);
//     console.log("rating: " + rating);
    
//     // Initialize the Ajax request
//     var csrftoken = getCookie('csrftoken');
//     console.log("csrftoken: " + csrftoken.toString());
//     var xhr = new XMLHttpRequest();
//     $.ajaxSetup({
//      	beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//     	}
//     });
//     return $.ajax({
//      	type: 'POST',
//      	url: '/vocab/toggle-favourite',
//      	data: { 
// 	    'id': id,
//             'rating': rating, 
//      	},
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: true,
//     }).responseText;
// }

// // Delete tag-word relationship from DB
// function deleteTag(id, tag) {
//     console.log("deleteTag");
//     console.log("id: " + id);
//     console.log("tag: " + tag);

//     // Initialize the Ajax request
//     var csrftoken = getCookie('csrftoken');
//     console.log("csrftoken: " + csrftoken.toString());
//     var xhr = new XMLHttpRequest();
//     $.ajaxSetup({
//      	beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//     	}
//     });
//     return $.ajax({
//      	type: 'POST',
//      	url: '/vocab/delete-tag',
//      	data: { 
// 	    'id': id,
//             'tag': tag, 
//      	},
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: true,
//     }).responseText;
// }

// // Add tag to DB
// function addTag(id, tag){
//     console.log("addTag");
//     console.log("id: " + id);
//     console.log("tag: " + tag);

//     // Initialize the Ajax request
//     var csrftoken = getCookie('csrftoken');
//     console.log("csrftoken: " + csrftoken.toString());
//     var xhr = new XMLHttpRequest();
//     $.ajaxSetup({
//      	beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//     	}
//     });
//     return $.ajax({
//      	type: 'POST',
//      	url: '/vocab/add-tag',
//      	data: { 
// 	    'id': id,
//             'tag': tag, 
//      	},
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: true,
//     }).responseText;
// }

// // Edit entry in the DB
// function editEntry(id, word, description){
//     console.log("editEntry");
//     console.log("id: " + id);
//     console.log("word: " + word);
//     console.log("description: " + description);
    
//     // Initialize the Ajax request
//     var csrftoken = getCookie('csrftoken');
//     console.log("csrftoken: " + csrftoken.toString());
//     var xhr = new XMLHttpRequest();
//     $.ajaxSetup({
//      	beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//     	}
//     });
//     return $.ajax({
//      	type: 'POST',
//      	url: '/vocab/edit-entry',
//      	data: { 
// 	    'id': id,
//             'word': word, 
//     	    'description': description,
//      	},
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: true,
//     }).responseText;
// }

// // Create new entry element
// function createNewEntry(){
//     var newEntry = document.createElement("div");
//     newEntry.className = "new-entry";
//     var word = document.createElement("div");
//     word.className = "word";
//     word.innerHTML = 'New word';
//     word.setAttribute("contenteditable", true);
//     word.setAttribute("placeholder", true);
//     var description = document.createElement("div");
//     description.className = "description";
//     description.innerHTML = 'Description of new word.';
//     description.setAttribute("contenteditable", true);
//     description.setAttribute("placeholder", true);
//     var hr = document.createElement("hr");
//     var tags = document.createElement("div");
//     tags.className = "tags";
//     tags.style.position = "relative";
//     var tag = document.createElement("div");
//     tag.className = "tag";
//     tag.innerHTML = "Tags";
//     tag.style.backgroundColor = "white";
//     var controlPanel = document.createElement("div");
//     controlPanel.className = "control-panel";
//     var saveIcon = document.createElement("img");
//     saveIcon.className = "control-panel-icon save-icon";
//     saveIcon.setAttribute("width", "40px");
//     saveIcon.setAttribute("src", "/static/vocab/save_icon.png");
//     // var tagIcon = document.createElement("img");
//     // tagIcon.className = "control-panel-item tag-icon";
//     // tagIcon.setAttribute("width", "40px");
//     // tagIcon.setAttribute("src", "/static/vocab/tag_icon.png");
//     controlPanel.appendChild(saveIcon);
//     // controlPanel.appendChild(tagIcon);
    
//     newEntry.appendChild(word);
//     newEntry.appendChild(description);
//     // newEntry.appendChild(hr);
//     // newEntry.appendChild(tags);
//     // tags.appendChild(tag);
//     newEntry.appendChild(controlPanel);

//     return newEntry;
// }

// function buildEntries(section, tagText) {
//     console.log("buildEntries");
//     var entries = getEntries(tagText);
//     var elements = [];
//     console.log(entries);
//     console.log(entries.length);
//     for(i=0; i<entries.length; i++) {
//      	var entry = entries[i];
// 	var entryElement = buildEntryElement(entry);
// 	section.append(entryElement);
//     }
// }

// function getEntries(tagText) {
//     console.log("getEntries");
//     var response = $.ajax({
//     	type: 'GET',
//     	url: document.URL + '/get-entries',
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	data: {
// 	    tag: tagText
// 	},
//     	async: false,
//     }).responseText;
//     entries = $.parseJSON(response);
//     console.log("entries");
//     console.log(entries);
//     return entries;
// }

// // function getEntries2(filter) {
// //     var response = $.ajax({
// // 	type: "GET",
// // 	url: document.URL + '/get-entries2',
// // 	data: filter,
// // 	async: false
// //     }).responseText;
// //     var entryObjects = $.parseJSON(response.responseText);
// //     var entries = $(document.createElement("ul"));
// //     entries.attr("id", "entries");
// //     for(var i=0; i<entryObjects.length; i++) {
// // 	var entryObject = entryObjects[i];
// // 	var entry = buildEntryElement(entryObject);
// // 	entries.append(entry);
// //     }
// //     return entries;
// // }

// function buildEntryElement(entry) {
//     console.log("buildEntryElement: " + entry.id);
//     var entryElement = document.createElement("div");
//     entryElement.className = "entry";
//     entryElement.setAttribute("model-id", entry.id);
//     entryElement.setAttribute("favourite", entry.popularity_rating);
//     var word = document.createElement("div");
//     word.className = "word";
//     word.innerHTML = entry.word;
//     var description = document.createElement("div");
//     description.className = "description";
//     description.innerHTML = entry.brief_description;
//     var tags_separator = document.createElement("hr");
//     tags_separator.className = "tags-separator";
//     var tags = entry.tags;
//     var tags_element = document.createElement("div");
//     tags_element.className = "tags";
//     var tags_label = document.createElement("div");
//     tags_label.className = "tag-label tag";
//     tags_label.innerHTML = "Tags";

//     entryElement.appendChild(word);
//     entryElement.appendChild(description);
//     entryElement.appendChild(tags_separator);
//     entryElement.appendChild(tags_element);
//     tags_element.appendChild(tags_label);

//     for(var i=0; i<tags.length; i++) {
//     	var tag = document.createElement("button");
//     	tag.className = "tag";
//     	tag.innerHTML = tags[i];
// 	tag.setAttribute("value", tag.innerHTML);
//     	tags_element.appendChild(tag);
// 	var tagDeleteIcon = document.createElement("img");
// 	tagDeleteIcon.className = "tag-delete-icon";
// 	tagDeleteIcon.setAttribute("width", "10px");
// 	tagDeleteIcon.setAttribute("src", "/static/vocab/delete_icon.png");
// 	$(tagDeleteIcon).hide();
// 	tag.appendChild(tagDeleteIcon);
//     }
    
//     if(tags.length == 0) {
//     	tags_separator.style.display = "none";
//     	tags_element.style.display = "none";
//     }
//     return entryElement;
// }

// function buildControlPanelAuthor() {
//     var control_panel = document.createElement("div");
//     control_panel.setAttribute("class", "control-panel");
//     control_panel.style.display = "none";
    
//     hr = document.createElement("hr");
//     control_panel.appendChild(hr);
    
//     var edit_icon = document.createElement("img");
//     edit_icon.setAttribute("width", "35px");
//     edit_icon.setAttribute("src", "/static/vocab/edit_icon.png");
//     edit_icon.setAttribute("class", "control-panel-icon edit-icon");
//     control_panel.appendChild(edit_icon);
    
//     var tag_icon = document.createElement("img");
//     tag_icon.setAttribute("width", "35px");
//     tag_icon.setAttribute("src", "/static/vocab/tag_icon.png");
//     tag_icon.setAttribute("class", "control-panel-icon tag-icon");
//     control_panel.appendChild(tag_icon);
    
//     var favourite_icon = document.createElement("img");
//     favourite_icon.setAttribute("width", "35px");
//     favourite_icon.setAttribute("src", "/static/vocab/favourite_icon.png");
//     favourite_icon.className = "control-panel-icon favourite-icon";
//     control_panel.appendChild(favourite_icon);
    
//     var delete_icon = document.createElement("img");
//     delete_icon.setAttribute("width", "35px");
//     delete_icon.setAttribute("src", "/static/vocab/delete_icon.png");
//     delete_icon.setAttribute("class", "control-panel-icon delete-icon");
//     control_panel.appendChild(delete_icon);
    
//     return control_panel;
// }

// function buildControlPanelObserver() {
//     var control_panel = document.createElement("div");
//     control_panel.setAttribute("class", "control-panel");
//     control_panel.style.display = "none";
//     hr = document.createElement("hr");
//     control_panel.appendChild(hr);
//     var copy_icon = document.createElement("img");
//     copy_icon.setAttribute("width", "35px");
//     copy_icon.setAttribute("src", "/static/vocab/user_index/copy_icon.png");
//     copy_icon.setAttribute("class", "control-panel-icon copy-icon");
//     copy_icon.setAttribute("alt", "copy-icon");
//     control_panel.appendChild(copy_icon);
//     return control_panel;
// }

// $(document).ready(function(){
//     // Document initialisation
//     console.log("document ready");
//     $("#main-section").prepend(createNewEntry());
//     $(".new-entry").find(".word, .description").find(".input-text").prop("contenteditable", true);
//     $(".new-entry").find(".word").find(".input-text").focus();
//     buildFriendsElement($(".side-section#friends"));
//     buildEntries($("#main-section"));
//     var isAuthor = checkIfUserIsAuthor();
//     console.log("isAuthor: " + isAuthor);

//     // Assign Control Panel Builder
//     if(isAuthor) {
// 	var buildControlPanel = buildControlPanelAuthor;
//     } else {
// 	var buildControlPanel = buildControlPanelObserver;
//     }

//     // Disable new lines in input divs
//     $(document).on("keydown", ".description, .word, .tag", function(event) {
// 	if(event.keyCode == 13) {
// 	    event.preventDefault();
// 	}
//     });

//     // Toggle Favourite
//     $(document).on("click", ".favourite-icon", function() {
// 	var entry = $(this).parents(".entry");
// 	if(entry.attr("favourite") == "1"){
// 	    entry.attr("favourite", "0");
// 	    toggleFavourite(entry.attr("model-id"), "0");
// 	}
// 	else {
// 	    entry.attr("favourite", "1");
// 	    toggleFavourite(entry.attr("model-id"), "1");
// 	}
//     });

//     // Tags

//     // Tag Suggestions
//     $(document).on("keyup", ".new-tag", function(e) {
// 	console.log("keyup on .new-tag");
// 	var newTag = $(this);
// 	var userInput = newTag.contents().filter(function(){return this.nodeType == 3;}).text();
// 	console.log("userInput: " + userInput);
// 	var tagsList = newTag.parents(".tags");
// 	var dropdown = newTag.find(".tag-suggestions-dropdown");
// 	if(dropdown.size() == 0) {
// 	    // buildDropdown(newTag);
// 	    dropdown = $(document.createElement("ul"));
// 	    dropdown.addClass("tag-suggestions-dropdown");
// 	    newTag.append(dropdown);
// 	}
// 	$.get("/vocab/get-tags", {input: userInput}, function(data, status){
// 	    var tags = data.tags;
// 	    console.log("suggestedTags");
// 	    console.log(tags);
// 	    if(tags.length == 0) {
// 		dropdown.slideUp();
// 	    } else {
// 		// remove mismatches
// 		$(".tag-suggestions-dropdown li").each(function() {
// 		    if(tags.indexOf($.trim($(this).text())) == -1) {
// 			$(this).slideUp(function() {
// 			    $(this).remove();
// 			});
// 		    }
// 		});
// 		// add tags not in the list already
// 		for(var i=0; i<tags.length; i++) {
// 		    // check whether tag is in the dropdown list
// 		    var dropdownItems = $(".tag-suggestions-dropdown li");
// 		    console.log("dropdownItems");
// 		    console.log(dropdownItems);
// 		    var matchedItems = dropdownItems.filter(function(){
// 			return $(this).text() == tags[i];});
// 		    console.log(matchedItems);
// 		    if($(".tag-suggestions-dropdown li").filter(function(){return $(this).text() == tags[i];}).size() == 0){
// 			var listElement = document.createElement("li");
// 			listElement.className = "tag-suggestion";
// 			listElement.innerHTML = tags[i];
// 			dropdown.append(listElement);
// 			$(listElement).hide();
// 			$(listElement).slideDown();
// 		    }
// 		}
// 		dropdown.slideDown();
// 	    }
// 	});
//     });

//     // Click Tag Suggestion to complete the tag input
//     $(document).on("click", ".tag-suggestion", function() {
// 	var entry = $(this).parents(".entry");
// 	var suggestion = $(this)
// 	var newTag = entry.find(".new-tag");
// 	var textComponent = newTag.contents().filter(function(){return this.nodeType == 3;});
	

// 	console.log(suggestion.text());
// 	console.log(textComponent.text());
// 	textComponent[0].textContent = suggestion.text();
// 	console.log(textComponent.text());
//     });

//     // Filter entries
//     $(document).on("click", ".tag", function(e) {
// 	if($(this).hasClass("tag-label") || $(this).hasClass("new-tag") || e.target.classList.contains("tag-delete-icon")){
// 	    return;
// 	} else {
// 	    var tagText = $.trim($(this).text());
// 	    console.log("tag clicked: " + tagText);
// 	    $("#main-section").empty();
// 	    buildEntries($("#main-section"), tagText);
// 	}
//     });

//     // Tag edit mode
//     $(document).on("click", ".entry .tag-icon", function() {
// 	var tagIcon = $(this);
// 	var entry = tagIcon.parents(".entry, .new-entry");
// 	var tags = entry.find(".tags");
// 	console.log(tags.size);
// 	entry.find(".tags-separator").slideDown();
// 	$(tags).slideDown();
// 	var newTag = document.createElement("div");
// 	newTag.className = "tag new-tag";
// 	newTag.setAttribute("contenteditable", true);
// 	var tagDeleteIcon = document.createElement("img");
// 	tagDeleteIcon.className = "tag-delete-icon";
// 	tagDeleteIcon.setAttribute("width", "10px");
// 	tagDeleteIcon.setAttribute("src", "/static/vocab/delete_icon.png");
// 	newTag.appendChild(tagDeleteIcon);
// 	tags.append(newTag);
// 	$(newTag).focus();
// 	tagIcon.removeClass("tag-icon");
// 	tagIcon.addClass("tag-save-icon");
// 	tagIcon.attr("src", "/static/vocab/save_icon.png");
// 	tags.find(".tag-delete-icon").show()
// 	entry.attr("edit-mode", true);
//     });

//     // Tags - Save changes
//     $(document).on("click", ".tag-save-icon", function() {
// 	$(".tag-suggestions-dropdown").remove();

// 	var tagIcon = $(this);
// 	var entry = tagIcon.parents(".entry, .new-entry");
// 	var tags = entry.find(".tags");
// 	var newTags = tags.find(".new-tag");
// 	tagIcon.removeClass("tag-save-icon");
// 	tagIcon.addClass("tag-icon");
// 	tagIcon.attr("src", "/static/vocab/tag_icon.png");
// 	$(newTags).prop("contentEditable", false);
// 	console.log("newTags:");
// 	console.log(newTags);
// 	$(newTags).each(function() {
// 	    var tagText = $.trim($(this).text());
// 	    if(tagText.length == 0) {
// 		$(this).remove();
// 	    } else {
// 		addTag(entry.attr("model-id"), tagText);
// 		$(this).attr("value", tagText);
// 		$(this).removeClass("new-tag");
// 	    }
// 	});

// 	var deletedTags = tags.find(".tag[deleted=true]");
// 	console.log("deleted tags: " );
// 	console.log(deletedTags);
// 	deletedTags.each(function(){
// 	    deleteTag(entry.attr("model-id"), $(this).attr("value"));
// 	});
// 	tags.find(".tag-delete-icon").hide();
// 	entry.attr("edit-mode", false);

//     });

//     // Tags - mark tags for deletion
//     $(document).on("click", ".tag-delete-icon", function() {
// 	console.log("delete tag clicked: ");
// 	var tag = $(this).parents(".tag");
// 	tag.hide();
// 	if(tag.hasClass("new-tag")) {
// 	    // A new tag that was deleted before it was saved to the DB
// 	    // don't need to flag for deletion from the DB
// 	    $(tag).remove();
// 	} else {
// 	    tag.attr("deleted", true);
// 	}
//     });

// // Add additional tags
// //     $(document).on("click", ".add-tag-icon", function() {
// // 	var entry = $(this).parents(".entry");
// // 	var tags = $(this).parents(".tags");
// // 	var newTag = document.createElement("div");
// // 	newTag.className = "tag";
// // 	// newTag.innerHTML = "New tag";
// // 	// newTag.setAttribute("placeholder", true);
// // //	newTag.setAttribute("display", "none");
// // 	$(this).before(newTag);
// // 	// tags.find(newTag).hide('slide',{direction:'right'},1000);
// // 	// tags.find(newTag).show("slide", {direction: "left"}, 1000);
// // 	// tags.find(newTag).toggle("slide", {direction: "left"}, 1000);
// // 	// tags.find(newTag).animate({width: "50px"});
// // 	// tags.find(newTag).show("slow");
// // 	tags.find(newTag).slideDown();
// // 	entry.attr("edit-mode", true);
// // 	newTag.setAttribute("contenteditable", true);
// // 	tags.find(newTag).focus();
// //     });
// //     // Save tag or cancel
// //     $(document).on("blur", ".tag", function() {
// // 	var entry = $(this).parents(".entry");
// // 	if($(this).text().length == 0){
// // 	    $(this).remove();
// // 	}
// // 	entry.attr("edit-mode", false);
// //     });

//     // Placeholder text for new entry
//     $(document).on("focus", "div.new-entry .word[placeholder=true]", function() {
// 	$(this).text("");
// 	$(this).attr("placeholder", false);
//     });
//     $(document).on("blur", "div.new-entry .word", function() {
// 	if($(this).text().length == 0){
// 	    $(this).text("New word");
// 	    $(this).attr("placeholder", true);
// 	}
//     });
//     $(document).on("focus", "div.new-entry .description[placeholder=true]", function() {
// 	$(this).text("");
// 	$(this).attr("placeholder", false);
//     });
//     $(document).on("blur", "div.new-entry .description", function() {
// 	if($(this).text().length == 0){
// 	    $(this).text("Description of new word.");
// 	    $(this).attr("placeholder", true);
// 	}
//     });
    
//     // Save new entry
//     $(document).on("click", "div.new-entry .save-icon", function(){
// 	console.log("clicked new-entry");
// 	var entry = $(this).parents(".new-entry");
// 	var word = entry.find(".word");
// 	var description = entry.find(".description");
// 	console.log(word.attr("placeholder"));
// 	console.log(description.attr("placeholder"));
// 	if(word.attr("placeholder") == "true" || description.attr("placeholder") == "true"){
// 	    console.log("dont save");
// 	    return;
// 	}

// 	console.log("save new entry");
// 	entry.removeClass("new-entry");
// 	entry.addClass("entry");
	
// 	console.log(word);
// 	console.log(description);
// 	word.prop("contenteditable", false);
// 	description.prop("contenteditable", false);
	
// 	var controlPanel = entry.find(".control-panel");
// 	controlPanel.slideUp("", function(){
// 	    controlPanel.remove();
// 	});
	
// 	var newEntry = createNewEntry();
//  	newEntry.style.display = "none";
// 	$("#main-section").prepend(newEntry);
// 	$("#main-section").find(".new-entry").slideDown();
// 	$("#main-section").find(".new-entry").find(".word, .description").prop("contenteditable", true);

// 	// send new word to server
// 	var model_id = addWord(word.text(), description.text());
// 	console.log("model_id");
// 	console.log(model_id);

// 	entry.attr("model-id", model_id);
//     });

//     // Debugging
//     $("div.entry").on("click", ".control-panel-icon", function(){
// 	console.log("control-panel-icon clicked");
//     });
    
//     // Edit Entry
//     $(document).on("click", "div.entry .edit-icon", function(){
// 	console.log("edit-icon clicked");
// 	var entry = $(this).parents(".entry");
// 	entry.attr("edit-mode", true);
// 	var word = entry.find(".word");
// 	var description = entry.find(".description");
// 	word.prop("contenteditable", true);
// 	description.prop("contenteditable", true);
// 	description.focus();
// 	// var tmpStr = description.text(); // should move the cursor to the end of the div but doesn't work
// 	// description.text('');
// 	// description.text(tmpStr);
// 	$(this).removeClass("edit-icon");
// 	$(this).addClass("save-icon");
// 	$(this).attr("src", "/static/vocab/save_icon.png");
//     });

//     // Save edits
//     $(document).on("click", "div.entry .save-icon", function(){
// 	console.log("save-icon clicked");
// 	var entry = $(this).parents(".entry");
// 	entry.attr("edit-mode", false);
// 	var word = entry.find(".word");
// 	var description = entry.find(".description");
// 	word.prop("contenteditable", false);
// 	description.prop("contenteditable", false);
// 	$(this).removeClass("save-icon");
// 	$(this).addClass("edit-icon");
// 	$(this).attr("src", "/static/vocab/edit_icon.png");
// 	editEntry(entry.attr("model-id"), $.trim(word.text()), $.trim(description.text()));
//     });

//     // Modify Tags
//     $("div.entry").on("click", ".tag-icon", function() {
// 	console.log("tag-icon clicked");
//     });
    
//     // Delete Entry
//     $(document).on("click", "div.entry .delete-icon", function(){
// 	console.log("delete-icon clicked");
// 	var parent = $(this).parents(".entry");
// 	console.log("deleting: id: " + parent.attr("model-id") + ", word: " + parent.find(".word").text());
// 	parent.slideUp();
// 	var csrftoken = getCookie('csrftoken');
// 	console.log("csrftoken: " + csrftoken.toString());
// 	var xhr = new XMLHttpRequest();
// 	$.ajaxSetup({
//      	    beforeSend: function(xhr, settings) {
// 		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		    xhr.setRequestHeader("X-CSRFToken", csrftoken);
// 		}
//     	    }
// 	});
// 	$.ajax({
//      	    type: 'POST',
//      	    url: document.URL + '/delete-entry',
//      	    data: { 
// 		'id': parent.attr("model-id"),
//      	    },
//      	    success: function(msg){
// 		console.log(msg);
//      	    }
// 	});
//     });

//     // Control Panel Management
//     var DELAY = 0, clicks = 0, timer = null;
//     $(document).on("click", "div.entry", function(event){
// 	console.log("clicked");
// 	var entry = this;
// 	clicks++;
	
// 	if(clicks === 1) {
// 	    timer = setTimeout(function() {
// 		var control_panels = entry.getElementsByClassName("control-panel");
// 		var control_panel = (control_panels) ? control_panels[0] : null;
	
// 		if (control_panel == null) {
// 		    var control_panel = buildControlPanel();
// 		    entry.appendChild(control_panel);
// 		}
		
// 		// Hide control panels that aren't in edit mode and do not belong to this entry
// 		$(".entry").not($(".entry[edit-mode='true']")).not($(entry)).find(".control-panel").slideUp();
		
// 		// Toggle this control panel if it is not in edit mode and the user clicked off of the control-panel icons
// 		if (!event.target.classList.contains("control-panel-icon") && !event.target.classList.contains("tag")){
// 		    $(entry).not($("[edit-mode='true']")).find(".control-panel").slideToggle();
// 		}
// 		// alert("Single Click");
// 		clicks = 0;
// 	    }, DELAY);
// 	} else {
// 	    clearTimeout(timer);
// 	    // alert("Double Click");
// 	    clicks = 0;
// 	}
//     }).on("dblclick", function(e) {
// 	e.preventDefault();
//     });
// });

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

function csrfSetup() {
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    $.ajaxSetup({
     	beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
    		xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
    	}
    });
}

// function addWord(word, description){
//     console.log("addWord")
//     console.log("word: " + word);
//     console.log("description: " + description);
    
//     // Initialize the Ajax request
//     var csrftoken = getCookie('csrftoken');
//     console.log("csrftoken: " + csrftoken.toString());
//     var xhr = new XMLHttpRequest();
//     $.ajaxSetup({
//      	beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//     		xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//     	}
//     });
//     return $.ajax({
//      	type: 'POST',
//      	url: document.URL + '/voacb/add-entry',
//      	data: { 
//             'word': word, 
//     	    'description': description,
//      	},
//      	success: function(msg){
//             console.log(msg);
//      	},
// 	async: false,
//     }).responseText;
// }
