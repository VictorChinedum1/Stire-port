import { ChangeDetectionStrategy, Component, signal, effect, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MagneticDirective } from './magnetic.directive';
import { RouterModule, Router } from '@angular/router';
import { animate } from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, MagneticDirective, RouterModule],
  template: `
    <div class="bg-[#FAF6F0] min-h-screen text-[#522218] dark:bg-[#522218] dark:text-[#FAF6F0] transition-colors duration-500 flex flex-col font-sans relative overflow-x-hidden">
      <!-- Fixed Navbar -->
      <nav class="hero-nav opacity-0 fixed top-0 left-0 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 z-[100] w-full">
        <!-- Logo -->
        <div routerLink="/" class="cursor-pointer font-logo text-6xl md:text-7xl lg:text-[72px] font-medium tracking-normal text-[#4B5563] dark:text-[#FAF6F0] transition-colors duration-500 shrink-0">
          STIRE.
        </div>

        <!-- Right Side Container (Nav Links + Actions) -->
        <div class="flex items-center space-x-6 lg:space-x-12 ml-auto">
          <!-- Desktop Links -->
          <ul class="hidden lg:flex items-center space-x-8 xl:space-x-12 text-[12px] font-bold tracking-[0.2em] uppercase opacity-70">
            <li routerLink="/" class="cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.15] hover:rotate-[5deg] hover:opacity-100 origin-center">Home</li>
            <li routerLink="/about" class="cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.15] hover:rotate-[5deg] hover:opacity-100 origin-center">About Us</li>
            <li class="cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.15] hover:rotate-[5deg] hover:opacity-100 origin-center">Work</li>
            <li class="cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.15] hover:rotate-[5deg] hover:opacity-100 origin-center">Services</li>
          </ul>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4 md:space-x-6">
            <!-- Theme Toggle -->
            <button (click)="toggleTheme()"
                    class="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#522218]/20 dark:border-[#FAF6F0]/25 transition-colors hover:bg-[#522218]/10 dark:hover:bg-[#FAF6F0]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#522218] focus:ring-[#522218] dark:focus:ring-[#FAF6F0]">
              <mat-icon class="text-[18px] w-[18px] h-[18px] leading-[18px]">{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>

            <!-- Magnetic Contact Button -->
            <button magnetic
                    class="group flex items-center justify-center px-6 lg:px-8 py-[10px] md:py-[14px] rounded-[100px] border border-[#522218] dark:border-[#FAF6F0] transition-colors duration-300 bg-transparent focus:outline-none hover:bg-[#522218] hover:text-[#FAF6F0] dark:hover:bg-[#FAF6F0] dark:hover:text-[#522218]">
              <span class="inline-block transition-transform duration-300 group-hover:scale-[1.1] font-bold uppercase tracking-[0.1em] text-[11px] md:text-[13px] leading-tight">
                LET'S TALK
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main class="flex-grow w-full">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App implements AfterViewInit {
  isDark = signal(true); 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isDark()) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Fade in Navbar
    animate('.hero-nav', 
      { y: [-20, 0], opacity: [0, 1] }, 
      { delay: 0.2, duration: 1.2, ease: 'easeOut' } 
    );
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }
}

