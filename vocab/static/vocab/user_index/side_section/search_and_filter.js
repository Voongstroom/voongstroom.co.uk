/*
  Search and Filter sidebar section library
*/

function buildSortForm(){
    console.log("buildSortForm");
    var sortForm = $(document.createElement("form"));
    var alphabeticalLabel = $(document.createElement("div"));
    var alphabeticalInput = $(document.createElement("input"));
    var dateLabel = $(document.createElement("div"));
    var dateInput = $(document.createElement("input"));
    sortForm.attr("id", "sort-form");
    alphabeticalLabel.attr("id", "sort-section-alphabetical-label");
    alphabeticalLabel.text("Alphabetical")
    alphabeticalInput.attr("id", "sort-section-alphabetical");
    alphabeticalInput.attr("type", "radio");
    alphabeticalInput.attr("name", "sort-field");
    alphabeticalInput.attr("value", "alpha");
    alphabeticalInput.prop("checked", true);
    dateLabel.attr("id", "sort-section-date-label");
    dateLabel.text("Date");
    dateInput.attr("id", "sort-section-date");
    dateInput.attr("type", "radio");
    dateInput.attr("name", "sort-field");
    dateInput.attr("value", "date");
    sortForm.append(alphabeticalLabel, alphabeticalInput, dateLabel, dateInput);
    return sortForm;
}

function buildSortSection(){
    console.log("buildSortSection");
    var sortSection = $(document.createElement("section"));
    var sortForm = buildSortForm();
    var sortLabel = $(document.createElement("div"));
    sortSection.attr("id", "sort-section");
    sortLabel.attr("id", "sort-section-label");
    sortLabel.text("Sort");
    sortSection.append(sortLabel, sortForm);
    return sortSection;
}

function buildTagsSection(){
    console.log("buildTagsSection");
    var tagsSection = $(document.createElement("section"));
    var tagsLabel = $(document.createElement("div"));
    var tagsInput = $(document.createElement("input"));
    var selectedTags = $(document.createElement("ul"));
    tagsSection.attr("id", "tags-section");
    tagsLabel.attr("id", "tags-section-label");
    tagsLabel.text("Tags");
    tagsInput.attr("id", "tags-section-input");
    selectedTags.attr("id", "selected-tags");
    tagsSection.append(tagsLabel, tagsInput, selectedTags);
    return tagsSection;
}

function buildSearchSection(){
    console.log("buildSearchSection");
    var searchSection = $(document.createElement("section"));
    var searchLabel = $(document.createElement("div"));
    var searchInput = $(document.createElement("input"));
    searchSection.attr("id", "search-section");
    searchLabel.attr("id", "search-label");
    searchLabel.text("Search");
    searchInput.attr("id", "search-input");
    searchSection.append(searchLabel, searchInput);
    return searchSection;
}

function buildSearchAndFilterSection(){
    console.log("buildSearchAndFilterSection");
    var section = $(document.createElement("section"));
    section.addClass("side-section");
    section.attr("id", "search-and-filter-section");
    var title = $(document.createElement("div")).text("Search and Filter");
    title.addClass("title");
    var separator = $(document.createElement("hr"));
    var searchSection = buildSearchSection();
    var tagsSection = buildTagsSection();
    var sortSection = buildSortSection();
    section.append(title, separator, searchSection, tagsSection, sortSection);
    return section;
}

