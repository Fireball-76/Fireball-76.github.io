$(document).ready(function() {
	// Hide all tabbed sections
	$(".tabbed_section").hide();
	$(".tabbed_nav_container").each(function() {
		// Loop through each tabbed container, and show the first tab of each
		$(this).find(".tabbed_section:first").show();
	});
	$(".tabbed_nav_container .tabbed_nav a").click(function() {
		toShow = $(this).attr("href");
		$(this).parents(".tabbed_nav").find(".current").removeClass("current");
		$(this).parents("li").addClass("current");
		$(this).parents(".tabbed_nav_container").find(".tabbed_section:visible").fadeOut(250, function() {
			$(toShow).fadeIn(250);
		});
		return false;
	});


	$(".blankdefault").each(function() {
		$(this).attr("rel", $(this).val());
		$(this).focus(function() {
			if ($(this).val() == $(this).attr("rel"))
			{
				$(this).val("");
			}
		});
		$(this).blur(function() {
			if ($(this).val() == "")
			{
				$(this).val($(this).attr("rel"));
			}
		});
	});

});