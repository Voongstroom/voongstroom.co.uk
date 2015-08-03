function editEntry(id, word, description){
    console.log("editEntry");
    console.log("id: " + id);
    console.log("word: " + word);
    console.log("description: " + description);
    csrfSetup();
    $.ajax({
     	type: 'POST',
     	url: '/vocab/edit-entry',
     	data: { 
	    'id': id,
            'word': word, 
    	    'description': description,
     	},
     	success: function(msg){
            console.log(msg);
     	},
	async: true,
    })
}

function getEntryElements(args) {
    console.log("getEntryElements");
    args = args === undefined ? {} : args;
    entryElements = $(document.createElement("ul"));
    entryElements.attr("id", "entries");
    entryElements.attr("notebook", args.notebook === undefined ? "" : args.notebook);
    var entries = getEntries(args);
    for(var i=0; i<entries.length; i++) {
	var entry = entries[i];
	var entryElement = buildEntryElement(entry);
	var listElement = $(document.createElement("li"));
	listElement.append(entryElement);
	entryElements.append(listElement);
    }
    console.log("entryElements: ");
    console.log(entryElements);
    return entryElements;
}

function getEntries(args) {
    console.log("getEntries, args: ");
    console.log(args);
    var filters = args.filters === undefined ? [] : args.filters;
    var searchTerms = args.searchTerms === undefined ? [] : args.searchTerms;
    var sortField = args.sortField === undefined ? "alpha" : args.sortField;
    var notebook = args.notebook === undefined ? "" : args.notebook;
    var requestData = {};
    // tags
    // console.log(filters != undefined);
    // console.log(filters.tag != undefined);
    // console.log(filters.tag.length >= 1);
    if(filters != undefined  && filters.tag != undefined && filters.tag.length >= 1) {
	console.log("tags");
	var filtersString = "tag/"
	for(var i=0; i<filters.tag.length; i++){
	    if(i > 0){
		filterString += "+";
	    }
	    filtersString += filters.tag[i];
	}
	requestData.filters = filtersString;
    }
    // search
    if(searchTerms != undefined && searchTerms.length >= 1){
	var searchString = "";
	for(var i=0; i<searchTerms.length; i++){
	    if(i > 0){
		searchString += "+";
	    }
	    searchString += searchTerms[i];
	}
	requestData.searchTerms = searchString;
    }
    // sort
    requestData.sortField = sortField;
    // notebook
    requestData.notebook = args.notebook;
    console.log("json request data");
    console.log(requestData);
    // ajax
    var response = $.ajax({
	type: 'GET',
	url: document.URL + '/get-entries',
	data: requestData,
	dataType: "json",
	success: function(msg){},
	async: false,
    });
    var entries = response.responseJSON;
    return entries;
}

function buildEntryElementTemplate() {
    var entryElement = $(document.createElement("div"));
    entryElement.addClass("entry");
    var wordElement = $(document.createElement("input"));
    wordElement.addClass("word");
    var descriptionElement = $(document.createElement("input"));
    descriptionElement.addClass("description");
    var tagSeparator = $(document.createElement("hr"));
    tagSeparator.addClass("tag-section-separator");
    var tagSection = buildTagSection();
    tagSeparator.hide();
    tagSection.hide();
    entryElement.append(wordElement);
    entryElement.append(descriptionElement);
    entryElement.append(tagSeparator);
    entryElement.append(tagSection);
    return entryElement;
}

