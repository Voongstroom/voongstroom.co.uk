function buildNavbarList(){
    var navbarList = $(document.createElement("ul"));
    var links = {
	Home: "/dino-fitness",
	Nutrition: "/dino-fitness/nutrition",
	Fitness: "/dino-fitness/fitness",
	Sport: "/dino-fitness/sport",
	Blog: "/dino-fitness/blog",
    };
    navbarList.addClass("nav navbar-nav");
    for(var item  in links){
	if(links.hasOwnProperty(item)){
	    listItem = $(document.createElement("li"));
	    anchor = $(document.createElement("a"));
	    listItem.attr("id", item);
	    anchor.text(item);
	    anchor.attr("href", links[item]);
	    navbarList.append(listItem);
	    listItem.append(anchor);
	}
    }
    return navbarList;
}

function buildNavbarButton(dataTarget){
    var navbarButton = $(document.createElement("button"));
    var iconBar1 = $(document.createElement("span"));
    var iconBar2 = $(document.createElement("span"));
    var iconBar3 = $(document.createElement("span"));
    navbarButton.addClass("navbar-toggle");
    navbarButton.attr("type", "button");
    navbarButton.attr("data-toggle", "collapse");
    navbarButton.attr("data-target", "#" + dataTarget);
    iconBar1.addClass("icon-bar");
    iconBar2.addClass("icon-bar");
    iconBar3.addClass("icon-bar");
    navbarButton.append(iconBar1, iconBar2, iconBar3);
    return navbarButton;
}

function buildNavbarCollapse(navbarId){
    var navbarCollapse = $(document.createElement("div"));
    var navbarList = buildNavbarList();
    navbarCollapse.addClass("collapse navbar-collapse");
    navbarCollapse.attr("id", navbarId);
    navbarCollapse.append(navbarList);
    return navbarCollapse;
}

function buildNavbarHeader(navbarId){
    var navbarHeader = $(document.createElement("div"));
    var navbarButton = buildNavbarButton(navbarId)
    var navbarBrand = $(document.createElement("a"));
    navbarHeader.addClass("navbar-header");
    navbarBrand.addClass("navbar-brand");
    navbarBrand.attr("href", "#");
    navbarBrand.text("Dino Fitness");
    navbarHeader.append(navbarButton, navbarBrand);
    return navbarHeader;
}

function buildNavbar(){
    var navbar = $(document.createElement("nav"));
    var container = $(document.createElement("div"));
    var navbarId = "myNavbar";
    var navbarHeader = buildNavbarHeader(navbarId);
    var navbarCollapse = buildNavbarCollapse(navbarId);
    navbar.addClass("navbar navbar-inverse navbar-fixed-top");
    container.addClass("container-fluid");
    navbar.append(container);
    container.append(navbarHeader, navbarCollapse);
    return navbar;
}

function buildHeader(){
    var header = $(document.createElement("header"));
    var navbar = buildNavbar();
    header.append(navbar)
    return header;
}

$(document).ready(function(){
    console.log("document.ready()");
    $("body").prepend(buildHeader());
});
