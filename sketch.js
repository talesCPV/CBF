
const btnVer = document.getElementById('btnVer');
const cmbAno = document.getElementById('cmbAno');
//const edtViewCode = document.getElementById('edtViewCode');
const divTabela = document.getElementById('divTabela');
const cmbRodada = document.getElementById('cmbRodada');
let jogos = [];

class Jogo{
    constructor(jogo,data,local){

        this.jogo =  new Object;
        this.jogo.num = data.firstChild.nodeValue.split(' - ')[1].split(': ')[1].trim();
        this.jogo.data = data.firstChild.nodeValue.split(' - ')[0].trim();
        this.jogo.local = local.firstChild.nodeValue.trim();

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

btnVer.addEventListener('click',()=>{
    getURL('https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/' + cmbAno.value);
})

function getURL(url){

    fetch(url)
    .then(function (response) {

        response.text().then((text)=>{
            const cbf = document.createElement('div');
            cbf.innerHTML =  text;

//            divTeste.innerHTML = text;

            const rodada = cbf.querySelector(`[data-slide-index="${cmbRodada.value}"]`);
            const lista = rodada.getElementsByClassName("clearfix");
            const local = rodada.getElementsByClassName("partida-desc text-1 color-lightgray block uppercase text-center");
        
//            edtViewCode.innerHTML = "";
            jogos = [];


            for(let i=0; i< lista.length; i++){
                const J = new Jogo(lista[i], local[(i * 2)], local[(i * 2)+1]);
                jogos.push(J);

//                edtViewCode.innerHTML = edtViewCode.innerHTML + '\n' + mandante + ' ' + p1 + ' x ' + p2 + ' ' +  visitante ;

            }
            console.log(jogos);

            divTabela.innerHTML = `
            <table id="tabRodada">
                <tr>
                    <th>Jogo</th>
                    <th>Data</th>
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
                    <td>${jogos[i].jogo.local}</td>
                    <td> <img src="${jogos[i].mandante.logo}"> </td>
                    <td>${jogos[i].mandante.placar}</td>
                    <td> x </td>
                    <td>${jogos[i].visitante.placar}</td>
                    <td> <img src="${jogos[i].visitante.logo}"> </td>

                `;

                tabela.appendChild(row);


            }


        })


    })

}  