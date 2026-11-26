//Editor de pixel-art

//obs: Esses comentarios nao sao de IA

let grid = [];

function matriz(){
    //Matriz, ela ajuda a criar uma malha pra exportacao e para edicao.

    for (let i = 0; i < gridTamanho; i++){
    grid [i] = new Array(gridTamanho);
    for(let j = 0; j < gridTamanho; j++){
    grid[i][j] = null;
    console.log(grid[i][j]);
        }
    }   
}


//A variavel pincel define a expessuraa do pincel, gridTamanho o tamanho da malha em html, gridCSS a proporcao da mesma malha em Css, e color eh a cor.
let tamanhoPincel; 
let tamanhoReal;
let gridTamanho;
let gridCSS;
let color;

let desktop = false;

const botTamanho1 = document.querySelector("#bot1");
const botTamanho2 = document.querySelector("#bot2");
const botTamanho3 = document.querySelector("#bot3");

//Definir o tamanho que o usuario deseja conforme mobile e desktop
botTamanho1.addEventListener("click", tam64);
botTamanho2.addEventListener("click", tam32);
botTamanho3.addEventListener("click", tam16);



function cssPc(){
    gridCSS = gridTamanho * 16;
}

function cssMobile(){
    if (gridTamanho === 64){
        gridCSS = gridTamanho * 4;
    } else {
        gridCSS = gridTamanho * 8;
    }
}

function tam64(){
    gridTamanho = 64;
    if(desktop){
    cssPc();
    }else {
        cssMobile();
    }

    conteinerTam();
}

function tam32(){
    gridTamanho = 32;
    if(desktop){
    cssPc();
    }else {
        cssMobile();
    }

    conteinerTam();
}

function tam16(){
    gridTamanho = 16;



    if(desktop){
    cssPc();
    }else {
        cssMobile();
    }

    conteinerTam();
    
}

//bloco para a logica da escolha de mobile ou pc

let pixel;
const conteiner = document.querySelector(".conteiner");
function conteinerTam() {
    conteiner.style.width = gridCSS + "px";
    pixel = (gridCSS / gridTamanho) + "px";

    conteiner.style.setProperty("--pixel", pixel);
    conteiner.style.display = "block";
    const botoes = document.querySelector("#botoes");
    botoes.style.display = "flex";
    divDeTamanhos.style.display = "none"; 
    tamanhoReal = gridCSS / gridTamanho;
    cCanva.width = gridTamanho;
    cCanva.height = gridTamanho;

    matriz();
}

const mobile = document.querySelector("#cell");
const pc = document.querySelector("#pc");

const divDeTamanhos = document.querySelector("#tamanho");

mobile.addEventListener("click", mobileGrid);
pc.addEventListener("click", pcGrid);

function mobileGrid(){
    desktop = false;
    const h2 = document.querySelector("#titulo2");
    h2.style.display = "none";
    const plataforma = document.querySelector("#plataforma");
    plataforma.style.display = "none";

    divDeTamanhos.style.display = "block";
}

function pcGrid(){
    desktop = true;
    const h2 = document.querySelector("#titulo2");
    h2.style.display = "none";
    const plataforma = document.querySelector("#plataforma");
    plataforma.style.display = "none";

    divDeTamanhos.style.display = "block";
}




//Logica do balde:
// > Ele faz a conversao do pixel clicado para o tamanho Css
// > Ele detecta se o pixel clicado é da mesma cor que a nova cor que o usuario quer pintar
// > Se for, nada acontece.
// > Se nao for, ele pinta e decta os pixels dos lados, acima e abaixo, se for da mesma cor que
// o pixel original era, ele pinta se nao ele para.
// Ou seja, ele pinta todos os pixels conectados da mesma cor
// Deve se criar a funcao recursiva aqui, onde ele detecta a posicao do x e y, acrescenta e reduz 1 pixel
// Para saber se ao redor deve se pintar


//Paleta do Balde
const paletaBalde = document.querySelector("#paletabalde");

paletaBalde.addEventListener("input", attCorBalde);

//Atualizando a cor de fill
function attCorBalde(){
  if (baldePinta){ 
    color = paletaBalde.value;
    context.fillStyle = color;
    balde.style.background = color;
   }
}

//preenchimento
function forrarMalha(x, y, n1, n2){
    if (x >= 0 && x < gridTamanho && y >= 0 && y < gridTamanho){
    
        if(n1 == n2){
            return;
        }
        if (n1 === grid[x][y]){
                grid[x][y] = n2;
                pintar(x, y);

                forrarMalha(x - 1, y, n1, n2);
                forrarMalha(x + 1, y, n1, n2);
                forrarMalha(x, y - 1, n1, n2);
                forrarMalha(x, y + 1, n1, n2);
            } else {
                return;
            }
    }
}



const balde = document.querySelector("#balde");
balde.addEventListener("click", pintarBalde);

function pintarBalde(){
   paletaBalde.click();
   apoio = false;
   apoioBorracha = false;
   baldePinta = true;

}

 

const paleta = document.querySelector("#paleta");

//Botao
const pincel = document.querySelector("#pincel");
 
