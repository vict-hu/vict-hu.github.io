$(document).ready(function() {

	$('.carousel').each(function() {
		var c = $(this);

		var fimage = c.find('.image:first');
		var others = c.find('.image:not(:first)')
		others.hide();
	});

	$('.image').click(function(e) {
		var next = $(this).next();
		if(next.size()==0) {
			var c = $(this).closest('.carousel');
			next = c.find('.image:first');
		}
		$(this).hide();
		
		next.show();
	})

}); 
