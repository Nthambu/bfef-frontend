import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface ConstitutionArticle {
  number: string;
  title: string;
  content: string[];
}

@Component({
  selector: 'app-constitution',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  templateUrl: './constitution.component.html',
  styleUrls: ['./constitution.component.css'],
})
export class ConstitutionComponent implements OnInit {
  loading = true;

  // Hardcoded from the constitution document — these are formal
  // and re-fetch if needed in a future sprint.
  articles: ConstitutionArticle[] = [
    {
      number: '1', title: 'Name',
      content: ['The name of the organization shall be Bright Future Education Foundation Kenya (BFEF Kenya).'],
    },
    {
      number: '2', title: 'Registered Office',
      content: ['The registered office shall be located in Kenya, with branches established in any county as approved by the Board.'],
    },
    {
      number: '3', title: 'Vision',
      content: ['To ensure every needy child and youth in Kenya has access to quality education and opportunities for a better future.'],
    },
    {
      number: '4', title: 'Mission',
      content: ['To promote access to education through scholarships, mentorship, educational support, and skills development programs.'],
    },
    {
      number: '5', title: 'Objectives',
      content: [
        'Support needy children and youth with educational sponsorship.',
        'Provide school fees, uniforms, books, and learning materials.',
        'Promote education for girls and boys equally.',
        'Support vocational, technical, college, and university education.',
        'Conduct mentorship and career guidance programs.',
        'Partner with local and international donors.',
        'Promote child welfare and protection.',
        'Undertake fundraising activities to support educational programs.',
      ],
    },
    {
      number: '6', title: 'Membership',
      content: [
        'Membership shall be open to: Founding members, Ordinary members, Honorary members, and Donors and partners.',
        'Membership may be terminated for misconduct or activities that damage the reputation of the organization.',
      ],
    },
    {
      number: '7', title: 'Leadership',
      content: [
        'The organization shall be governed by: Chairperson, Vice Chairperson, Secretary, Treasurer, and Three Board Members.',
        'The officials shall serve a term of three years and may be re-elected.',
      ],
    },
    {
      number: '8', title: 'Duties of Officials',
      content: [
        'Chairperson: Presides over meetings and provides overall leadership.',
        'Secretary: Keeps records and minutes; handles official correspondence.',
        'Treasurer: Maintains financial records and prepares financial reports.',
      ],
    },
    {
      number: '9', title: 'Meetings',
      content: [
        'Annual General Meeting (AGM) shall be held once every year.',
        'Board meetings shall be held at least quarterly.',
        'Special meetings may be called when necessary.',
      ],
    },
    {
      number: '10', title: 'Finances',
      content: [
        'Funds shall be obtained from: Donations, Grants, Sponsorships, Fundraising events, and Lawful contributions.',
        'All funds shall be used solely for achieving the organization\'s objectives.',
        'The Treasurer shall maintain proper books of accounts.',
      ],
    },
    {
      number: '11', title: 'Bank Account',
      content: [
        'The organization shall operate an official bank account.',
        'Authorized signatories shall include: Chairperson, Secretary, and Treasurer.',
        'At least two signatories shall be required for withdrawals.',
      ],
    },
    {
      number: '12', title: 'Beneficiaries',
      content: ['Beneficiaries shall include needy children and youth from Kenya up to the age of 22 years, selected fairly and transparently.'],
    },
    {
      number: '13', title: 'Amendments',
      content: ['This constitution may be amended by a two-thirds majority vote of members present at a duly convened meeting.'],
    },
    {
      number: '14', title: 'Dissolution',
      content: ['In the event of dissolution, all remaining assets shall be transferred to another charitable organization with similar objectives and shall not be distributed among members.'],
    },
    {
      number: '15', title: 'Adoption',
      content: ['This Constitution was adopted by the founding members of Bright Future Education Foundation Kenya.'],
    },
  ];

  activeArticle: string | null = null;

  ngOnInit(): void {
    this.loading = false;
  }

  toggle(num: string): void {
    this.activeArticle = this.activeArticle === num ? null : num;
  }
}