function buildEntryElement(entry) {
    var entryElement = buildEntryElementTemplate();
    var wordElement = entryElement.find(".word");
    var descriptionElement = entryElement.find(".description");
    var tagSection = entryElement.find(".tag-section");
    var tagSectionSeparator = entryElement.find(".tag-section-separator");
    var tagElements = entryElement.find(".tags");
    if(entry != undefined) {
	entryElement.attr("id", entry.id);
	entryElement.attr("popularityRating", entry.popularity_rating);
	wordElement.attr("value", entry.word);
	descriptionElement.attr("value", entry.description);
	for(var i=0; i<entry.tags.length; i++) {
    	    var tag = entry.tags[i];
    	    var tagElement = buildTagElement(tag);
	    var tagElementListElement = $(document.createElement("li"));
	    var deleteIcon = $(document.createElement("img"));
    	    deleteIcon.addClass("tag-delete-icon");
    	    deleteIcon.attr("src", "/static/vocab/user_index/delete_icon.png");
    	    deleteIcon.attr("width", "10px");
    	    deleteIcon.attr("height", "10px");
	    deleteIcon.hide();
	    tagElementListElement.append(tagElement);
	    tagElementListElement.append(deleteIcon);
    	    tagElements.append(tagElementListElement);
	    tagSectionSeparator.show();
	    tagSection.show();
	}
    }
    return entryElement;
}

function buildNewEntryElement() {
    var entryElement = buildEntryElementTemplate();
    entryElement.addClass("new-entry");
    entryElement.attr("edit-mode", true);
    var wordElement = entryElement.find(".word");
    wordElement.attr("placeholder", "New word");
    var descriptionElement = entryElement.find(".description");
    descriptionElement.attr("placeholder", "Description");
    var separator = $(document.createElement("hr"));
    separator.addClass("control-panel-separator");
    var controlPanel = ControlPanelBuilder(true)();
    var editIcon = controlPanel.find(".edit-icon");
    editIcon.removeClass("edit-icon");
    editIcon.addClass("save-icon");
    editIcon.attr("src", "/static/vocab/user_index/save_icon.png");
    entryElement.append(separator);
    entryElement.append(controlPanel);
    controlPanel.find(".control-panel-icon").not(editIcon).hide();
    return entryElement;
}

function buildTagElement(tag) {
    tag = tag === undefined ? "" : tag;
    var tagElement = $(document.createElement("input"));
    tagElement.addClass("tag");
    tagElement.val(tag);
    tagElement.attr("placeholder", "New tag");
    // if(tag != "") {
    // 	tagElement.prop("disabled", true);
    // }
    return tagElement;
}

function buildTagSection() {
    var tagSection = $(document.createElement("section"));
    tagSection.addClass("tag-section");
    var tagLabel = $(document.createElement("div"));
    tagLabel.addClass("tag-label");
    tagLabel.text("Tags");
    var tags = $(document.createElement("ul"));
    tags.addClass("tags");
    tagSection.append(tagLabel);
    tagSection.append(tags);
    return tagSection;
}

function checkIfUserIsAuthor() {
    console.log("checkIfUserIsAuthor");
    var response = $.ajax({
	type: 'GET',
	url: document.URL + '/check-if-user-is-author',
	success: function(msg) {
	    console.log(msg);
	},
	async: false,
    }).responseText;
    return response == "1";
}

