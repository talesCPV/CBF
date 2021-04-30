
//Object Cookie
const cookies = getCookies();
checklog(cookies.auth);

//Object Menu
const menu = new Object;
menu.dashboard = document.getElementById('menuDash');
menu.rodada = document.getElementById('menuRod');
menu.logout = document.getElementById('menuOut');

menu.dashboard.addEventListener('click',()=>{
    console.log( cookies.auth);
})


menu.rodada.addEventListener('click',()=>{
    console.log(  sessionStorage.getItem("auth") );
})


menu.logout.addEventListener('click',()=>{
    alert(2);
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log( document.cookie);
})


function getCookies(){
    const memCookie = document.cookie.split(';');
    const resp = new Object;

    for(let i=0; i<memCookie.length; i++){
        const reg = memCookie[i].split('=');
        if(reg.length > 0){
            resp[reg[0]] = reg[1];
        }
    }

    return resp;
}

function checklog(auth){

    const data = new URLSearchParams();
    data.append("do", "3");
    data.append("auth", auth);

    const myRequest = new Request("files/commit.php",{
        method : "POST",
        body : data
    })

    const myPromisse = new Promise((resolve,reject) =>{
        
        fetch(myRequest)
        .then((response)=>{
            console.log(response);
            if (response.status === 200) { 
                resolve(response.text());
            } else { 
                reject(window.location.replace("index.html"));
            } 
        });
    });

    myPromisse.then((user)=>{
        if(user.length == 0){
            window.location.replace("index.html");
        }
        console.log(user);
    });

}