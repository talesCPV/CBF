
  // Variáveis

  const ano = 2020;
  const auth = sessionStorage.getItem("auth");

  let campeonato = [];
  getScore(ano);
  console.log(campeonato);
  
  //Object Cookie
  checklog(sessionStorage.getItem("auth"));
  
  //Object Menu
  const menu = new Object;
  menu.dashboard = document.getElementById('menuDash');
  menu.rodada = document.getElementById('menuRod');
  menu.logout = document.getElementById('menuOut');
  
  menu.dashboard.addEventListener('click',()=>{

    alert(JSON.stringify( campeonato ));


    const data = new URLSearchParams();
    data.append("do", "4");
    data.append("json", JSON.stringify( campeonato ));
    data.append("ano", ano);

    const myRequest = new Request("files/commit.php",{
        method : "POST",
        body : data
    })

//    const resp = fetch(myRequest);


  })
  
  
  menu.rodada.addEventListener('click',()=>{
      console.log(auth );
  })
  
  
  menu.logout.addEventListener('click',()=>{
      sessionStorage.setItem("auth", "");
      window.location.replace("index.html");
     
  })
  
  function checklog(auth){
      if(auth == null || auth == ""){
          window.location.replace("index.html");
      }
  }
  
  function openMenu() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
    
  const btnVer = document.getElementById('btnVer');
  
/*  
  btnVer.addEventListener('click',()=>{
      const rod = campeonato[edtRod.value - 1];
  
      let tab = "<table>";
  
      for(let i=0; i< rod.length; i++){
          console.log(rod[i]);
          tab += `
              <tr>
                  <td>${rod[i].data}</td>            
                  <td><img src="${rod[i].mandante.logo}" width="50" height="50"></td>
                  <td>${rod[i].mandante.placar}</td>
                  <td>x</td>
                  <td>${rod[i].visitante.placar}</td>
                  <td><img src="${rod[i].visitante.logo} width="50" height="50""></td>
              </tr>
          
          `;
      }
      tab += "</table>";
  
      document.getElementById("divTabela").innerHTML = tab;
  
  })
*/  
  function getScore(ano){
  
      campeonato = [];
      const url = 'https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/'+ano;
      
      fetch(url)
      .then(function (response) {
          response.text().then((text)=>{
              const cbf = document.createElement('div');
              cbf.innerHTML =  text;
  
              for(let i=0; i<38; i++){
                  const rod = cbf.querySelector(`[data-slide-index="${i}"]`);
                  const jogos = rod.getElementsByClassName("clearfix");
                  const local = rod.getElementsByClassName("partida-desc text-1 color-lightgray block uppercase text-center");
      
                  campeonato.push([]);
  
                  for(let j=0; j<10; j++){
  
                      const jogo = new Object;
  
                      const vist = jogos[j].getElementsByClassName("time pull-right");
                      const mand = jogos[j].getElementsByClassName("time pull-left");
                      const placar = jogos[j].querySelector('.label-2');
  
  //                    console.log(local[j * 2].firstChild.nodeValue)
  
                      jogo.num = local[j * 2].firstChild.nodeValue.split(' - ')[1].split(': ')[1].trim();
                      jogo.dia_sem = local[j * 2].firstChild.nodeValue.split(' - ')[0].trim().split(' ')[0];
                      jogo.data = local[j * 2].firstChild.nodeValue.split(' - ')[0].trim().split(' ')[1];
                      jogo.horario = local[j * 2].firstChild.nodeValue.split(' - ')[0].trim().split(' ')[2];
                      jogo.estadio = local[j * 2 + 1].firstChild.nodeValue.trim().split(' - ')[0];
                      jogo.cidade = local[j * 2 + 1].firstChild.nodeValue.trim().split(' - ')[1];
                      jogo.uf = local[j * 2 + 1].firstChild.nodeValue.trim().split(' - ')[2];
  
                      jogo.mandante = new Object;
                      jogo.mandante.sigla = mand[0].getElementsByClassName("time-sigla")[0].innerHTML;
                      jogo.mandante.logo = mand[0].querySelector(["img"]).src;
                      jogo.mandante.nome = mand[0].querySelector(["img"]).title.split(' - ')[0];
                      jogo.mandante.uf = mand[0].querySelector(["img"]).title.split(' - ')[1];
                      
                      if(placar != null){
                          jogo.mandante.placar = placar.innerHTML.split(' x ')[0];        
                      }else{
                          jogo.mandante.placar = ' ';
                      }
            
                      jogo.visitante = new Object;
                      jogo.visitante.sigla = vist[0].getElementsByClassName("time-sigla")[0].innerHTML;
                      jogo.visitante.logo = vist[0].querySelector(["img"]).src;
                      jogo.visitante.nome = vist[0].querySelector(["img"]).title.split(' - ')[0];
                      jogo.visitante.uf = vist[0].querySelector(["img"]).title.split(' - ')[1];
  
                      if(placar != null){
                          jogo.visitante.placar = placar.innerHTML.split(' x ')[1];        
                      }else{
                          jogo.visitante.placar = ' ';
                      }
  
                      campeonato[i].push(jogo);
  
                  }
  
              }
          
          })
      });
  
  }  