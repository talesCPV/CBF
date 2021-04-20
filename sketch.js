
const btnVer = document.getElementById('btnVer');
const cmbAno = document.getElementById('cmbAno');
const edtViewCode = document.getElementById('edtViewCode');
const divTeste = document.getElementById('divTeste');
const cmbRodada = document.getElementById('cmbRodada');
let jogos = [];

class Jogo{
    constructor(J,M,V,D,L,P1,P2,ME,VE,ML,VL){
        this.jogo =  new Object;
        this.jogo.num = J.trim();
        this.jogo.data = D.trim();
        this.jogo.local = L.trim();

        this.mandante = new Object;
        this.mandante.nome = M.trim();
        this.mandante.uf = ME.trim();
        this.mandante.logo = ML.trim();
        this.mandante.placar = P1.trim();

        this.visitante = new Object;
        this.visitante.nome = V.trim();
        this.visitante.uf = VE.trim();
        this.visitante.logo = VL.trim();
        this.visitante.placar = P2.trim();
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

            const rodada = cbf.querySelector(`[data-slide-index="${cmbRodada.value}"]`);
            const lista = rodada.getElementsByClassName("clearfix");
            const local = rodada.getElementsByClassName("partida-desc text-1 color-lightgray block uppercase text-center");
            const tabela = document.createElement('table');

            edtViewCode.innerHTML = "";
            jogos = [];


            for(let i=0; i< lista.length; i++){
                
                const jogo = lista[i];
                const visitante = jogo.querySelector('.time .pull-left').title.split(' - ')[0];
                const mandante = jogo.querySelector('.time .pull-right').title.split(' - ')[0];
                const est_vis = jogo.querySelector('.time .pull-left').title.split(' - ')[1];
                const est_mand = jogo.querySelector('.time .pull-right').title.split(' - ')[1];
                const logo_vis = lista[i].querySelector('.time .pull-left').currentSrc;
                const logo_mand = lista[i].querySelector('.time .pull-right').currentSrc;
                const placar = jogo.querySelector('.label-2');
                const estadio = local[(i * 2)+1].firstChild.nodeValue;
                const data = local[(i * 2)].firstChild.nodeValue.split(' - ')[0];
                const numjogo = local[(i * 2)].firstChild.nodeValue.split(' - ')[1].split(': ')[1];

                let p1 = ' ';
                let p2 = ' ';

                if(placar != null){
                    p1 = placar.innerHTML.split(' x ')[0];
                    p2 = placar.innerHTML.split(' x ')[1];   
                }

                const J = new Jogo(numjogo,mandante,visitante,data,estadio,p1,p2, est_mand,est_vis,logo_mand,logo_vis);
                jogos.push(J);

                edtViewCode.innerHTML = edtViewCode.innerHTML + '\n' + mandante + ' ' + p1 + ' x ' + p2 + ' ' +  visitante ;

                console.log(jogo)
              

            }
            console.log(jogos);

        })

    })

}  