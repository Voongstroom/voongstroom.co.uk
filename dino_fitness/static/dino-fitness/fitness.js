$(document).ready(function(){
    console.log("document.ready()");
    var header = $("header");
    var navbar = header.find("nav");
    var activeNavItem = navbar.find("li#" + "Fitness")
    activeNavItem.addClass("active");
});
