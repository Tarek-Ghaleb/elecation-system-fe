import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AreaHttpService } from '../../../../auth/pages/services/region-services/area-http.service';

@Component({
  selector: 'app-add-area-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-area-dialog.component.html',
  styleUrl: './add-area-dialog.component.scss'
})
export class AddAreaDialogComponent {showModal = false; // controls modal visibility
  saving = false;
  error: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private areaService: AreaHttpService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form.reset();
    this.error = null;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = null;

    const payload = { name: this.form.value.name.trim() };

    this.areaService.AddAreaFunc(payload).subscribe({
      next: (res) => {
        this.saving = false;
        this.closeModal();
        console.log('Area created', res);
        // optionally emit event to parent to refresh list
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.message || 'حدث خطأ أثناء الإضافة';
      }
    });
  }
}