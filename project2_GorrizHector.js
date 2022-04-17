class Tablero {
    constructor() {
    this.tablero = [];
    this.addcartas();
    this.mezclacartas();
  }
  
  
  addcartas() {
    this.tablero = [];
    const palos = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const numeros = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let palo in palos) {
      for (let numero in numeros) {
        this.tablero.push(numeros[numero] + " of " + palos[palo]);
      }
    }
  }
  
  
  mezclacartas() {
    let numberOfCards = this.tablero.length;  
    for (var i=0; i<numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.tablero[i];
      this.tablero[i] = this.tablero[j];
      this.tablero[j] = tmp;
    }
  }
  
  deal(){
    return this.tablero.pop();
  }
  
  isEmpty() {
    return (this.tablero.length==0);
  }
  
  length() {
    return this.tablero.length;
  }
  
}

class Carta {
  constructor(carta) {
      this.carta = carta;
      const cardValor = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.numero = cardValor[carta];
    this.palo = carta.substring(carta.indexOf(" of ")+4);
    this.hueco = null;
    this.flipped = false;
  
    var palos = {'Hearts':0, 'Diamonds':13, 'Clubs':26, 'Spades':39 }
    this.position = palos[this.palo] + this.numero; 
  } 
  
  displayCard(hueco,flipped=true) {
    this.hueco = document.getElementById(hueco);
    this.hueco.classList.add("card");
    this.flipped=flipped;
    if (flipped) {
      this.hueco.style.backgroundPosition = -150*this.position + "px";
    } else {
      this.hueco.style.backgroundPosition = "0px";  
    }
  }
  
  flip() {
    if (this.flipped) {
      this.hueco.style.backgroundPosition = "0px";
      this.flipped=false;
    } else {
      this.hueco.style.backgroundPosition = -150*this.position + "px";
      this.flipped=true;  
    }
  } 
  
} 

const tablero = new Tablero();
let cartatablero1,cartatablero2,cartatablero3,cartatablero4,cartatablero5,cartaplayer1,cartaplayer2;

function deal() {
  if (tablero.length()<7) {
    tablero.addcartas();
    tablero.shuffle();
  }  
  cartatablero1 = new Carta(tablero.deal());
  cartatablero2 = new Carta(tablero.deal());
  cartatablero3 = new Carta(tablero.deal());
  cartatablero4 = new Carta(tablero.deal());
  cartatablero5 = new Carta(tablero.deal());
  cartaplayer1 = new Carta(tablero.deal());
  cartaplayer2 = new Carta(tablero.deal());

  
  cartatablero1.displayCard("cartatablero1",false);  
  cartatablero2.displayCard("cartatablero2",false);  
  cartatablero3.displayCard("cartatablero3",false);  
  cartatablero4.displayCard("cartatablero4",false);  
  cartatablero5.displayCard("cartatablero5",false);  
  cartaplayer1.displayCard("cartaplayer1",true);  
  cartaplayer2.displayCard("cartaplayer2",true); 
}

function nextStep(el) {
  if (!cartatablero1.flipped) {
    cartatablero1.flip();
    cartatablero2.flip();
    cartatablero3.flip();
    el.innerHTML="Enseña la 4<sup>º</sup> carta";
  } else if(!cartatablero4.flipped) {
    cartatablero4.flip();
    el.innerHTML="Enseña la 5<sup>º</sup> carta";
} else if(!cartatablero5.flipped) {
    cartatablero5.flip();
    el.innerHTML="Nueva Ronda";
} else {
  deal();
  el.innerHTML="Enseña las 3 primeras cartas";
}
}

function yourhand(el) {
  if (cartaplayer1.numero || cartaplayer2.numero  == cartatablero1.numero || cartatablero2.numero || cartatablero3.numero){
    document.getElementById("yourhand").innerHTML="Pareja";
  }
  else if (cartaplayer1.numero && cartaplayer2.numero  == cartatablero1.numero || cartatablero2.numero || cartatablero3.numero){
    document.getElementById("yourhand").innerHTML="Trio";
  }
}

/*
function rankhands {

}
*/

deal();