import {
  ChangeDetectionStrategy,
  Component,
  signal,
  effect,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MagneticDirective } from "./magnetic.directive";
import { RouterModule } from "@angular/router";
import { animate } from "motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  imports: [CommonModule, MatIconModule, MagneticDirective, RouterModule],
  template: `
    <div
      class="progress-bar fixed top-0 left-0 h-1 md:h-[6px] bg-[#522218]/80 dark:bg-[#FAF6F0]/80 z-[120] origin-left scale-x-0 w-full rounded-r-full backdrop-blur-md transition-colors duration-500"
    ></div>
    <div
      class="bg-[#FAF6F0] min-h-screen text-[#522218] dark:bg-[#522218] dark:text-[#FAF6F0] transition-colors duration-500 flex flex-col font-sans relative overflow-x-hidden"
    >
      <!-- Fixed Navbar -->
      <nav
        class="hero-nav opacity-0 fixed top-0 left-0 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 z-[100] w-full"
      >
        <!-- Background element for scrolling -->
        <div
          class="nav-bg absolute inset-0 z-[-1] opacity-0 border-b border-[#522218]/10 dark:border-[#FAF6F0]/10 bg-[#FAF6F0]/80 dark:bg-[#522218]/80 backdrop-blur-lg transition-colors duration-500"
        ></div>

        <!-- Logo -->
        <div
          routerLink="/"
          class="nav-logo cursor-pointer font-logo text-6xl md:text-7xl lg:text-[72px] font-medium tracking-normal text-[#4B5563] dark:text-[#FAF6F0] transition-colors duration-500 shrink-0 origin-left"
        >
          STIRE.
        </div>

        <!-- Right Side Container (Nav Links + Actions) -->
        <div
          class="nav-links flex items-center space-x-6 lg:space-x-12 ml-auto origin-right"
        >
          <!-- Desktop Links -->
          <ul class="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <li routerLink="/" class="group relative cursor-pointer">
              <div
                class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.15] group-hover:rotate-[5deg] origin-center opacity-70 group-hover:opacity-100 text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                Home
              </div>
              <div
                class="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none z-50 flex flex-col items-center min-w-max"
              >
                <div
                  class="w-2 h-2 bg-[#522218] dark:bg-[#FAF6F0] rotate-45 mb-[-4px] rounded-tl-[1px]"
                ></div>
                <div
                  class="bg-[#522218] text-[#FAF6F0] dark:bg-[#FAF6F0] dark:text-[#522218] text-[10px] tracking-wide px-3 py-1.5 rounded-[6px] shadow-xl whitespace-nowrap font-medium normal-case"
                >
                  Return to baseline
                </div>
              </div>
            </li>
            <li routerLink="/about" class="group relative cursor-pointer">
              <div
                class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.15] group-hover:rotate-[5deg] origin-center opacity-70 group-hover:opacity-100 text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                About Us
              </div>
              <div
                class="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none z-50 flex flex-col items-center min-w-max"
              >
                <div
                  class="w-2 h-2 bg-[#522218] dark:bg-[#FAF6F0] rotate-45 mb-[-4px] rounded-tl-[1px]"
                ></div>
                <div
                  class="bg-[#522218] text-[#FAF6F0] dark:bg-[#FAF6F0] dark:text-[#522218] text-[10px] tracking-wide px-3 py-1.5 rounded-[6px] shadow-xl whitespace-nowrap font-medium normal-case"
                >
                  Our core philosophy
                </div>
              </div>
            </li>
            <li class="group relative cursor-pointer">
              <div
                class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.15] group-hover:rotate-[5deg] origin-center opacity-70 group-hover:opacity-100 text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                Work
              </div>
              <div
                class="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none z-50 flex flex-col items-center min-w-max"
              >
                <div
                  class="w-2 h-2 bg-[#522218] dark:bg-[#FAF6F0] rotate-45 mb-[-4px] rounded-tl-[1px]"
                ></div>
                <div
                  class="bg-[#522218] text-[#FAF6F0] dark:bg-[#FAF6F0] dark:text-[#522218] text-[10px] tracking-wide px-3 py-1.5 rounded-[6px] shadow-xl whitespace-nowrap font-medium normal-case"
                >
                  Featured case studies
                </div>
              </div>
            </li>
            <li
              (click)="scrollToServices()"
              class="group relative cursor-pointer"
            >
              <div
                class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.15] group-hover:rotate-[5deg] origin-center opacity-70 group-hover:opacity-100 text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                Services
              </div>
              <div
                class="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none z-50 flex flex-col items-center min-w-max"
              >
                <div
                  class="w-2 h-2 bg-[#522218] dark:bg-[#FAF6F0] rotate-45 mb-[-4px] rounded-tl-[1px]"
                ></div>
                <div
                  class="bg-[#522218] text-[#FAF6F0] dark:bg-[#FAF6F0] dark:text-[#522218] text-[10px] tracking-wide px-3 py-1.5 rounded-[6px] shadow-xl whitespace-nowrap font-medium normal-case"
                >
                  Solutions & capabilities
                </div>
              </div>
            </li>
          </ul>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4 md:space-x-6">
            <!-- Theme Toggle -->
            <button
              (click)="toggleTheme()"
              class="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#522218]/20 dark:border-[#FAF6F0]/25 transition-colors hover:bg-[#522218]/10 dark:hover:bg-[#FAF6F0]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#522218] focus:ring-[#522218] dark:focus:ring-[#FAF6F0]"
            >
              <mat-icon class="text-[18px] w-[18px] h-[18px] leading-[18px]">{{
                isDark() ? "light_mode" : "dark_mode"
              }}</mat-icon>
            </button>

            <!-- Magnetic Contact Button -->
            <button
              appMagnetic
              class="group hidden lg:flex items-center justify-center px-6 lg:px-8 py-[10px] md:py-[14px] rounded-[100px] border border-[#522218] dark:border-[#FAF6F0] transition-colors duration-300 bg-transparent focus:outline-none hover:bg-[#522218] hover:text-[#FAF6F0] dark:hover:bg-[#FAF6F0] dark:hover:text-[#522218]"
            >
              <span
                class="inline-block transition-transform duration-300 group-hover:scale-[1.1] font-bold uppercase tracking-[0.1em] text-[11px] md:text-[13px] leading-tight"
              >
                LET'S TALK
              </span>
            </button>

            <!-- Mobile Menu Toggle -->
            <button
              (click)="toggleMobileMenu()"
              class="lg:hidden flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[#522218]/20 dark:border-[#FAF6F0]/25 transition-colors hover:bg-[#522218]/10 dark:hover:bg-[#FAF6F0]/10 focus:outline-none"
            >
              <mat-icon class="text-[18px] w-[18px] h-[18px] leading-[18px]">{{
                isMobileMenuOpen() ? "close" : "menu"
              }}</mat-icon>
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div
        class="fixed inset-0 z-[90] bg-[#FAF6F0] dark:bg-[#522218] flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
        [ngClass]="
          isMobileMenuOpen()
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        "
      >
        <ul
          class="flex flex-col items-center space-y-10 text-3xl font-serif uppercase tracking-widest text-[#522218] dark:text-[#FAF6F0]"
        >
          <li
            routerLink="/"
            (click)="toggleMobileMenu()"
            class="hover:opacity-70 transition-opacity"
          >
            Home
          </li>
          <li
            routerLink="/about"
            (click)="toggleMobileMenu()"
            class="hover:opacity-70 transition-opacity"
          >
            About Us
          </li>
          <li
            (click)="toggleMobileMenu()"
            class="hover:opacity-70 transition-opacity"
          >
            Work
          </li>
          <li
            (click)="scrollToServices(); toggleMobileMenu()"
            class="hover:opacity-70 transition-opacity"
          >
            Services
          </li>
          <li class="pt-8">
            <button
              class="px-8 py-3 rounded-[100px] border border-[#522218] dark:border-[#FAF6F0] text-sm font-sans tracking-widest uppercase hover:bg-[#522218] hover:text-[#FAF6F0] dark:hover:bg-[#FAF6F0] dark:hover:text-[#522218] transition-colors"
            >
              Let's Talk
            </button>
          </li>
        </ul>
      </div>

      <main class="flex-grow w-full">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class App implements AfterViewInit {
  isDark = signal(true);
  isMobileMenuOpen = signal(false);

  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isDark()) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
    });

    gsap.registerPlugin(ScrollTrigger);

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Progress Bar Animation
    gsap.to(".progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.3,
      },
    });

    // Fade in Navbar
    animate(
      ".hero-nav",
      { y: [-20, 0], opacity: [0, 1] },
      { delay: 0.2, duration: 1.2, ease: "easeOut" },
    );

    // Navbar Shrink Effect
    gsap.to(".hero-nav", {
      paddingTop: "16px",
      paddingBottom: "16px",
      scrollTrigger: {
        start: "100px top",
        end: "300px top",
        scrub: true,
      },
    });

    gsap.to(".nav-bg", {
      opacity: 1,
      scrollTrigger: {
        start: "100px top",
        end: "300px top",
        scrub: true,
      },
    });

    gsap.to(".nav-logo", {
      scale: 0.7,
      scrollTrigger: {
        start: "100px top",
        end: "300px top",
        scrub: true,
      },
    });

    gsap.to(".nav-links", {
      scale: 0.85,
      scrollTrigger: {
        start: "100px top",
        end: "300px top",
        scrub: true,
      },
    });
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  scrollToServices() {
    if (isPlatformBrowser(this.platformId)) {
      // First check if we are on the home page, if not navigate
      if (window.location.pathname !== "/") {
        window.location.href = "/#services-section";
        return;
      }

      const el = document.getElementById("services-section");
      if (el) {
        // Use Lenis if available via gsap, or native smooth scroll
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
