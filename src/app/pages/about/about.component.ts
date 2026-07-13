import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Page } from '../../core/models/api.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  pages: Record<string , Page> = {};
  loading = true;
  objectives: string[] = [];

  coreValues = [
    { label: 'Integrity',      desc: 'We do what we say, with honesty in every action.' },
    { label: 'Accountability', desc: 'Every shilling is tracked and reported transparently.' },
    { label: 'Equality',       desc: 'Support is given fairly across gender, tribe, and region.' },
    { label: 'Compassion',     desc: 'We lead with empathy and genuine care for our beneficiaries.' },
    { label: 'Excellence',     desc: 'We hold our programs to the highest standard of impact.' },
    { label: 'Transparency',   desc: 'Donors and communities can see exactly how funds are used.' },
    { label: 'Service',        desc: 'We exist to serve — not to profit, not to grow for its own sake.' },
  ];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllPages().subscribe({
      next: (response) => {
const pages=response;
         pages.forEach((p) => (this.pages[p.slug] = p));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
