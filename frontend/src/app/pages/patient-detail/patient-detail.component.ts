import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../shared/services/patient.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Patient, PatientStatus } from '../../models/patient.model';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, Select, SpinnerComponent],
  providers: [MessageService],
  templateUrl: './patient-detail.component.html'
})
export class PatientDetailComponent implements OnInit {
  loading = signal(false);
  patient = signal<Patient | null>(null);
  selectedStatus = signal<PatientStatus>('pending');

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private messageService: MessageService
  ) {}

  // This will load the patient as soon as the page opens
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.loading.set(true);
    this.patientService.getPatient(id).subscribe({
      next: (data) => {
        this.patient.set(data);
        this.selectedStatus.set(data.status);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load patient' });
        this.loading.set(false);
      }
    });
  }

  // This will update the patient status when the dropdown changes
  updateStatus() {
    const id = this.patient()?._id as string;
    this.patientService.updateStatus(id, this.selectedStatus()).subscribe({
      next: (updated) => {
        this.patient.set(updated);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Status updated successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update status' });
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}

