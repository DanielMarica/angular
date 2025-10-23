import { Component } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ LottieComponent],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFound { }