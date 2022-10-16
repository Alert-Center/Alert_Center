window.addEventListener("scroll",()=>{
  if(window.scrollY!=0){
    header.style.position="fixed";
  }
  else{
    header.style.position="relative";
  }
})