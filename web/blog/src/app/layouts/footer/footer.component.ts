import { Component, Input } from '@angular/core';
import { BG_COLOR } from 'src/assets/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public color: string = BG_COLOR;
}
