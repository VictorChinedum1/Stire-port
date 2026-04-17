import { ChangeDetectionStrategy, Component, signal, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  menuTop = signal(100);
  menuLeft = signal<number | null>(null);
  isMobile = signal(false);
  isBrowser = false;
  
  @ViewChild('logoText', { static: false }) logoTextRef?: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth < 640);
      this.simulateProgress();
    } else {
      this.isLoading.set(false);
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.logoTextRef) {
      animate(this.logoTextRef.nativeElement, { opacity: [0, 1], y: [20, 0] }, { duration: 1.5, ease: 'easeOut' });
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth < 640);
      this.updateMenuPosition();
    }
  }

  updateMenuPosition() {
    if (!this.isBrowser) return;

    const badge = document.getElementById('earlyAccessBadge');
    if (badge) {
      const rect = badge.getBoundingClientRect();
      this.menuTop.set(rect.top);
    }

    if (this.isMobile()) {
      const firstI = document.getElementById('firstI');
      if (firstI) {
        const rect = firstI.getBoundingClientRect();
        this.menuLeft.set(rect.left);
      }
    } else {
      this.menuLeft.set(null);
    }
  }

  simulateProgress() {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        animate(loader, { opacity: 0 }, { duration: 1.2, ease: 'easeOut' }).finished.then(() => {
          this.isLoading.set(false);
          // Wait for DOM to render @else branch before triggering hero animations
          setTimeout(() => {
            if (this.isBrowser) {
              this.triggerHeroAnimation();
              this.updateMenuPosition();
            }
          }, 50);
        });
      } else {
        this.isLoading.set(false);
        setTimeout(() => {
          if (this.isBrowser) {
            this.triggerHeroAnimation();
            this.updateMenuPosition();
          }
        }, 50);
      }
    }, 5000);
  }

  triggerHeroAnimation() {
    if (!this.isBrowser) return;
    const reveals = document.querySelectorAll('.animate-reveal');
    if (reveals.length > 0) {
      animate(Array.from(reveals), 
        { opacity: [0, 1], y: [40, 0] },
        { delay: stagger(0.12), duration: 1.5, ease: [0.22, 1, 0.36, 1] }
      );
    }
  }

  toggleMenu() {
    if (this.isBrowser) {
      this.updateMenuPosition();
    }
    this.isMenuOpen.update(v => !v);
  }
}


