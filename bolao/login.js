
const signinText = document.querySelector(".title-text .login");
const signinForm = document.querySelector("form.login");
const signinBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const signupForm = document.querySelector("form.signup");
const btnLogin = document.querySelector("#btnLogin");
const btnSignup = document.querySelector("#btnSignup");

const user = document.querySelector("#edtUser");
const pass = document.querySelector("#edtPass");
const newemail = document.querySelector("#edtNewMail");
const newpass = document.querySelector("#edtNewPass");
const newrepass = document.querySelector("#edtNewRepass");
const btnNovo = document.querySelector("#btnNovo");

signupBtn.onclick = (()=>{
	signinForm.style.marginLeft = "-50%";
	signinText.style.marginLeft = "-50%";
});
signinBtn.onclick = (()=>{
	signinForm.style.marginLeft = "0%";
	signinText.style.marginLeft = "0%";
	return false;
});


// botão login
signinForm.addEventListener("submit",function(event){
	event.preventDefault();

    const data = new URLSearchParams();
    data.append("do", "2");
    data.append("user", user.value);
    data.append("pass", pass.value);

    const myRequest = new Request("commit.php",{
        method : "POST",
        body : data
    })


    const myPromisse = new Promise((resolve,reject) =>{

        fetch(myRequest)
        .then((response)=>{
            console.log(response)
            if (response.status === 200) { 
                resolve(response.text());
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));
            } 

        })
    
    })

    myPromisse.then((json)=>{
        var obj = JSON.parse(json);
        if(obj == null){
            alert('Usuário ou senha incorreto.');
        }else{
            if(obj[6]!='ON'){
                alert('Favor confirmar seu registro no seu email antes de logar.')
            }else{
                alert('Bem vindo... logou com sucesso')
            }
        }
//        console.log(obj)
    })

})

function sendFetch(url){

	const data = new URLSearchParams();
	data.append("edtUser", user.value);
	data.append("edtPass", pass.value);

	const myRequest = new Request(url,{
		method : "POST",
		body : data
	})

    const myPromisse = new Promise((resolve,reject) =>{

        fetch(myRequest)
        .then(function (response){

            if (response.status === 200) { 
                resolve(response.text());
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));
            } 

        });

    });

	return myPromisse;

}

// botão NOVO
btnNovo.addEventListener('click',(event)=>{
    event.preventDefault();

    const data = new URLSearchParams();
    data.append("do", "1");
    data.append("email", newemail.value);
    data.append("pass", newpass.value);

    const myRequest = new Request("commit.php",{
        method : "POST",
        body : data
    })

    fetch(myRequest);

})

