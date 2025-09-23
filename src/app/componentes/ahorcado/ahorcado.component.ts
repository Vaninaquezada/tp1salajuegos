import { Component } from '@angular/core';
import { Words } from '../../clases/words';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  MAX_ATTEMPTS = 6;
  MASK_CHAR = '_';
  mensaje = '';
  remainingAttempts: number;
  letters: Words[];
  hiddenWord: Words[];
  displayedWord = '';
  letra = '';
  movimientos: number;
  palabras = [
    'casa',
    'bebida',
    'gato',
    'perro',
    'elefante',
    'mesa',
    'silla',
    'computadora',
    'typescript',
    'javascript',
  ];
  imagen!: string;
  start: string;
  palabrita = '';
  resultado: string;
  constructor() {
    this.letters = [];
    this.hiddenWord = [];
    this.remainingAttempts = 0;
    this.resultado = '';
    this.movimientos = 0;
    this.start = 'visible';
    this.palabrita = '';
  }
  ngOnInit(): void {}

  resetGame() {
    this.resetAttempts();
    this.setupKeys();
    this.chooseWord();
    this.imagePath();
    this.displayWord();
  }
  checkGameStatus() {
    if (this.playerWins()) {
      this.mensaje = 'Ganaste!. La palabra era ' + this.getUnhiddenWord();
      this.resultado = 'visible';
      let res = {
        tiempo: 'N/A',
        resultado: 'Gano',
        clicks: this.movimientos.toString(),
        juego: 'Ahorcado',
        correctas: 'N/A',
        errores: (this.MAX_ATTEMPTS - this.remainingAttempts).toString(),
      };
    }
    if (this.playerLoses()) {
      this.mensaje = 'Perdiste. La palabra era ' + this.getUnhiddenWord();
      this.resultado = 'visible';
      let res = {
        tiempo: 'N/A',
        resultado: 'Perdio',
        clicks: this.movimientos.toString(),
        correctas: 'N/A',
        juego: 'Ahorcado',
        errores: (this.MAX_ATTEMPTS - this.remainingAttempts).toString(),
      };
    }
  }

  getUnhiddenWord() {
    let word = '';

    for (const letter of this.hiddenWord) {
      word += letter.letter;
    }
    return word;
  }
  playerWins() {
    for (const letter of this.hiddenWord) {
      if (letter.hidden) {
        return false;
      }
    }
    return true;
  }
  playerLoses() {
    return this.remainingAttempts <= 0;
  }
  imagePath() {
    this.imagen = `../../../assets/imagenes/ahorcado/Ahorcado-${
      this.MAX_ATTEMPTS - this.remainingAttempts
    }.png`;
  }
  resetAttempts() {
    this.displayedWord = '';
    this.movimientos = 0;
    this.remainingAttempts = this.MAX_ATTEMPTS;
  }
  async chooseWord() {
    this.palabrita = '';
    // Choose random
    let word = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabrita = word;
    console.log('Palabra: ' + word);
    this.prepareWord(word);
  }
  prepareWord(word: string) {
    word = word.toUpperCase();
    this.hiddenWord = [];
    for (const letter of word) {
      this.hiddenWord.push({
        letter,
        hidden: true,
      });
    }
  }
  displayWord() {
    let aux = '';
    for (const letter of this.hiddenWord) {
      if (letter.hidden) {
        aux += this.MASK_CHAR;
      } else {
        aux += letter.letter;
      }
      aux += ' ';
    }
    this.displayedWord = aux;
  }

  setupKeys() {
    // We make a dictionary from the letters
    this.letters = [];
    for (let index = 0; index < this.ALPHABET.length; index++) {
      this.letters.push({
        letter: this.ALPHABET[index],
        disabled: false,
      });
    }
  }
  letterExistsInWord(searchedLetter: string) {
    for (const letter of this.hiddenWord) {
      if (letter.letter === searchedLetter) {
        return true;
      }
    }
    return false;
  }
  discoverLetter(letter: string) {
    for (const index in this.hiddenWord) {
      if (this.hiddenWord[index].letter === letter) {
        this.hiddenWord[index].hidden = false;
      }
    }
    this.displayWord();
  }
  attemptWithLetter(l: string) {
    this.movimientos += 1;
    this.letters = this.letters.filter(removeKey);
    if (!this.letterExistsInWord(l)) {
      this.remainingAttempts -= 1;
      this.imagePath();
    } else {
      this.discoverLetter(l);
    }
    this.checkGameStatus();

    function removeKey(letter: Words) {
      return letter.letter != l;
    }
  }
  clickBoton() {
    this.start = '';
    this.resultado = '';
    this.letra = '';
    this.resetGame();
  }
}
