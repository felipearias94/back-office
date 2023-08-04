import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bo-button',
  templateUrl: './bo-button.component.html',
  styleUrls: ['./bo-button.component.scss'],
})
export class BoButtonComponent {
  @Input() colorType: string;
  @Input() iconName: string;
  @Input() label: string;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(): void {
    this.onClick.emit();
  }
}
