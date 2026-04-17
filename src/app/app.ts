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
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.isMobile.set(window.innerWidth < 640);
    } else {
      this.isLoading.set(false);
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    const loader = document.getElementById('loader');
    const loaderS = document.getElementById('loader-s');
    const loaderBg = document.getElementById('loader-bg');

    if (loader && loaderS && loaderBg) {
      // Start normal size, totally hidden initially to fade in
      loaderS.style.transform = 'scale(1)';
      loaderS.style.opacity = '0';
      
      // 1. Initial fade in for the "S"
      animate(loaderS, 
        { opacity: [0, 1] }, 
        { duration: 0.8, ease: 'easeOut' }
      );

      // Subtle gentle breathing while loading
      const loadingBreathing = animate(loaderS,
        { scale: [1, 1.05, 1] },
        { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      );
      
      // Let it "load", then sequence the zoom in
      setTimeout(() => {
        loadingBreathing.stop(); // Stop the breath effect before zooming
        
        // 2. Cinematic zoom IN (grow massively to fly past camera) and fade out
        animate(loaderS, 
          { scale: [1, 80], opacity: [1, 0] }, 
          { duration: 1.6, ease: [0.64, 0, 0.78, 0] } // Accelerate into camera
        );

        // 3. Fade out the loader background to reveal hero
        animate(loaderBg, 
          { opacity: [1, 0] }, 
          { delay: 0.4, duration: 1.2, ease: 'easeOut' }
        );

        // Trigger hero content animation as the S clears the screen
        setTimeout(() => {
          this.triggerHeroAnimation();
          this.updateMenuPosition();
        }, 600);

        // Final completion and teardown
        setTimeout(() => {
          loader.style.display = 'none'; // hard hide it to ensure no pointer events
          this.isLoading.set(false);
        }, 1600);

      }, 4000); // Time to hold the 'S' before zooming
    } else {
      this.isLoading.set(false);
      this.triggerHeroAnimation();
      this.updateMenuPosition();
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


