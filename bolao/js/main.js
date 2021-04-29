
const menuDash = document.getElementById('menuDash');
const cookies = getCookies();

checklog(cookies.auth);


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
                reject(new Error("Houve algum erro na comunicação com o servidor"));
            } 
        });
    });
}