import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ace-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() currentYear!: number;
}
