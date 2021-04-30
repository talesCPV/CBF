
//Object Cookie
checklog(sessionStorage.getItem("auth"));

//Object Menu
const menu = new Object;
menu.dashboard = document.getElementById('menuDash');
menu.rodada = document.getElementById('menuRod');
menu.logout = document.getElementById('menuOut');

menu.dashboard.addEventListener('click',()=>{
//    console.log( cookies.auth);
})


menu.rodada.addEventListener('click',()=>{
    console.log(sessionStorage.getItem("auth") );
})


menu.logout.addEventListener('click',()=>{
    sessionStorage.setItem("auth", "");
    window.location.replace("index.html");
   
})

function checklog(auth){

    if(auth == ""){
        window.location.replace("index.html");
    }

}