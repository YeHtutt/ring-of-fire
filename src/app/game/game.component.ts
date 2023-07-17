import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, withDebugTracing } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    //this.newGame();
    this.route.params.subscribe((params) => { //Parameter aus Route erzeugen (.subscribe() Methode kann oft aufgerufen werden)
      //console.log(params['id']);
      this.gameId = params['id'];

      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => { //spiel Daten abfragen
          //console.log('Game update', game);

          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        })
    })


  }

  newGame() {
    this.game = new Game();
    //console.log(this.game); //die Objekt daten des Spieles am Anfang ausloggen
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      //console.log(this.currentCard);
      this.game.pickCardAnimation = true;
      // console.log('New card: ' + this.game.currentCard);
      // console.log('Game is ', this.game); //die Objekt daten des Spieles nach Kartenzug ausloggen
      //aktuellen Spieler auswählen
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; //hier wird current player iteriert
      this.saveGame(); //Die Kartenzüge pop() Methoden müssen auch geupdated werden

      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard); //erst die neue Karte zeigen, wenn Animation fertig ist
        this.game.pickCardAnimation = false;
        this.saveGame(); //Die Kartenzüge pop() Methoden müssen auch geupdated werden
      }, 1000); //bei 1,5 Sek alte pickCardAnimation löschen, um neue Karte zu animieren
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) { //only name inserted: the player can be added
        this.game.players.push(name);  //name Input wird zum Array von players[] hinzugefügt
        //console.log('The dialog was closed', name);
        this.saveGame();
      }
    });
  }


  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());
  }

}