$(document).ready(function(){
    console.log("document.ready: search_and_filter");
    var mainSection = $("#main-section");
    var sideSection = $("#main-side-section");
    var searchAndFilterSection = buildSearchAndFilterSection();
    var searchSection = searchAndFilterSection.find("#search-section");
    var tagsSection = searchAndFilterSection.find("#tags-section");
    var selectedTags = tagsSection.find("#selected-tags");
    var sortSection = searchAndFilterSection.find("#sort-section");
    var sortForm = sortSection.find("#sort-form");
    sideSection.append(searchAndFilterSection);

    // Sort entries
    sortForm.find("input").change(function(){
	var sortInput = sortForm.find("input");
	var checkedInput = sortInput.filter(function(){return $(this).prop("checked") == true;});
	var entryElements = getEntryElements({sortField: checkedInput.val()});
	entryElements.prepend(buildNewEntryElement());	
	entryElements.hide();
	mainSection.empty();
	mainSection.append(entryElements);
	entryElements.slideDown();
    });

    // Search
    searchSection.on("keydown", "#search-input", function(e){
	console.log("submit search");
	var searchInput = $(this);
	if(e.keyCode == 13 && searchInput.val() != ""){
	    var sortInput = sortForm.find("input");
	    var checkedInput = sortInput.filter(function(){return $(this).prop("checked") == true;});
	    var entryElements = getEntryElements({searchTerms: searchInput.val().split(" "), sortField: checkedInput.val()});
	    entryElements.prepend(buildNewEntryElement());	
	    entryElements.hide();
	    mainSection.empty();
	    mainSection.append(entryElements);
	    entryElements.slideDown();
	}
    });

    // Tags
    // Input
    $("#tags-section-input").keyup(function(e){
    	var input = $(this);
	console.log("tags-section-input: " + input.val());
    	input.autocomplete({
    	    source: function(request, response){
    		$.ajax({
    		    type: 'GET',
    		    url: '/vocab/get-tags',
    		    dataType: "json",
    		    data: {
    			input: request.term,
    		    },
    		    success: function(jsonResponse){
    			response(jsonResponse.tags);
    		    },
    		    async: true,
    		});
    	    },
    	    minLength: 1,
    	    select: function(event, ui){
		var tagElement = buildTagElement(ui.item.label);
		var tagDeleteIcon = $(document.createElement("img"));
		var tagListItem = $(document.createElement("li"));
		tagDeleteIcon.addClass("tag-delete-icon");
		tagDeleteIcon.attr("src", "/static/vocab/user_index/delete_icon.png");
		tagDeleteIcon.attr("width", "15px;");
		tagListItem.append(tagElement, tagDeleteIcon);
		tagListItem.hide();
		selectedTags.append(tagListItem);
		tagListItem.slideDown();
		// filter entries
		var filters = {}
		filters.tag = []
		selectedTags.find("input.tag").each(function(index){
		    filters.tag[filters.tag.length] = $(this).val();
		});
		// populate the main section
		mainSection.empty();
		var entries = getEntryElements(filters);
		entries.prepend(buildNewEntryElement());
		entries.hide();
		mainSection.append(entries);
		entries.slideDown();
		// finalise
    		input.val("");
		return false;
    	    }
    	});
    });

    // Remove tag from selected tags
    selectedTags.on("click", ".tag-delete-icon", function(){
	console.log("click on selectedTags .tag-delete-icon");
	// filter entries
	var filters = {}
	filters.tag = []
	var listItem = $(this).parents("li");
	listItem.remove();
	selectedTags.find("input.tag").each(function(index){
	    filters.tag[filters.tag.length] = $(this).val();
	});
	// populate the main section
	mainSection.empty();
	var entries = getEntryElements(filters);
	entries.prepend(buildNewEntryElement());
	entries.hide();
	mainSection.append(entries);
	entries.slideDown();
    });

    // Clicking on a tag puts it in the selected tags
    $(document).on("click", ".tag", function(e){
	console.log("click .tag");
	selectedTags.empty();
	var tagElement = $(this);
	if(tagElement.hasClass(".new-tag")){
	    return;
	} else {
	    var isInselectedTags = selectedTags.find(".tag").filter(function(){return $(this).val() == tagElement.val();}).size() >= 1;
	    if(!isInselectedTags){
		var tagDeleteIcon = $(document.createElement("img"));
		var tagListItem = $(document.createElement("li"));
		tagDeleteIcon.addClass("tag-delete-icon");
		tagDeleteIcon.attr("src", "/static/vocab/user_index/delete_icon.png");
		tagDeleteIcon.attr("width", "15px;");
		tagListItem.append(tagElement.clone(), tagDeleteIcon);
		tagListItem.hide();
		selectedTags.append(tagListItem);
		tagListItem.slideDown();
	    }
	}
    });
});
