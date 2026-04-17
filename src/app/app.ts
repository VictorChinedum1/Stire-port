import { ChangeDetectionStrategy, Component, signal, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, stagger } from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  isLoading = signal(true);
  isMenuOpen = signal(false);
  
  @ViewChild('logoText', { static: false }) logoTextRef?: ElementRef<HTMLElement>;

  ngOnInit() {
    this.simulateProgress();
  }

  ngAfterViewInit() {
    if (this.logoTextRef) {
      animate(this.logoTextRef.nativeElement, { opacity: [0, 1], y: [20, 0] }, { duration: 1.5, ease: 'easeOut' });
    }
  }

  simulateProgress() {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        animate(loader, { opacity: 0 }, { duration: 1.2, ease: 'easeOut' }).finished.then(() => {
          this.isLoading.set(false);
          // Wait for DOM to render @else branch before triggering hero animations
          setTimeout(() => this.triggerHeroAnimation(), 50);
        });
      } else {
        this.isLoading.set(false);
        setTimeout(() => this.triggerHeroAnimation(), 50);
      }
    }, 5000);
  }

  triggerHeroAnimation() {
    const reveals = document.querySelectorAll('.animate-reveal');
    if (reveals.length > 0) {
      animate(reveals as any, 
        { opacity: [0, 1], y: [40, 0] },
        { delay: stagger(0.12), duration: 1.5, ease: [0.22, 1, 0.36, 1] }
      );
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}


