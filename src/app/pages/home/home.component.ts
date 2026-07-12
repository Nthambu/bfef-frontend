import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('statCount') statEls!: QueryList<ElementRef<HTMLElement>>;

  stats = [
    { target: 20,   suffix: '+', label: 'Students to sponsor — Year 1' },
    { target: 100,  suffix: '+', label: 'School supply packages' },
    { target: 4,    suffix: '',  label: 'Mentorship events planned' },
    { target: 47,   suffix: '',  label: 'Counties across Kenya served' },
  ];

  currentValues: number[] = [];

  private counterObserver!: IntersectionObserver;
  private animated = false;

  programs = [
    {
      icon: '📚',
      title: 'Educational Sponsorship',
      desc: 'Full school fees coverage for needy learners — primary through university.',
    },
    {
      icon: '🎒',
      title: 'Learning Materials',
      desc: 'Books, uniforms, and stationery so no child is held back by lack of supplies.',
    },
    {
      icon: '🤝',
      title: 'Mentorship Programs',
      desc: 'Connecting young people with professionals, role models, and career guides.',
    },
    {
      icon: '🎓',
      title: 'Skills Development',
      desc: 'Vocational and technical training pathways for youth aged up to 22.',
    },
  ];

  ngOnInit(): void {
    this.currentValues = this.stats.map(() => 0);
  }

  ngAfterViewInit(): void {
    // Start counter animation when stats section scrolls into view
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      this.counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
          }
        },
        { threshold: 0.4 },
      );
      this.counterObserver.observe(statsSection);
    }
  }

  private animateCounters(): void {
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;

    this.stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.target / steps;
      const timer = setInterval(() => {
        current = Math.min(current + increment, stat.target);
        this.currentValues[index] = Math.floor(current);
        if (current >= stat.target) clearInterval(timer);
      }, interval);
    });
  }

  ngOnDestroy(): void {
    this.counterObserver?.disconnect();
  }
}
