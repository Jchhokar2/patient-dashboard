import { Component, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../shared/services/patient.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Patient, DashboardStats } from '../../models/patient.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    Select,
    ToastModule,
    ChartModule,
    StatusBadgeComponent,
    SpinnerComponent
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loading = signal(false);
  patients = signal<Patient[]>([]);
  stats = signal<DashboardStats>({ total: 0, active: 0, pending: 0, inactive: 0 });
  search = signal('');
  statusFilter = signal('');
  totalRecords = signal(0);
  page = signal(1);
  pageSize = signal(10);

  // This will feed the chart with the stats data
  chartData = computed(() => ({
    labels: ['Active', 'Pending', 'Inactive'],
    datasets: [{
      data: [this.stats().active, this.stats().pending, this.stats().inactive],
      backgroundColor: ['#d1fae5', '#fef9c3', '#fee2e2'],
      borderColor: ['#065f46', '#854d0e', '#991b1b'],
      borderWidth: 1
    }]
  }));

  statusOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' }
  ];

  constructor(
    private patientService: PatientService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadPatients();
  }

  // This will load the summary stats for the cards at the top
  loadStats() {
    this.patientService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load stats' })
    });
  }

  // This will load patients based on current filters and page
  loadPatients() {
    this.loading.set(true);
    this.patientService.getPatients(this.search(), this.statusFilter(), this.page(), this.pageSize()).subscribe({
      next: (res) => {
        this.patients.set(res.data);
        this.totalRecords.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load patients' });
        this.loading.set(false);
      }
    });
  }

  onSearch() {
    this.page.set(1);
    this.loadPatients();
  }

  onStatusChange() {
    this.page.set(1);
    this.loadPatients();
  }

  onPageChange(event: { first: number; rows: number }) {
    this.page.set(event.first / event.rows + 1);
    this.pageSize.set(event.rows);
    this.loadPatients();
  }

  goToDetail(id: string) {
    this.router.navigate(['/patients', id]);
  }

  goToAddPatient() {
    this.router.navigate(['/patients/new']);
  }
}
