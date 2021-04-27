
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

signinForm.addEventListener("submit",function(event){
	event.preventDefault();

	const resp = awaitsendFetch('files/login.php');

    resp.then(result =>{
        let arr = JSON.parse(result);
        let status = arr[0];
        if (status === 200){
//            alert("Seja bem vindo "+resp[1]+" sua permissão é "+resp[2]);
			window.location.href = "main.php";
        }else{
            alert(arr[1]);
        }
       
    });
    resp.catch(error =>{
        alert(error);
    });

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


btnNovo.addEventListener('click',(event)=>{
    event.preventDefault();

    const crip_mail = crip(newemail.value);

    crip_mail.then((email)=>{
        console.log(email);

        const crip_pass = crip(newpass.value);
        crip_pass.then((senha)=>{
            console.log(senha);

            const data = new URLSearchParams();
            data.append("do", "1");
            data.append("email", email);
            data.append("pass", senha);
        
            const myRequest = new Request("commit.php",{
                method : "POST",
                body : data
            })
    
            fetch(myRequest);
    
        });

    })

})


function crip(strval){

	const data = new URLSearchParams();
	data.append("std", '1');
	data.append("str", strval);

	const myRequest = new Request('crip.php',{
		method : "POST",
		body : data
	})

    const resp = new Promise((resolve,reject)=>{
        fetch(myRequest)
        .then( function (response) {

            if(response.status == 200){
                resolve (response.text());
    
            }else{
                reject('internet offline');
            }

        })        
    });

    return resp;

}
