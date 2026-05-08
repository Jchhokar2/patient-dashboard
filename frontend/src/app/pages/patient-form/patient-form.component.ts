import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../shared/services/patient.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, SpinnerComponent],
  providers: [MessageService],
  templateUrl: './patient-form.component.html'
})
export class PatientFormComponent {
  loading = signal(false);
  form: FormGroup;

  // This will set up all the form fields with their validators
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router, private messageService: MessageService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required, this.notFutureDate]],
      status: ['pending', Validators.required]
    });
  }

  // And this will make sure the date of birth is not in the future
  notFutureDate(control: { value: string }) {
    const date = new Date(control.value);
    return date > new Date() ? { futureDate: true } : null;
  }

  get f() {
    return this.form.controls;
  }

  // This will submit the form and create a new patient
  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.patientService.createPatient(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient added successfully' });
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create patient' });
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}