import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent {
  @Input() name; //input variable [name] für game.component.html 
  @Input() playerActive: boolean = false; //im normalfall ein Player ist nicht active
}