function ControlPanelBuilder(userIsAuthor) {
    if (userIsAuthor) {
	return function () {
	    // Author Control Panel 
	    console.log("Build author control panel");
	    var controlPanel = $(document.createElement("div"));
	    controlPanel.addClass("control-panel");
	    var editIcon = $(document.createElement("img"));
	    editIcon.attr("width", "35px");
	    editIcon.attr("src", "/static/vocab/edit_icon.png");
	    editIcon.addClass("control-panel-icon edit-icon");
	    var tagIcon = $(document.createElement("img"));
	    tagIcon.attr("width", "35px");
	    tagIcon.attr("src", "/static/vocab/tag_icon.png");
	    tagIcon.addClass("control-panel-icon tag-icon");
	    var favouriteIcon = $(document.createElement("img"));
	    favouriteIcon.attr("width", "35px");
	    favouriteIcon.attr("src", "/static/vocab/favourite_icon.png");
	    favouriteIcon.addClass("control-panel-icon favourite-icon");
	    var commentIcon = $(document.createElement("img"));
	    commentIcon.attr("width", "35px");
	    commentIcon.attr("src", "/static/vocab/user_index/comment_icon.png");
	    commentIcon.addClass("control-panel-icon comment-icon");
	    var deleteIcon = $(document.createElement("img"));
	    deleteIcon.attr("width", "35px");
	    deleteIcon.attr("src", "/static/vocab/delete_icon.png");
	    deleteIcon.addClass("control-panel-icon delete-icon");
	    controlPanel.append(editIcon);
	    controlPanel.append(tagIcon);
	    controlPanel.append(favouriteIcon);
	    controlPanel.append(commentIcon);
	    controlPanel.append(deleteIcon);
	    return controlPanel;
	};
    } else {
	// ObserverControl Panel
	return function () {
	    console.log("building observer control panel");
	    var controlPanel = $(document.createElement("div"));
	    controlPanel.addClass("control-panel");
	    var copyIcon = $(document.createElement("img"));
	    copyIcon.attr("width", "35px");
	    copyIcon.attr("src", "/static/vocab/user_index/copy_icon.png");
	    controlPanel.append(copyIcon);
	    return controlPanel;
	};
    }
}

