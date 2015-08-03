/* 
   Friends Section for the sidebar
*/
function getFriendsList() {
    console.log("getFriendsList");
    console.log(document.URL + '/get-friends');
    var response = $.ajax({
	type: 'GET',
	url: document.URL + '/get-friends',
     	success: function(msg){
            console.log(msg);
     	},
	async: false,
    }).responseText;
    users = $.parseJSON(response).users;
    console.log("users");
    console.log(users);
    return users;
}

function buildFriendsElement(section) {
    console.log("buildFriendsElement");
    var friends = getFriendsList();
    return buildFriendsList(friends);
}

function buildFriendsList(friends) {
    console.log("buildFriendsList");
    var friendsList = $(document.createElement("ul"));
    friendsList.attr("id", "friends");
    for(i=0; i<friends.length; i++) {
	var friend = friends[i];
	var listItem = $(document.createElement("li"));
	var friendElement = $(document.createElement("div"));
	var friendLink = $(document.createElement("a"));
	friendElement.addClass("friend");
	friendLink.text(friend);
	friendLink.attr("href", document.URL + '/user/' + friend);
	listItem.append(friendElement);
	friendElement.append(friendLink)
	friendsList.append(listItem)
    }
    return friendsList;
}

$(document).ready(function(){
    console.log("document.ready: friends");
    var sideSection = $("#main-side-section");
    var friendsSection = sideSection.find("#friends");
    var friendsElement = buildFriendsElement();
    friendsSection.append(friendsElement);
});
