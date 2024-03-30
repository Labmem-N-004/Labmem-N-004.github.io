let myimage=document.querySelector("img");
myimage.onclick=function(){
    let mySrc=myimage.getAttribute("src");
    if(mySrc === "images/5.jpg"){
        myimage.setAttribute("src","images/2.jpg");
    }
    else{
        myimage.setAttribute("src","images/5.jpg");
    }
}
let userBotton=document.querySelector("button");
let myName=document.querySelector("h2");
function setUserName(){
    let name=prompt("please input your username");
    if(!name)
        name="用户名"
    localStorage.setItem("name",name);
    myName.textContent = name;
}
if(!localStorage.getItem("name")){
    setUserName();
}
else{
    let strogeName=localStorage.getItem("name");
    myName.textContent=strogeName;
}
userBotton.onclick=function(){
    setUserName();
}
