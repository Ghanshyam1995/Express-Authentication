$(function() {
    var sideBarMode = false;
    $(".toc").on('click', function() {

        var sideBarWidth = $('.layoutItem').width() == 60 ? "250px" : "60px";
        if (sideBarWidth == "60px")
            sideBarMode = false;
        else
            sideBarMode = true;

        $(".layoutItem").animate({ width: sideBarWidth }, 100);

    });

    $(".layoutItem").on('mouseover', function() {

        var sideBarWidth = $('.layoutItem').width();
        if (sideBarMode == false && sideBarWidth == 60) {
            $(".layoutItem").animate({ width: "250px" }, 100);
        }
    });

    $(".layoutItem").on('mouseleave', function() {
        var sideBarWidth = $('.layoutItem').width();
        if (sideBarMode == false && sideBarWidth == 250) {
            $(".layoutItem").animate({ width: "60px" }, 100);
        }
    })
})