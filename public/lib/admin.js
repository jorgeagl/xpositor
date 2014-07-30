$(document).ready(function(){
	
	$('.slides').load('/ .slide');
		

	
	CKEDITOR.replace( 'editor1', {
		height: 480,
	    on: {
	        instanceReady: function() {

	            
	            for (var i = 1; i < $('.slides').find('.slide').length; i++) {
				    $('.admin-left > ul ').append('<li id="'+i+'"><span class="glyphicon glyphicon-list-alt"></span><span class="paginas-admin"> PAGINA-'+i+'</span><span class="glyphicon glyphicon-trash pull-right removePagina" style="color:rgba(255, 0, 25, 0.80)"></span></li>');
				}
				$('.admin-left').find('li:nth-child(2)').addClass('activo');
	            $getHtml = $('.slides').find('.slide:nth-child(1)').html(); // EXTRACT HTML TO TEXT
	            CKEDITOR.instances['ckeditor'].setData($getHtml); // ADD SKEDITOR

	            //Hover and Add elements to CKEDITOR
				$('.admin-left').find('li').click(function(e){
					$('.admin-left').find('li').removeClass('activo');
					var el = $(e.currentTarget);
					$(el).addClass('activo');
					$id = $(this).attr('id'); //id this
					$getHtml = $('.slides').find('.slide:nth-child('+$id+')').html();
					CKEDITOR.instances['ckeditor'].setData($getHtml);
				});


				//ADD.NEW
				$('.add').click(function(){
					//$().attr();
				});
				//REMOVE 
				$('.removePagina').click(function(e){
					var $el = $(e.currentTarget).parent();
					$par = $el.attr('id');
					
					$(e.currentTarget).hide();
					$el.append('<button class="btn btn-danger pull-right" style="margin:-8px 0;">Eliminar</button>');
					//console.log($el.blur());

					$el.find('.btn-danger').click(function(){
						var $next = $('.admin-left').find('ul > .activo').next();
						$el.remove().delay(800);
						$next.trigger('click');
						

						
					});
					
				});

	            
	        },
	        key: function() {
	            //$('.preview').html(CKEDITOR.instances['ckeditor'].getData());
	        }
	    }
	 } );

	$('form').submit(function(e){
		e.preventDefault();
		var $remplaza = CKEDITOR.instances['ckeditor'].getData();
		var $selector = $('.admin-left > ul > li.activo').attr('id');

		$('.slides').find('.slide:nth-child('+$selector+')').html($remplaza);
	});

	$('.saveAll').click(function(e) {
	  	e.preventDefault();
	  	//console.log($('.slides').html());
	  	
	  	var html = $('#paginas').html();
	  	//var inner = html.wrapInner('<div class="slides"></div>');
	  	$.ajax({
	  		type:'POST',
	  		url:'/convert',
	  		dataType:'json',
	  		data:{html:html}
	  	});   
    });
	//$('.preview').html(html);	
});