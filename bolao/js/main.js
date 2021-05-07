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
  let times = [];
  const classif = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];


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
//        lblAposta.innerHTML = "RODADA: "+ rodada;
        tblAposta.innerHTML = '';

        for(let i=0; i<campeonato[N].length; i++){
            let b1 = "";
            let b2 = "";
            if(bets[0] != null){
                for(let j=0; j<bets.length; j++){
                    if(bets[j][1]==campeonato[N][i].num && bets[j][2]==ano){
                        b1 = bets[j][3];
                        b2 = bets[j][4];
                    }
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

  function fillTimes(){
    
    const tabTimes = [];

    function newTime(nome,sigla,logo, uf){
        const obj = new Object;
        obj.nome = nome;
        obj.uf = uf;
        obj.sigla = sigla;
        obj.logo = logo;
        obj.pro = 0;
        obj.contra = 0;
        obj.pt = 0;
        obj.acumulado = [];
        obj.qtd_casa = 0;
        obj.qtd_fora = 0;
        obj.pt_casa = 0;
        obj.pt_fora = 0;
        obj.vitoria = 0;
        obj.derrota = 0;
        obj.empate = 0;
        times.push(obj);
        tabTimes.push(logo);
    }

    for(let i=0; i<10; i++){
        newTime(campeonato[0][i].mandante.nome,campeonato[0][i].mandante.sigla,campeonato[0][i].mandante.logo,campeonato[0][i].mandante.uf);
        newTime(campeonato[0][i].visitante.nome,campeonato[0][i].visitante.sigla,campeonato[0][i].visitante.logo,campeonato[0][i].visitante.uf);
    }

    for(let rod=0; rod<campeonato.length; rod++){
        for(let jog=0; jog<campeonato[rod].length; jog++){
            const ind_m = tabTimes.indexOf(campeonato[rod][jog].mandante.logo)
            const ind_v = tabTimes.indexOf(campeonato[rod][jog].visitante.logo)

            times[ind_m].pro += parseInt(campeonato[rod][jog].mandante.placar);
            times[ind_m].contra += parseInt(campeonato[rod][jog].visitante.placar);

            times[ind_v].contra += parseInt(campeonato[rod][jog].mandante.placar);
            times[ind_v].pro += parseInt(campeonato[rod][jog].visitante.placar);

            times[ind_m].qtd_casa += 1;
            times[ind_v].qtd_fora += 1;

            if(campeonato[rod][jog].mandante.placar > campeonato[rod][jog].visitante.placar){
                times[ind_m].pt += 3;
                times[ind_m].pt_casa += 3;
                times[ind_m].vitoria += 1;
                times[ind_v].derrota += 1;
            }else if(campeonato[rod][jog].mandante.placar < campeonato[rod][jog].visitante.placar){
                times[ind_v].pt += 3;
                times[ind_v].pt_fora += 3;
                times[ind_v].vitoria += 1;                
                times[ind_m].derrota += 1;
            }else{
                times[ind_m].pt += 1;
                times[ind_m].pt_casa += 1;
                times[ind_m].empate += 1;                
                times[ind_v].pt += 1;
                times[ind_v].pt_fora += 1;
                times[ind_v].empate += 1;                
            }
            times[ind_m].acumulado.push(times[ind_m].pt);
            times[ind_v].acumulado.push(times[ind_v].pt);
        }
    }

    console.log(times);
    fillTabela();
    sortTable();
    google.charts.setOnLoadCallback(pontos_acumulados);

  }

    function sortTable() {
        var table, rows, switching, i, pt1, pt2, vit1, vit2, sal1, sal2, shouldSwitch;
        table = document.getElementById("tbTimes");
        switching = true;

        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            pt1 = rows[i].getElementsByTagName("TD")[3].innerHTML;
            pt2 = rows[i + 1].getElementsByTagName("TD")[3].innerHTML;
            vit1 = rows[i].getElementsByTagName("TD")[5].innerHTML;
            vit2 = rows[i + 1].getElementsByTagName("TD")[5].innerHTML;
            sal1 = rows[i].getElementsByTagName("TD")[10].innerHTML;
            sal2 = rows[i + 1].getElementsByTagName("TD")[10].innerHTML;
            if (pt1 < pt2) { // ordena por pontos
              shouldSwitch = true;
              break;
            }else if (pt1 == pt2 && vit1 < vit2) { // desempata por vitorias
                shouldSwitch = true;
                break;
            }else if (pt1 == pt2 && vit1 == vit2 && sal1 < sal2) { // desempata por saldo
                shouldSwitch = true;
                break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            const aux = rows[i + 1].getElementsByTagName("TD")[0].innerHTML
            rows[i + 1].getElementsByTagName("TD")[0].innerHTML = rows[i].getElementsByTagName("TD")[0].innerHTML;
            rows[i].getElementsByTagName("TD")[0].innerHTML = aux;

            switching = true;
          }
        }
      }


  function fillTabela(){
    
    const tbTimes = document.getElementById('tbTimes');

    for(let i=0; i<times.length; i++){
        const row = document.createElement('tr');
        row.classList.add("tbl-row-mobile");

        row.innerHTML = ` 
            <td> ${i+1} </td>
            <td class="nome-time"> <img src="${times[i].logo}"> </td>
            <td> ${times[i].nome}-${times[i].uf} </td>
            <td> ${times[i].pt} </td>
            <td> ${times[i].qtd_casa + times[i].qtd_fora} </td>
            <td> ${times[i].vitoria} </td>
            <td> ${times[i].empate} </td>
            <td> ${times[i].derrota} </td>
            <td> ${times[i].pro} </td>
            <td> ${times[i].contra} </td>
            <td> ${times[i].pro - times[i].contra} </td>
            <td> ${ Math.floor(times[i].pt / ((times[i].qtd_casa + times[i].qtd_fora) * 3) * 100 )} </td>
        `;

        tbTimes.appendChild(row);
    }

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
              fillTimes();
          })
      });
  
  }  