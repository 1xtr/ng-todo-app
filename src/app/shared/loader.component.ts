import {Component} from "@angular/core";

@Component({
  selector: 'xtr-loader',
  template: `
    <div class="xtr-loader">
      <mat-spinner></mat-spinner>
      <br>
      Loading...
    </div>`,
  styles: [`
    .xtr-loader {
      display: flex;
      flex-grow: 1;
      align-items: center;
      flex-direction: column;
    }
  `]
})

export class LoaderComponent {

}
