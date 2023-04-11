/*  criado por WEDER SOUSA
*/
var selectedBook="";
var selectBookId=0;
var capitulo=0;

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentQuote = '', currentAuthor = '';

$("#new-quote").click(function() {

$.getJSON('https://raw.githubusercontent.com/weder96/biblia/master/json/aa.json', function(data){
	
  var i=0;
	var j=0;
  var book="";

	for(; i < 1; i++) {
    console.log(book=data[i].book);
		  for(; j < 1; j++) {			       
        console.log(data[i].chapters[j]);
        $.each(data[i].chapters[j], function(n, item) {
          console.log(item[n]);
          $(".quote-text").html(item[n]);          
          $("#author").html(book +" Cap "+(i+1) +" Versiculo "+n);          
          
        });
			  
	  }
	}
	
})
  
});			//fim click
   
$(document).ready(function() {
 $.getJSON('https://raw.githubusercontent.com/weder96/biblia/master/json/aa.json', function(data){
   var i=0;
   var texto="";
   for(; i < data.length; i++) {
    console.log(data[i].book);
     if(i<=38){
    texto = '<input type="radio" name="campo" id="livro" value="'+data[i].book+'">'+ data[i].book+'</input>'
       if(i%4==0){      $('#listas').append(texto+'<br/>');
       }else{
 $('#listas').append(texto);        
       }
     }else{
           texto = '<input type="radio" name="campo" id="livro" value="'+data[i].book+'">'+ data[i].book+'</input>'
      if(i%4==0){      $('#listas2').append(texto+'<br/>');
       }else{
 $('#listas2').append(texto);        
       }
     }
   }
 });
});


 $(document).on('change','#livro',function(){
   console.log(this.value);
   var livro = this.value;
   selectedBook= this.value; 
   
   $('#book').remove(); 
   $("#chapters").empty();   
   $(".quote-text").empty();   
   $("#author").empty(); 
   
   var txt ='<p id="book">'+selectedBook+'</p>';
   $('#livrosbb2').append(txt);
   
   $.getJSON('https://raw.githubusercontent.com/weder96/biblia/master/json/aa.json', function(data){
   var i=0;
     var j=0;
     var txt2="";
   for(; i < data.length; i++) {
     //console.log(data[i].book);
        if(data[i].book===livro){   
          selectBookId=i;
          console.log(data[i].chapters.length);  
          
          $('#chapters').append(txt2);
          
          for(; j < data[i].chapters.length; j++) {
          var texto2 = '<input type="radio" name="campo2" id="cap" value="'+(j+1)+'"><label id="cap2">'+ livro +" - Cap- "+(j+1)+'</label></input>'
      $('#chapters').append(texto2);
          }
          
          }        
   }})
});


 $(document).on('change','#cap',function(){      
   $(".quote-text").empty();   
   $("#author").empty(); 
   var capitulo = this.value;
   var texto3="";
    $.getJSON('https://raw.githubusercontent.com/weder96/biblia/master/json/aa.json', function(data){     
      console.log(selectBookId);
      for(var k in data[selectBookId].chapters) {        
        console.log(k +"-"+ (capitulo-1));
         if((capitulo-1)==k){
           $.each(data[selectBookId].chapters[k], function(x, item) {
             for(var xv in item){
             $(".quote-text").append(xv+" - "+item[xv]+'<br/>');          
          console.log(item[xv]);
             }
          })                        
        }        
   }
      
      
      $("#author").html(selectedBook +" Cap "+ capitulo );      
      
    })  
});