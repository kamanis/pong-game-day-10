function replace(string,from,to){
    //array
    var sfrygh=[];
    //it is a count variable
    var yhu=0;
     for(var i=0;i<=string.length;i++){
      //first getting each element to verify
      var element=string.slice(i,i+1);
      //seperating elements for ex if string is d.j.k and .has to be replaced then taking d,j and k seperately into an array;
  if(element===from){
   sfrygh.push(string.slice(yhu,i));
    yhu=i+1;
  }
    }
    //getting last element
    sfrygh.push(string.slice(yhu,string.length));
    string="";
    //add the array elements to get back the string and insert the to(it is an argument) argument 
    for(var j=0;j<sfrygh.length;j++){
      if(j<sfrygh.length-1){
      string=string+sfrygh[j]+to;
      }else{
        string=string+sfrygh[j];
      }
    }
    return string;
  } 