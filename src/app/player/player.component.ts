import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() name; //input variable [name] für game.component.html 
  @Input() playerActive: boolean = false; //im normalfall ein Player ist nicht active
}
