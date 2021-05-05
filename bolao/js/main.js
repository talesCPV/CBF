  //HTML Objects
  const btnRodPlus = document.getElementById('btnRodPlus');
  const btnRodMinus = document.getElementById('btnRodMinus');
  const edtRod = document.getElementById('edtRod');
  const tblAposta = document.getElementById('tblAposta');
  const lblAposta = document.getElementById('lblAposta');

  // Variáveis

  const ano = sessionStorage.getItem("temporada");
  const auth = sessionStorage.getItem("auth");
  let rodada = 1;
  let bets = [];
  let campeonato = [];  


  // Inicialização  
  getScore(ano);
  getBets();
  console.log(campeonato);
  
  //Object Cookie
  checklog(sessionStorage.getItem("auth"));
  
  //Object Menu
  const menu = new Object;
  menu.dashboard = document.getElementById('menuDash');
  menu.logout = document.getElementById('menuOut');
  
  menu.dashboard.addEventListener('click',()=>{

//    alert(JSON.stringify( campeonato ));
    const data = new URLSearchParams();
    data.append("do", "4");
    data.append("json", JSON.stringify( campeonato ));
    data.append("ano", ano);

    const myRequest = new Request("files/commit.php",{
        method : "POST",
        body : data
    })
//    fetch(myRequest);
  })
  
  
  menu.logout.addEventListener('click',()=>{
      sessionStorage.setItem("auth", "");
      window.location.replace("index.html");
     
  })
  
  btnRodPlus.addEventListener('click',()=>{
      
      rodada < 38 ? rodada++ : 0 ;
      lblAposta.innerHTML = "RODADA: "+rodada;

      fillRodada();
  })

  btnRodMinus.addEventListener('click',()=>{

    rodada > 1 ? rodada-- : 0 ;
    lblAposta.innerHTML = "RODADA: "+rodada;

    fillRodada();
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

    function fillRodada(){
        const N = rodada- 1;
        lblAposta.innerHTML = "RODADA: "+ rodada;
        tblAposta.innerHTML = '';

        for(let i=0; i<campeonato[N].length; i++){
            let b1 = "";
            let b2 = "";
            for(let j=0; j<bets.length; j++){
                if(bets[j][1]==campeonato[N][i].num && bets[j][2]==ano){
                    b1 = bets[j][3];
                    b2 = bets[j][4];
                }
            }

            const row = document.createElement('tr');
            row.title = campeonato[N][i].dia_sem +" "+campeonato[N][i].data+" "+campeonato[N][i].horario+", "+campeonato[N][i].estadio;

            const jog = document.createElement('td');
            jog.innerHTML = campeonato[N][i].num;
            jog.style.display = "none";
            row.appendChild(jog);

            const mand = document.createElement('td');
            mand.innerHTML = ` <img class="tbl-item"  src="${campeonato[N][i].mandante.logo}" >`;
            row.appendChild(mand);

            const mand_nome = document.createElement('td');
            mand_nome.classList.add("nome-time");
            mand_nome.innerHTML = `${campeonato[N][i].mandante.nome}`;
            row.appendChild(mand_nome);

            const p1 = document.createElement('td');
            p1.innerHTML = `<input class="tbl-item" type="text" size="1" value="${b1}" >`;
            row.appendChild(p1);

            const vs = document.createElement('td'); 
            vs.innerHTML = `<label class="tbl-item"> ${campeonato[N][i].mandante.placar}x${campeonato[N][i].visitante.placar} </label>`;
            row.appendChild(vs);

            const p2 = document.createElement('td');
            p2.innerHTML = `<input class="tbl-item"  type="text" size="1" value="${b2}">`;
            row.appendChild(p2);            

            const vist_nome = document.createElement('td');
            vist_nome.classList.add("nome-time");
            vist_nome.innerHTML = `${campeonato[N][i].visitante.nome}`;
            row.appendChild(vist_nome);


            const vist = document.createElement('td');        
            vist.innerHTML = `<img class="tbl-item"  src="${campeonato[N][i].visitante.logo}" >`;
            vist.style.width = "auto";
            row.appendChild(vist);

            const m_nome = document.createElement('td');
            m_nome.innerHTML = campeonato[N][i].mandante.nome;
            m_nome.style.display = "none";
            row.appendChild(m_nome);

            const v_nome = document.createElement('td');
            v_nome.innerHTML = campeonato[N][i].visitante.nome;
            v_nome.style.display = "none";
            row.appendChild(v_nome);

            tblAposta.appendChild(row);
        }
        const row = document.createElement('tr');
        row.innerHTML = "<td colspan='7'><button  id='btnSalApo' class='btn btn-outline-primary tbl-item' style='width:100%' >SALVAR</button></td>";
        tblAposta.appendChild(row);

        document.getElementById('btnSalApo').addEventListener('click',()=>{
            for(let i=0; i<tblAposta.rows.length -1; i++){
                const jogo_num = tblAposta.rows[i].cells[0].innerHTML;
                const p1 = tblAposta.rows[i].cells[3].querySelector(['input']).value;
                const p2 = tblAposta.rows[i].cells[5].querySelector(['input']).value;

                if(p1.trim() != "" && p2.trim() != ""){                

                    const data = new URLSearchParams();
                    data.append("do", "5");
                    data.append("user", auth);
                    data.append("jogo", jogo_num);
                    data.append("ano", ano);
                    data.append("p1", p1);
                    data.append("p2", p2);
                
                    const myRequest = new Request("files/commit.php",{
                        method : "POST",
                        body : data
                    })
                
                    fetch(myRequest);                       

                }

            }
            getBets();
            alert("Resultados salvos com sucesso!")
        });        

    }

  function getBets(){

    const data = new URLSearchParams();
    data.append("do", "6");
    data.append("user", auth);
    data.append("ano", ano);

    const myRequest = new Request("files/commit.php",{
        method : "POST",
        body : data
    })

    fetch(myRequest)
    .then(function (response) {
        response.text().then((json)=>{
            const obj = JSON.parse(json);
            bets = obj;
            console.log(bets);
        })
    })

  }


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
              fillRodada();
          })
      });
  
  }  