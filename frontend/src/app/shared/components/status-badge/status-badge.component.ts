import { Component, Input } from '@angular/core';
import { PatientStatus } from '../../../models/patient.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span [class]="'badge badge-' + status">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: PatientStatus = 'pending';
}

