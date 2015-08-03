$(document).ready(function(){
    console.log("document.ready()");
    var header = $("header");
    var navbar = header.find("nav");
    var activeNavItem = navbar.find("li#" + "Home")
    activeNavItem.addClass("active");

    // var overviewImages = $(".overview-image");
    // var overviewColumns = $(".col-sm-4");
    // console.log(overviewImages);
    // console.log(overviewImages.width());
    // console.log(overviewColumns);
    // overviewImages.attr("height", overviewImages.width());

    // $(".overview-image").resize(function(){
    // 	console.log("resize image");
    // });

    // $(".col-sm-4").resize(function(){
    // 	console.log("resize div");
    // });

    // $(window).resize(function(){
    // 	console.log("window resize");
    // 	console.log(overviewImages);
    // 	var overviewImageWidth = $(overviewImages[0]).width();
    // 	overviewImages.attr("height", overviewImageWidth + "px");
    // 	console.log(overviewImageWidth);
    // });
});
