import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Member } from '../../core/models/api.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.css'],
})
export class LeadershipComponent implements OnInit {
  members: Member[] = [];
  loading = true;

  // Officials first (Chairperson, Vice, Secretary, Treasurer),
  // then board members
  get officials(): Member[] {
    const titles = ['Chairperson', 'Vice Chairperson', 'Secretary', 'Treasurer'];
    return this.members.filter((m) =>
      titles.some((t) => m.position.toLowerCase().includes(t.toLowerCase())),
    );
  }

  get boardMembers(): Member[] {
    return this.members.filter((m) =>
      m.position.toLowerCase().includes('board member'),
    );
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getLeadership().subscribe({
      next: (members) => {
        this.members = members;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  getInitials(m: Member): string {
    return `${m.firstName[0]}${m.lastName[0]}`.toUpperCase();
  }
}