// Events
$(document).ready(function(){
    // Initialisation
    console.log("main_section.js: document ready");
    var mainSection = $("section#main-section");
    var userIsAuthor = checkIfUserIsAuthor();
    var buildControlPanel = ControlPanelBuilder(userIsAuthor);
    var newEntry = buildNewEntryElement();
    var entries = getEntryElements();
    if(userIsAuthor){
	mainSection.append(newEntry);
    }
    mainSection.append(entries);
    
    // Show control panel
    $(document).on("click", ".entry", function(e) {
	console.log("click .entry");
    	var entry = $(this);
    	var controlPanel = entry.find(".control-panel");
    	var separator = entry.find(".control-panel-separator");
	var target = $(e.target);
    	if(controlPanel.size() == 0) {
    	    separator = $(document.createElement("hr"));
    	    separator.addClass("control-panel-separator");
    	    separator.hide();
    	    controlPanel = buildControlPanel();
    	    controlPanel.hide();
    	    entry.append(separator)
    	    entry.append(controlPanel);
	    separator.hide();
	    controlPanel.hide();
	    separator.slideDown();
	    controlPanel.slideDown();
	}

	// // Toggle control panels
 	// Hide control panels that aren't in edit mode and do not belong to this entry
	// $(".entry").not($(".entry[edit-mode='true']")).not($(entry)).find(".control-panel").slideUp();
	// // Do not toggle control panel if the element clicked belongs to one of these classes
	// var classesToIgnore = ["control-panel-icon", "tag"]; 
	// var ignore = false;
	// for(var i=0; i<classesToIgnore.length; i++) {
	//     var class_ = classesToIgnore[i];
	//     if(target.hasClass(class_)){
	// 	ignore = true;
	//     }
	// }
	// ignore = ignore || entry.attr("edit-mode") == "true";
	// if (!ignore) {
	//     separator.slideToggle();
	//     controlPanel.slideToggle();
	// }   
    });

    // Click edit icon
    $(document).on("click", ".edit-icon", function(e){
	console.log("click .edit-icon");
	var entry = $(this).parents(".entry");
	var word = entry.find(".word");
	var description = entry.find(".description");
	word.prop("disabled", false);
	description.prop("disabled", false);
	description.focus();
	// var tmpStr = description.text(); // should move the cursor to the end of the div but doesn't work
	// description.text('');
	// description.text(tmpStr);
	$(this).removeClass("edit-icon");
	$(this).addClass("save-icon");
	$(this).attr("src", "/static/vocab/user_index/save_icon.png");
	entry.attr("edit-mode", true);
    });

    // Save edits
    $(document).on("click", ".entry .save-icon", function(){
	console.log("click .entry .save-icon");
	var entries = mainSection.find("#entries");
	var entry = $(this).parents(".entry");
	var word = entry.find(".word");
	var description = entry.find(".description");
	console.log("debug");
	console.log(word);
	console.log(description);
	
	if (entry.hasClass("new-entry")) {
	    if(word.val() != "" && description.val() != "") {
		console.log("save new-entry");
		var notebook = entries.attr("notebook");
		csrfSetup();
		var response = $.ajax({
		    type: 'POST',
		    url: document.URL + '/vocab/add-entry',
		    data: {
			word: word.val(),
			description: description.val(),
			notebook: notebook,
		    },
		    success: function(msg){
			var entry = msg;
			console.log("entry");
			console.log(entry);
			var entryElement = buildEntryElement(entry);
			entryElement.hide();
			entries.prepend(entryElement);
			entryElement.slideDown();
		    },
		    async: true
		});
		entry.find("input").val("");
	    }

	} else {
	    word.prop("disabled", true);
	    description.prop("disabled", true);
	    $(this).removeClass("save-icon");
	    $(this).addClass("edit-icon");
	    $(this).attr("src", "/static/vocab/edit_icon.png");
	    editEntry(entry.attr("id"), $.trim(word.val()), $.trim(description.val()));
	    entry.attr("edit-mode", false);
	}
    });

    // Click tag icon
    $(document).on("click", ".tag-icon", function(e) {
	console.log("click .tag-icon");
	var tagIcon = $(this);
	var entryElement = tagIcon.parents(".entry");
	var tags = entryElement.find(".tags");
	var tagSection = entryElement.find(".tag-section");
	var newTag = buildTagElement("");
	newTag.addClass("new-tag");
	var listElement = $(document.createElement("li"));
	var deleteIcon = $(document.createElement("img"));
	deleteIcon.addClass("tag-delete-icon");
	deleteIcon.attr("src", "/static/vocab/user_index/delete_icon.png");
	deleteIcon.attr("width", "10px");
	deleteIcon.attr("height", "10px");
	var addIcon = $(document.createElement("img"));
	addIcon.addClass("tag-add-icon");
	addIcon.attr("src", "/static/vocab/user_index/add_tag_icon.png");
	addIcon.attr("width", "15px");
	addIcon.attr("height", "15px");
	listElement.append(newTag);
	listElement.append(deleteIcon);
	tags.append(listElement);
	tags.after(addIcon);
	tagIcon.removeClass("tag-icon");
	tagIcon.addClass("tag-save-icon");
	tagIcon.attr("src", "/static/vocab/user_index/save_icon.png");
	entryElement.attr("edit-mode", true);
	entryElement.find(".tag-delete-icon").show();
	tagSection.slideDown();
	newTag.focus();
    });

    // Click delete tag icon
    $(document).on("click", ".tag-delete-icon", function(e) {
	console.log("click .tag-delete-icon");
	var listElement = $(this).parent("li");
	var tag = listElement.find(".tag");
	tag.attr("delete", true);
	listElement.hide(function(){
	    listElement.remove();
	});
    });

    // Click add tag icon
    $(document).on("click", ".tag-add-icon", function(e) {
	console.log("click .tag-add-icon");
	var tagIcon = $(this);
	var entryElement = tagIcon.parents(".entry");
	var tags = entryElement.find(".tags");
	var newTag = buildTagElement("");
	newTag.addClass("new-tag");
	var listElement = $(document.createElement("li"));
	var deleteIcon = $(document.createElement("img"));
	deleteIcon.addClass("tag-delete-icon");
	deleteIcon.attr("src", "/static/vocab/user_index/delete_icon.png");
	deleteIcon.attr("width", "10px");
	deleteIcon.attr("height", "10px");
	listElement.append(newTag);
	listElement.append(deleteIcon);
	tags.append(listElement);
	newTag.focus();
    });

    // Click save tag icon
    $(document).on("click", ".tag-save-icon", function(e) {
	var entry = $(this).parents(".entry");
	var newTags = entry.find(".new-tag[delete!=true]").filter(function(){return this.value != ""});
	var emptyTags = entry.find('.new-tag').filter(function(){return this.value == ""});
	var deletedTags = entry.find(".tag[delete=true]").not(".new-tag");
	var tags = entry.find(".tags");
	var addTagIcon = entry.find(".tag-add-icon");
	var deleteTagIcons = tags.find(".tag-delete-icon");
	csrfSetup();
	newTags.each(function() {
	    $.ajax({
		type: 'POST',
		url: '/vocab/add-tag',
		data: {
		    id: entry.attr("id"),
		    tag: $.trim($(this).val()),
		},
		async: true,
	    });
	});
	deletedTags.each(function(){
	    console.log($(this));
	    $.ajax({
		type: 'POST',
		url: '/vocab/delete-tag',
		data: {
		    id: entry.attr("id"),
		    tag: $.trim($(this).val()),
		},
		async: true,
	    });
	});
	emptyTags.remove();
	addTagIcon.remove();
	deleteTagIcons.hide();
	entry.attr("edit-mode", false);
	$(this).removeClass("tag-save-icon");
	$(this).addClass("tag-icon");
	$(this).attr("src", "/static/vocab/user_index/tag_icon.png");
    });

    // Tag Suggestions
    $(document).on("keyup", ".new-tag", function(e) {
	console.log("keyup on .new-tag");
	var newTag = $(this);
	console.log("userInput: " + newTag.val());
	newTag.autocomplete({
	    source: function( request, response ) {
	        $.ajax({
		    url: "/vocab/get-tags",
		    dataType: "json",
		    data: {
			input: request.term
		    },
		    success: function( data ) {
			response(data.tags);
		    }
	        });
	    },
	    minLength: 1,
	    select: function( event, ui ) {
		newTag.val(ui.item.label);
	    }
	});
    });

    // Click tag to filter entries
    $(document).on("click", ".tag", function(e) {
	console.log("click .tag");
	var tag = $(this);
	if(!tag.hasClass(".new-tag")){
	    var mainSection = $("#main-section");
	    var oldEntries = mainSection.find("#entries");
	    var filters = {tag: [tag.val()]};
	    oldEntries.slideUp(function(){
		$(this).remove();
		var entries = getEntryElements({filters: filters});
		entries.hide();
		mainSection.append(entries);
		entries.slideDown();
	    });
	}
    });
    
    // Click toggle icon
    $(document).on("click", ".favourite-icon", function(e) {
	var entryElement = $(this).parents(".entry");
	var entryId = entryElement.attr("id");
	var entryRating = entryElement.attr("popularityRating");
	entryRating = entryRating == "1" ? "0" : "1";
	entryElement.attr("popularityRating", entryRating);
	csrfSetup();
	$.ajax({
     	    type: 'POST',
     	    url: '/vocab/toggle-favourite',
     	    data: { 
		'id': entryId,
		'rating': entryRating, 
     	    },
     	    success: function(msg){
		console.log(msg);
     	    },
	    async: true,
	});
    });
    
    // Click delete icon
    $(document).on("click", ".entry .delete-icon", function(){
 	console.log("click .entry delete-icon");
	var entry = $(this).parents(".entry");
	entry.slideUp();
	csrfSetup();
	$.ajax({
	    type: 'POST',
	    url: document.URL + '/delete-entry',
	    data: {
		'id': entry.attr("id"),
	    }
	});
    });
});

//     // Disable new lines in input divs
//     $(document).on("keydown", ".description, .word, .tag", function(event) {
// 	if(event.keyCode == 13) {
// 	    event.preventDefault();
// 	}
//     });

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

// $(document).ready(function(){


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
