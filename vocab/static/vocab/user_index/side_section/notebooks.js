// /* 
//    Notebooks Section
// */

function getNotebooks(){
    console.log("getNotebooks");
    var response = $.ajax({
	type: 'GET',
	url: document.URL + '/get-notebooks',
	async: false,
    });
    console.log("notebooks: ");
    console.log(response.responseJSON);
    return response.responseJSON;
}

function buildNotebookList(){
    console.log("buildNotebookList");
    var notebooks = getNotebooks();
    var notebookList = $(document.createElement("ul"));
    notebookList.attr("id", "notebooks");
    for(var i=0; i<notebooks.length; i++){
	var notebook = notebooks[i];
	var listItem = $(document.createElement("li"));
	var notebookElement = buildNotebookElement(notebook);
	listItem.append(notebookElement);
	notebookList.append(listItem);
    }
    console.log("notebookList:");
    console.log(notebookList);
    return notebookList;
}

function buildNotebookElement(notebook){
    console.log("buildNotebookElement");
    var notebookElement = $(document.createElement("input"));
    notebookElement.addClass("notebook");
    if(notebook != undefined){
	notebookElement.val(notebook.name);
	notebookElement.prop("disabled", true);
    } else {
	notebookElement.val("New notebook");
    }
    return notebookElement;
}

function buildAddNotebookInput(){
    console.log("buildAddNotebookInput");
    var addNotebookInput = $(document.createElement("input"));
    addNotebookInput.attr("id", "add-notebook-input");
    addNotebookInput.prop("placeholder", "Notebook Name");
    return addNotebookInput;
}

function buildAddNotebookButton(disabled){
    console.log("buildNotebookButton");
    var addNotebookButton = $(document.createElement("button"));
    addNotebookButton.attr("id", "add-notebook");
    addNotebookButton.text("Add Notebook");
    addNotebookButton.prop("disabled", disabled);
    return addNotebookButton;
}

$(document).ready(function(){
    console.log("document.ready: notebooks");
    var mainSection = $("#main-section");
    var sideSection = $("#main-side-section");
    var notebooksSection = sideSection.find("#notebooks");
    var addNotebookInput = buildAddNotebookInput();
    var addNotebookButton = buildAddNotebookButton(true);
    var notebookList = buildNotebookList();
    notebooksSection.append(addNotebookInput);
    notebooksSection.append(addNotebookButton);
    notebooksSection.append(notebookList);

    // Filter on notebook
    notebookList.on("click", "li", function(e){
	console.log("click notebookList li");
    // notebookList.on("click", ".notebook", function(e){
    // 	console.log("click .notebook");
	var notebook = $(this).find(".notebook").val(); //$(this).val();
	var oldEntries = mainSection.find("#entries");
	var filter = {'notebook': notebook};
	var entries = getEntryElements(filter);
	oldEntries.slideUp(function(){$(this).remove();});
	entries.hide();
	mainSection.append(entries);
	entries.slideDown();
	entries.attr("notebook", notebook);
    });

    // Add Notebook - Check input
    addNotebookInput.keyup(function(){
	console.log("addNotebookInput.keyup")
	console.log($(this).val());
	addNotebookButton.prop("disabled", $(this).val() == "");
    });
    
    // Add Notebook - Click addNotebookButton
    addNotebookButton.click(function(){
	console.log("click addNotebookButton");
	var addNotebookInput = notebooksSection.find("#add-notebook-input");
	csrfSetup();
	$.ajax({
	    type: "POST",
	    url: "/vocab/add-notebook",
	    data: {name: addNotebookInput.val()},
	    dataType: "json",
	    success: function(msg){
		var listItem = $(document.createElement("li"));
		var newNotebook = buildNotebookElement(msg);
		newNotebook.hide();
		listItem.append(newNotebook);
		notebookList.append(listItem);
		newNotebook.slideDown();
		addNotebookInput.val("");
	    },
	    async: true,
	});
    });
});


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
//     return buildFriendsList(friends);
// }

// function buildFriendsList(friends) {
//     console.log("buildFriendsList");
//     var friendsList = $(document.createElement("ul"));
//     friendsList.attr("id", "friends");
//     for(i=0; i<friends.length; i++) {
// 	var friend = friends[i];
// 	var listItem = $(document.createElement("li"));
// 	var friendElement = $(document.createElement("div"));
// 	var friendLink = $(document.createElement("a"));
// 	friendElement.addClass("friend");
// 	friendLink.text(friend);
// 	friendLink.attr("href", document.URL + '/user/' + friend);
// 	listItem.append(friendElement);
// 	friendElement.append(friendLink)
// 	friendsList.append(listItem)
//     }
//     return friendsList;
// }

// $(document).ready(function(){
//     console.log("document.ready: friends");
//     var sideSection = $("#main-side-section");
//     var friendsSection = sideSection.find("#friends");
//     var friendsElement = buildFriendsElement();
//     friendsSection.append(friendsElement);
// });
