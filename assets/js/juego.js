

let deck           = [];
const tipos        = ["C","D","H","S"];
const especiales   = ["A","J","Q","K"];
const pedir        = document.getElementById("btnPedir"); 
const detener      = document.getElementById("btnDetener");
const nuevo        = document.getElementById("btnNuevo");
const score = document.querySelectorAll("small");

const manoJugador      = document.querySelector("#jugador-cartas");
const manoComputadora  = document.querySelector("#computadora-cartas");


let puntosJugador     = 0 ,
    puntosComputadora = 0;

const crearDeck  = ()=>{
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

const pedirCarta = () =>{
    if(deck.length === 0){
        throw "No quedan cartas en el mazo"
    }
    const carta = deck.shift()
    return carta;
}

const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length -1);
    return (isNaN( valor ) ) ?
            (valor === "A") ? 11 : 10
            : valor *1;
}

// TURNO DE LA COMPUTADORA  
const turnoComputadora = ( puntosMinimos ) => {
    do{
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    score[1].innerText = puntosComputadora;

    //  <img src="./assets/cartas/AH.png" alt="Cartas del jugador" class="carta">
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add("carta");
    manoComputadora.append( imgCarta );

    if(puntosMinimos > 21){
        break;
    } 

} while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)); 

setTimeout(()=>{

if( puntosMinimos===puntosComputadora ){
    alert("Ha ocurrido un empate!");
} else if (puntosComputadora>21){
    alert("Has ganado!");
} else {
    alert("Ha ganado la computadora");
}
},131);

}


/*
const valorCarta = ( carta ) =>{
    const valor = carta.substring(0, carta.length -1);
    let puntos = 0;
    if(isNaN( valor ) ){
        puntos = ( valor === "A") ? 11 : 10;
    } else{
        puntos = valor*1;
    };
}

valorCarta("AD")

*/ 
//EVENTOS

pedir.addEventListener("click", ()=>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    score[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add("carta");
    manoJugador.append( imgCarta );

    if(puntosJugador > 21){
        console.error("Lo siento. Has perdido");
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21){
        console.warn("BLACKJACK!!");
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora(puntosJugador)
    }
})

detener.addEventListener("click", ()=>{
    pedir.disabled   = true;
    detener.disabled = true;
    turnoComputadora(puntosJugador);
})

nuevo.addEventListener("click", ()=>{
    window.location.reload();
})





