window.addEventListener("scroll",()=>{
  if(window.scrollY!=0){
    header.style.position="fixed";
  }
  else{
    header.style.position="relative";
  }
})

// Integração da ferramenta de Help Desk com o Site (Chat Box)
//<![CDATA[
var ttChatLoaderS = document.createElement('script');
document.tomticketChatLoaderScriptVersion = 2;
ttChatLoaderS.src = 'https://ondata.tomticket.com/scripts-chat/chat.min.js'
+ '?id=EP59760'
+ '&account=3824640P16112022101310'
+ '&autoOpen=0'
+ '&hideWhenOffline=0'
+ '&d=ondata'
+ '&ts=' + new Date().getTime()
+ '&ref=' + encodeURIComponent(document.URL);
document.body.appendChild(ttChatLoaderS);
//]]>