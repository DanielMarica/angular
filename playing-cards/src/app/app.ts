import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    template: '<h1> Hello world </h1>',
    styles: [
      `h1{
        background-color: black;
        color: white;
        text-align : center;
      }`
    ]
})
export class App {
}
// ...existing code...
