import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard:string = ''; //leeren String am Anfang
  game: Game;

  constructor() {
    this.game = new Game();
  }

  ngOnInit():void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game); //die Objekt daten des Spieles am Anfang ausloggen
  }

  takeCard() {
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop();
      //console.log(this.currentCard);
      this.pickCardAnimation = true;
      
      console.log('New card: ' + this.currentCard);
      console.log('Game is ', this.game); //die Objekt daten des Spieles nach Kartenzug ausloggen

      setTimeout(() => {
        this.game.playedCard.push(this.currentCard); //erst die neue Karte zeigen, wenn Animation fertig ist
        this.pickCardAnimation = false;
      }, 1000); //bei 1,5 Sek alte pickCardAnimation löschen, um neue Karte zu animieren
    }
    
  }
}
