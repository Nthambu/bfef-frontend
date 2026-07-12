import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  form: FormGroup;
  state: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMsg = '';

  contactDetails = [
    { icon: '✉️', label: 'Email', value: 'info@brightfuturekenya.org' },
    { icon: '📞', label: 'Phone', value: '+254 XXX XXX XXX' },
    { icon: '📍', label: 'Location', value: 'Kenya' },
  ];

  reasonOptions = [
    'I want to sponsor a student',
    'Corporate partnership inquiry',
    'Grant or foundation funding',
    'Volunteer or mentorship',
    'General question',
    'Media or press',
  ];

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      phone:   [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.form.controls; }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state = 'loading';

    this.api.submitContact(this.form.value).subscribe({
      next: () => {
        this.state = 'success';
        this.form.reset();
      },
      error: (err) => {
        this.state = 'error';
        this.errorMsg =
          err?.error?.message ??
          'Something went wrong. Please try again or email us directly.';
      },
    });
  }
}
