$(document).ready(function(){
	jQuery.fn.CKEditorValFor = function( element_id ){
  		return CKEDITOR.instances[element_id].getData();
	}

	$('.submit').click(function(e) {
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