//Borracha
const borracha = document.querySelector("#borracha");

//Grade
const lGrade = document.querySelector("#grade");

//Canva
const cCanva = document.querySelector("#canva");

//Pincel
const context = cCanva.getContext("2d");

//obs: impedindo que o navegador suavize as bordas em manipulacao
context.imageSmoothingEnabled = false;



//Ao clicar no pincel ele chama a funcao que abre a paleta
pincel.addEventListener("click", selectColor);

//funcao que chama a paleta
function selectColor(){
    paleta.click();
    apoio = true;
    apoioBorracha = false;
    baldePinta = false;
}

//chama a funcao que coloca coloca a cor da paleta no pincel toda vez que a cor muda
paleta.addEventListener("input", attCor);

//funcao que atualiza a cor do pincel
function attCor(){
    color = paleta.value;
    context.fillStyle = color;
    pincel.style.background = color;
}

borracha.addEventListener("click", ativarBorracha);

function ativarBorracha(){
    apoioBorracha = true;
    apoio = false;
    baldePinta = false;
}

lGrade.addEventListener("click", linhas);
linhasAtivas = true;
function linhas(){
    if(linhasAtivas){
        conteiner.style.setProperty("--pixel", "0px");
        linhasAtivas = false;
    } else {
        conteiner.style.setProperty("--pixel", pixel);
        linhasAtivas = true;
    }
}



function pintar (x, y){
    context.fillRect(x, y, 1, 1);
}

function apagar(x, y){
    context.clearRect(x, y, 1, 1);
}

let apoio = false;
let amIdrawing = false;
let apoioBorracha = false;
let queroApagar = false;
let baldePinta = false;

cCanva.addEventListener("pointerdown", toque);
cCanva.addEventListener("pointermove", pressionado);
cCanva.addEventListener("pointerup", up);



//funcao pro clique
function toque (event) {

    //coluna e linha pega a posicao x e y do mouse e converte o pixel da posica para proporcao do css = local do clique (offset x,y) / tamanho real
    //Em seguida arredonda atraves de math.floor
        let offsetX = event.offsetX;
        let offsetY = event.offsetY;
        let coluna = Math.floor(offsetX / tamanhoReal);
        let linha = Math.floor(offsetY / tamanhoReal);

  
        if (apoio){
            pintar(coluna, linha);
            grid[coluna][linha] = color;
            amIdrawing = true;
        } else if (apoioBorracha) {
           apagar(coluna, linha);
           grid[coluna][linha] = null;
           queroApagar = true;
        
        } else if (baldePinta){
            let oldColor = grid[coluna][linha];
            let novaCor = color;
            forrarMalha(coluna, linha, oldColor, novaCor);
    }

}

//funcao pra pressao
function pressionado (event){
    let offsetX = event.offsetX;
    let offsetY = event.offsetY;
    let coluna = Math.floor(offsetX / tamanhoReal);
    let linha = Math.floor(offsetY / tamanhoReal);
        
        if (amIdrawing){    
            pintar(coluna, linha);
          grid[coluna][linha] = color;
        } else if (queroApagar){
            apagar(coluna, linha);
          grid[coluna][linha] = null;
        }
} 

//funcao para parar de pintar
function up(){
    if(amIdrawing){
        amIdrawing = false;
    } else if (queroApagar){
        queroApagar = false;
    }
}


//Download

const botdown = document.querySelector("#downpng");
botdown.addEventListener("click", baixarPNG);


function baixarPNG(){

let permissaoBaixar = false;
for (let x = 0; x < gridTamanho; x++){
        if(permissaoBaixar){
       break;
     } 
    for (let y = 0; y < gridTamanho; y++){
            if (grid[x][y] != null){
                permissaoBaixar = true;
                break;
            }
        }  

    }

if (!permissaoBaixar){
    alert("Não há nada para baixar");
    return;
}


  const escala = 16;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = gridTamanho * escala;
  exportCanvas.height = gridTamanho * escala;

  const ctx = exportCanvas.getContext("2d");

  for (let x = 0; x < gridTamanho; x++){
    for (let y = 0; y < gridTamanho; y++){


      const cor = grid[x][y];

      if (cor){
        ctx.fillStyle = cor;
        ctx.fillRect(
          x * escala,
          y * escala,
          escala,
          escala
            );
        }

     }


    }
  const link = document.createElement("a");
  link.download = "pixelart.png";
  link.href = exportCanvas.toDataURL();
  link.click();
}


//Baixar Json

const bJson = document.querySelector("#json");
bJson.addEventListener("click", baixarJSON);

function baixarJSON(){

let permissaoBaixar = false;
for (let x = 0; x < gridTamanho; x++){
        if(permissaoBaixar){
       break;
     } 
    for (let y = 0; y < gridTamanho; y++){
            if (grid[x][y] != null){
                permissaoBaixar = true;
                break;
            }
        }  

    }

if (!permissaoBaixar){
    alert("Não há nada para baixar");
    return;
}

  const json = JSON.stringify(grid);

  const jsonBaixar = new Blob([json], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(jsonBaixar);
  link.download = "pixelart.json";
  link.click();

}
