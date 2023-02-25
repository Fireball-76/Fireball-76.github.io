/* Prima Jquery functionality */

$(document).ready(function() {
	$(".enlarge a").each(function() {
		$(this).attr("href", $(this).parent(".enlarge").siblings("img").attr("src"));
		$(this).parent(".enlarge").siblings("img").css("cursor", "pointer").click(function() {
			$(this).siblings(".enlarge").children("a").click();
		});;
	});

	$(".enlarge a").fancybox({
		
		});


	$(".game_latest_screenshot a").fancybox({
		onComplete	:	function() {
				$("#fancybox-content").each(function() {
					current_html = $(this).html();
					$(this).html("<div id='lightbox'><div id='lightbox_container'><div id='loginbox'><span class='close'><a href='javascript:$.fancybox.close();'>close</a></span>" + current_html + "</div></div></div>");
				});
		}
	});

});



$(document).ready(function() {



	$("#loginlink").fancybox({
		'titleShow'     : false,
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		onStart		:	function() {
			$("#login_lightbox").show();
		},
		onClosed	:	function() {
            $("#login_lightbox").hide();
		}
	}); 
	

	if (window._reportType)
	{
		$(".reportlink").click(function() {
			_reportPK = $(this).attr("rel");
		});

		$(".reportlink").fancybox({
			'titleShow'     : false,
			'easingIn'      : 'easeOutBack',
			'easingOut'     : 'easeInBack',
			onStart		:	function() {
				$("#report_lightbox").show();

				$("#report_content_pk").val(_reportPK);
				$("#report_content_type").val(_reportType);
			},
			onClosed	:	function() {
				$("#report_lightbox").hide();
			}
		}); 
	}
	else
	{
		$(".reportlink").click(function() {
			alert("Reporting not supported here");
		});
	}


	$("#loginform").submit(function(e) {
		e.preventDefault();
		$(this).attr("action", "/accounts/login?next=" + _nextLink)
		var _errorContainer = $(this).children(".errors").hide();
		$.post('/accounts/login', $(this).serialize(), function(data) {
			if (data == "1")
			{
				// Successful login, redirect
				window.location = _nextLink;
			}
			else if (data == "fp")
			{
				_errorContainer.show();
				_errorContainer.text("An email with instructions to reset your password has been sent");
			}
			else if (data == "fpe")
			{
				_errorContainer.show();
				_errorContainer.text("Your account was not found. Please try again.");
			}
			else
			{
				// Bad login
				_errorContainer.show();
				_errorContainer.text("Invalid username or password. Please try again.");
			}
		});
	});


	$("#registerform").submit(function(e) {
		e.preventDefault();
		$(this).attr("action", "/accounts/register?next=" + _nextLink)
		var _errorContainer = $(this).children(".errors").hide();
		$.post('/accounts/register', $(this).serialize(), function(data) {
			if (data == "1")
			{
				// Successful registration, redirect
				window.location = _nextLink;
			}
			else
			{
				// Bad login
				_errorContainer.show();
				_errorContainer.text(data);
			}
		});
	});





	$("#registerlink").fancybox({
		'titleShow'     : false,
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		onStart		:	function() {
			$("#register_lightbox").show();
		},
		onClosed	:	function() {
            $("#register_lightbox").hide();
		}
	}); 

	$("#cartlink").fancybox({
		'titleShow'     : false,
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		onStart		:	function() {
			$("#cart_lightbox").show();
		},
		onClosed	:	function() {
            $("#cart_lightbox").hide();
		}
	}); 



	$(".login_required").click(function(e) {
		if (!_loggedIn)
		{
			e.preventDefault();
			// Applied to all links where login is required
			_nextLink = $(this).attr("href");
			$("#loginlink").click();
			return false;
		}
	});

	if (window.location.hash)
	{
		// There is a hash in the URL, check whether we need to show something special
		if (window.location.hash == "#cart_lightbox")
		{
			setTimeout('$("#cartlink").click();', 1000);
		}
	}





	searchIdleTimeout = false;
	$("#search_dropdown").hide();
	$("#globalsearch").keyup(function(e) {
		if ((e.which <= 90 && e.which >= 48) || (e.which == 8) || (e.which == 32)) {
			if (searchIdleTimeout)
			{
				// If there is already a timeout set
				clearTimeout(searchIdleTimeout);
			}
			searchIdleTimeout = setTimeout("doGlobalSearch()", 500);
		}
	});
});


function doGlobalSearch() {
	$("#search_dropdown").html("<p style='text-align: center;'><img src='/media/images/ajaxload_bar.gif' alt='Loading results'/></p>");
	query = $("#globalsearch").val();

	$("#search_dropdown").show();


	$.post('/quicksearch/', {'searchquery': query}, function(data) {
		$('#search_dropdown').html(data);
		$("div").bind("click.globalsearch", function() {
			$("#search_dropdown").hide();
			$("div").unbind("click.globalsearch");
		});
		$("body").bind("click.globalsearch", function() {
			$("#search_dropdown").hide();
			$("body").unbind("click.globalsearch");
		});


	});
}


function loginToRegister() {
	javascript:$.fancybox.close(); 
	setTimeout("$('#registerlink').click()", 1500);
}

function goToNext() {
	// Go to the next page after logging in
	window.location = _nextLink;
}


$(document).ready(function() {
	$(".homepage_next").live("click", function(e) {
		parentBlock = $(this).closest(".dynamic_block");
		parentBlockId = parentBlock.attr("id");
		current_page = parseInt(parentBlock.attr("rel"));

		next_page = current_page + 1;


		parentBlock.load('/ajax/' + parentBlockId + "/" + next_page, function() {
			parentBlock.attr("rel", String(next_page));
		});

		parentBlock.fadeOut(function() {
			parentBlock.fadeIn();
		});

		e.preventDefault();
	});


	$(".homepage_prev").live("click", function(e) {
		parentBlock = $(this).closest(".dynamic_block");
		parentBlockId = parentBlock.attr("id");
		current_page = parseInt(parentBlock.attr("rel"));

		next_page = current_page - 1;

		parentBlock.load('/ajax/' + parentBlockId + "/" + next_page, function() {
				parentBlock.attr("rel", String(next_page));
				
		});
		
		parentBlock.fadeOut(function() {
			parentBlock.fadeIn();
		});
		
		e.preventDefault();
	});





	$("#forgotpasswordlink").click(function(e) {
		e.preventDefault();
		
		$(this).hide();
		$("#loginpasswordblock").hide();
		$("#loginsubmitbutton").text("Send password");
		$("#loginaction").val("password");

	});


});


$(document).ready(function() {
	$(".guide_contents_sectiontitle a").click(function(e) {
		e.preventDefault();
		$(this).parents("dl").toggleClass("open");

	});
});

$(document).ready(function() {

	//$("#offsitefeature_link").fancybox();


	$("#offsitefeature_link").fancybox({
		'autoDimensions': false,
		'width'			: "95%",
		'height'		: "95%",
		'titleShow'     : false,
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		onStart		:	function() {
			$("#offsitefeature_lightbox").show();
			$("#lightbox_container").css("height", "100%");
			$("#lightbox_container").css("width", "100%");
			$("#offsitefeature_lightbox").css("height", "90%");
			$("#loginbox").css("height", "100%");
			$("#lightbox").css("height", "100%");
		},
		onClosed	:	function() {
            $("#offsitefeature_lightbox").hide();
		}
	}); 


	$(".offsitefeature").parent("a").click(function(e) {
		e.preventDefault();
		$("#offsitefeature_iframe").attr("src", $(this).attr("href"));
		$("#offsitefeature_link").click();
	});
});