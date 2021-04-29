
const menuDash = document.getElementById('menuDash');
const cookies = getCookies();

menuDash.addEventListener('click',()=>{
    console.log( cookies.auth);
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