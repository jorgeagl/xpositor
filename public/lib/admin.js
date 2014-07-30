$(document).ready(function(){
	//hover
	$('.admin-left').find('li').click(function(e){
		$('.admin-left').find('li').removeClass('activo');
		var el = $(e.currentTarget);
		$(el).addClass('activo');

	});
	//ADD.NEW

	CKEDITOR.replace( 'editor1', {
	    on: {
	        instanceReady: function() {
	            CKEDITOR.instances['ckeditor'].setData('<p>Hola buenas tardes</p>');
	        },
	        key: function() {
	            $('.preview').html(CKEDITOR.instances['ckeditor'].getData());
	        }
	    }
	} );

	$('.saveAll').click(function(e) {
	  	e.preventDefault();
	  	
	  	var html =  CKEDITOR.instances['ckeditor'].getData();
	  	$.ajax({
	  		type:'POST',
	  		url:'/convert',
	  		dataType:'json',
	  		data:{html:html}
	  	});
	  	
            
    });
	//$('.preview').html(html);
	   
	
})