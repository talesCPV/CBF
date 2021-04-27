
const btnVer = document.getElementById('btnVer');
const cmbAno = document.getElementById('cmbAno');
//const edtViewCode = document.getElementById('edtViewCode');
const divTabela = document.getElementById('divTabela');
const cmbRodada = document.getElementById('cmbRodada');


btnVer.addEventListener('click',()=>{
    scrapCBF(cmbAno.value,cmbRodada.value);
})

function scrapCBF(ano, rodada){

    const url = 'https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/'+ano;

    let jogos = [];

    class Jogo{
        constructor(jogo,data,local){
    
            this.jogo =  new Object;
            this.jogo.num = data.firstChild.nodeValue.split(' - ')[1].split(': ')[1].trim();
            this.jogo.dia_sem = data.firstChild.nodeValue.split(' - ')[0].trim().split(' ')[0];
            this.jogo.data = data.firstChild.nodeValue.split(' - ')[0].trim().split(' ')[1];
            this.jogo.horario = data.firstChild.nodeValue.split(' - ')[0].trim().split(' ')[2];
            this.jogo.estadio = local.firstChild.nodeValue.trim().split(' - ')[0];
            this.jogo.cidade = local.firstChild.nodeValue.trim().split(' - ')[1];
            this.jogo.uf = local.firstChild.nodeValue.trim().split(' - ')[2];
    
            const mandante = jogo.querySelector('.time .pull-right')
            const visitante = jogo.querySelector('.time .pull-left')
            const placar = jogo.querySelector('.label-2');
    
            this.mandante = new Object;
            this.mandante.nome = mandante.title.split(' - ')[0];
            this.mandante.uf = mandante.title.split(' - ')[1];
            this.mandante.logo = mandante.currentSrc.trim();
            if(placar != null){
                this.mandante.placar = placar.innerHTML.split(' x ')[0];        
            }else{
                this.mandante.placar = ' ';
            }
    
            this.visitante = new Object;
            this.visitante.nome = visitante.title.split(' - ')[0];
            this.visitante.uf = visitante.title.split(' - ')[1];
            this.visitante.logo = visitante.currentSrc.trim();
            if(placar != null){
                this.visitante.placar = placar.innerHTML.split(' x ')[1];        
            }else{
                this.visitante.placar = ' ';
            }
        }
    }

    fetch(url)
    .then(function (response) {

        response.text().then((text)=>{
            const cbf = document.createElement('div');
            cbf.innerHTML =  text;

            const rod = cbf.querySelector(`[data-slide-index="${rodada}"]`);
            const lista = rod.getElementsByClassName("clearfix");
            const local = rod.getElementsByClassName("partida-desc text-1 color-lightgray block uppercase text-center");
            jogos = [];


            for(let i=0; i< lista.length; i++){
                const J = new Jogo(lista[i], local[(i * 2)], local[(i * 2)+1]);
                jogos.push(J);

            }
            console.log(jogos);

            // tudo daqui pra baixo é apenas pra mostrar a tabela na tela, não tem a ver com webscraping

            divTabela.innerHTML = `
            <table id="tabRodada">
                <tr>
                    <th>Jogo</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Local</th>
                    <th>Mandante</th>
                    <th colspan="3">Placar</th>
                    <th>Visitante</th>
                </tr>             
                `;

            const tabela = document.getElementById('tabRodada');

            for(let i=0; i<jogos.length; i++){

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${jogos[i].jogo.num}</td>
                    <td>${jogos[i].jogo.data}</td>
                    <td>${jogos[i].jogo.horario}</td>
                    <td>${jogos[i].jogo.estadio}</td>
                    <td> <img src="${jogos[i].mandante.logo}" style="display: block; margin-left: auto; margin-right: auto; width: 50%;"> </td>
                    <td>${jogos[i].mandante.placar}</td>
                    <td> x </td>
                    <td>${jogos[i].visitante.placar}</td>
                    <td> <img src="${jogos[i].visitante.logo}" style="display: block; margin-left: auto; margin-right: auto; width: 50%;"> </td>

                `;

                tabela.appendChild(row);

            }

        })

    })

}  