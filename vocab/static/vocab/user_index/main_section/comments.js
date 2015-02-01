// Build Comments Section
function buildCommentsSection(entryElement) {
    console.log("buildCommentsElement: " + entryElement.attr("id"));
    var commentsSection = $(document.createElement("section"));
    commentsSection.addClass("comments-section");
    var separator = $(document.createElement("hr"));
    var commentsListElement = $(document.createElement("ul"));
    commentsListElement.addClass("comments");
    commentsSection.append(separator);
    commentsSection.append("Comments");
    commentsSection.append(commentsListElement);
    var comments = getComments(entryElement.attr("id"));
    for(var i=0; i<comments.length; i++){
	var comment = comments[i];
	var commentElement = buildCommentElement(comment);
	var listEntryElement = $(document.createElement("li"));
	listEntryElement.addClass("comments-list-entry");
	commentsListElement.append(listEntryElement);
	listEntryElement.append(commentElement);
    }
    var newCommentElement = buildCommentElement();
    commentsSection.append(newCommentElement);
    var newCommentSubmitButton = $(document.createElement("button"));
    newCommentSubmitButton.addClass("comment-submit-button");
    newCommentSubmitButton.text("Submit");
    commentsSection.append(newCommentSubmitButton);
    return commentsSection;
}

// Build Comment Element
function buildCommentElement(comment) {
    var commentElement = $(document.createElement("div"));
    commentElement.addClass("comment");
    var userElement = $(document.createElement("div"));
    userElement.addClass("user");
    var commentContentElement = $(document.createElement("input"));
    commentContentElement.addClass("comment-content");
    commentContentElement.attr("placeholder", "Comment");
    var commentInfoElement = $(document.createElement("div"));
    commentInfoElement.addClass("comment-info");
    if(comment != undefined){
	userElement.text(comment.author);
	commentContentElement.val(comment.content);
	commentContentElement.prop("disabled", true);
	commentInfoElement.text(comment.entry_date);
    } else {
	commentElement.addClass("new-comment");
    }
    commentElement.append(userElement);
    commentElement.append(commentContentElement);
    commentElement.append(commentInfoElement);
    // var newCommentElement = $(document.createElement("div"));
    // newCommentElement.addClass("comment new-comment");
    // var newCommentInput = $(document.createElement("input"));
    // newCommentInput.attr("placeholder", "Comment");
    // newCommentElement.append(newCommentInput);
    return commentElement;
}

// Get Comments
function getComments(entryId){
    console.log("getComments: " + entryId);
    var response = $.ajax({
	type: 'GET',
	url: '/vocab/get-comments',
	data: {id: entryId},
	success: function(msg){console.log(msg);},
	async: false,
    });
    console.log("response");
    console.log(response.responseText);
    console.log(response.responseJSON);
    console.log(response);
    var comments = response.responseJSON;
    return comments;
}

$(document).ready(function(){
    // Click comments
    $(document).on("click", ".comment-icon", function(){
	console.log("click .comment-icon");
	var entry = $(this).parents(".entry");
	var controlPanel = entry.find(".control-panel");
	var commentsSection = controlPanel.find(".comments-section");
	if(commentsSection.size() == 0){
	    commentsSection = buildCommentsSection(entry);
	    commentsSection.hide();
	    controlPanel.append(commentsSection);
	}
	commentsSection.slideDown();
    });

    // Submit comment
    $(document).on("click", ".comment-submit-button", function(){
	console.log("click .comment-submit-button");
	var entry = $(this).parents(".entry");
	var commentsSection = entry.find(".comments-section");
	var comments = commentsSection.find(".comments");
	var newComment = commentsSection.find(".new-comment");
	var commentContent = newComment.find(".comment-content");
	var commentListItem = $(document.createElement("li"));
	comments.append(commentListItem);
	csrfSetup();
	$.ajax({
	    type: 'POST',
	    url: 'vocab/submit-comment',
	    data: {
		id: entry.attr("id"),
		comment: commentContent.val(),
	    },
	    success: function(msg){
		console.log(msg);
		console.log(msg.responseJSON);
		var comment = buildCommentElement(msg);
		comment.hide();
		commentListItem.append(comment);
		comment.slideDown();
	    },
	    async: true,
	});
    });
});
