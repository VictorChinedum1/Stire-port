import { ChangeDetectionStrategy, Component, AfterViewInit, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RotatingTextComponent } from './rotating-text.component';
import { RouterModule, Router } from '@angular/router';
import { animate, stagger } from 'motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, RotatingTextComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading Screen Overlay -->
    <div id="loader" class="fixed inset-0 z-[100] flex items-center justify-center bg-[#522218] overflow-hidden">
      <div id="loaderSContainer" class="relative font-serif text-[25vw] font-bold leading-none origin-center" style="transform: scale(0.5); opacity: 1;">
        <!-- Base S (Black) -->
        <div class="text-black">S</div>
        <!-- Fill S (Cream) -->
        <div id="loaderSFill" class="absolute inset-0 text-[#FAF6F0]" style="clip-path: inset(100% 0 0 0);">
          S
        </div>
      </div>
    </div>

    <!-- HERO SECTION (Fold 1) -->
    <div id="hero-container" class="h-screen flex flex-col w-full relative z-10 will-change-transform transform-gpu overflow-hidden justify-center pt-48 lg:pt-[25vh]">
      <!-- Background ST -->
      <div class="absolute inset-0 flex items-center justify-end pointer-events-none z-0 overflow-hidden right-0">
        <span class="font-display text-[45vw] md:text-[40vw] text-[#522218]/[0.05] dark:text-[#6B2E20] leading-none select-none translate-x-[15%] md:translate-x-[10%] -translate-y-[5%] hero-st opacity-0">
          ST
        </span>
      </div>

      <!-- Main Brutalist Hero Content -->
      <main id="hero-content" class="flex-grow flex flex-col justify-center px-6 md:px-12 z-10 w-full max-w-[1500px] mx-auto pb-16 md:pb-24 select-none">
        <div class="flex flex-col font-serif uppercase tracking-tight leading-[0.95] text-left text-[10vw] sm:text-[9vw] md:text-[7.5vw] xl:text-[8rem] 2xl:text-[9rem]">
          <!-- First Line -->
          <div class="block hero-line opacity-0" style="transform: translateX(-400px);">
            <div class="hero-scroll-1 relative origin-left inline-block">
              <span class="stirring-text inline-block">STIRRING</span>
              <span class="elevating-text absolute top-0 left-0 opacity-0 inline-block">ELEVATING</span>
            </div>
          </div>

          <!-- Second Line -->
          <div class="flex items-center italic font-light mt-[-1%] md:mt-[-0.5%] hero-line opacity-0" style="transform: translateX(-400px);">
            <div class="hero-scroll-2 origin-left inline-flex items-center">
              <span class="font-sans font-light text-[0.85em] md:text-[0.75em] mr-[1vw] md:mr-[1.5vw] transform -translate-y-[8%] opacity-60">[</span>
              <app-rotating-text class="font-serif" [texts]="['VISIONS', 'BRANDS', 'CONCEPTS']" [intervalMs]="3000" [loop]="true"></app-rotating-text>
              <span class="font-sans font-light text-[0.85em] md:text-[0.75em] ml-[1vw] md:ml-[1.5vw] transform -translate-y-[8%] opacity-60">]</span>
            </div>
          </div>

          <!-- Third Line -->
          <div class="block mt-[-1%] md:mt-[-0.5%] hero-line opacity-0" style="transform: translateX(-400px);">
            <div class="hero-scroll-3 relative origin-left inline-block">
              <span class="into-reality-text inline-block whitespace-nowrap">INTO REALITY.</span>
              <span class="improve-text absolute top-0 left-0 opacity-0 inline-block whitespace-nowrap">IMPROVE</span>
            </div>
          </div>
        </div>
        
        <p class="hero-sub opacity-0 mt-6 md:mt-10 font-sans text-base md:text-xl lg:text-2xl max-w-2xl opacity-70 tracking-tight leading-relaxed lg:pl-1">
          We turn bold ideas into brands that move the world.
        </p>
      </main>
    </div>

    <!-- Stacking Wrapper -->
    <div class="relative w-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-black">
      <!-- ABOUT US SECTION (Fold 2) -->
      <section id="about-section" class="w-full min-h-[100vh] flex flex-col justify-center py-24 md:py-40 px-6 md:px-12 bg-[#FAF6F0] text-[#522218] dark:bg-[#3D1A12] dark:text-[#FAF6F0] transition-colors duration-500 transform-gpu overflow-hidden">
        <div class="about-container max-w-[1500px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 justify-center">
        <!-- Main Content -->
        <div class="w-full max-w-4xl flex flex-col items-start xl:items-center xl:text-center">
          <h2 class="split-text-about font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-8 uppercase">
            <span class="italic font-light">driven by</span> purpose.
          </h2>
          <p class="split-text-about font-sans text-base md:text-xl lg:text-2xl max-w-3xl opacity-80 leading-relaxed mb-12">
            Stire was founded on the belief that brands should not only stand out but move people. We combine brutalist aesthetics with refined typography to craft digital experiences that leave a lasting mark, pushing boundaries to redefine what is possible on the web.
          </p>

          <!-- Button adjusted: no hover bg, reduced y-padding -->
          <button (click)="goToAbout()" class="about-item opacity-0 translate-y-[40px] group flex items-center justify-center gap-3 px-8 py-2 rounded-[100px] border border-[#522218]/50 dark:border-[#FAF6F0]/50 text-[#522218] dark:text-[#FAF6F0] focus:outline-none transition-all duration-300">
            <span class="inline-block transition-transform duration-300 font-bold uppercase tracking-[0.1em] text-[13px] leading-none">
              About us
            </span>
            <mat-icon class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">arrow_outward</mat-icon>
          </button>
          
          <div class="about-item opacity-0 translate-y-[40px] flex xl:justify-center items-center gap-4 border-t border-[#522218]/20 dark:border-[#FAF6F0]/20 pt-6 mt-10 w-full max-w-2xl">
            <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=200&h=200" alt="Team" class="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500" referrerpolicy="no-referrer">
            </div>
            <div>
               <div class="font-bold tracking-wider text-sm uppercase">Creative Direction</div>
               <div class="opacity-70 text-sm">Founded in 2026</div>
            </div>
          </div>
        </div>
      </div>
      </section>
      <!-- IMAGE GALLERY SECTION (Fold 3) -->
      <section class="gallery-section relative z-30 w-full h-screen flex flex-row items-center justify-center overflow-hidden bg-[#FAF6F0] dark:bg-[#3D1A12] transition-colors duration-500">
        
        <!-- Left Text -->
        <h1 class="left-text absolute left-[4%] md:left-[8%] text-[10vw] md:text-[8vw] font-serif uppercase tracking-tighter text-[#522218] dark:text-[#FAF6F0] z-10 pointer-events-none transform-gpu origin-left leading-none italic font-light">Craft</h1>

        <!-- Middle Image Container -->
        <div class="gallery-wrapper relative overflow-hidden rounded-[30px] md:rounded-[40px] w-[50vw] h-[45vh] md:w-[30vw] md:h-[60vh] will-change-transform transform-gpu shadow-2xl z-20">
          <div class="absolute inset-0 bg-black/10 z-10 gallery-overlay opacity-100"></div>
          <div class="absolute inset-0 bg-black/60 z-[15] works-overlay opacity-0"></div>
          <img src="https://www.image2url.com/r2/default/images/1777029702217-913a0697-fddf-4d87-a93a-066098628650.jpg" alt="Stire Studio Base" class="gallery-bg absolute inset-0 w-full h-full object-cover object-center scale-[1.5] will-change-transform transform-gpu" referrerpolicy="no-referrer">
          
          <!-- Works Content (Appears after expansion) -->
          <div class="works-content absolute inset-0 z-30 flex flex-col lg:flex-row opacity-0 pointer-events-none p-6 md:p-12 lg:p-24 pb-8 overflow-hidden h-full">
            
            <!-- Left Column: Title & Button -->
            <div class="w-full lg:w-[35%] flex flex-col justify-center items-start text-white mb-8 lg:mb-0 lg:pl-8">
              <h3 class="works-title uppercase tracking-[0.2em] text-xs md:text-sm mb-6 opacity-0 translate-y-4">Featured Work</h3>
              <button class="works-btn flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-white/30 rounded-[100px] hover:bg-white hover:text-black transition-colors duration-300 opacity-0 translate-y-4 shadow-xl backdrop-blur-sm">
                <span class="text-[10px] md:text-xs tracking-widest font-medium uppercase">All Work</span>
                <span class="text-[10px] md:text-xs opacity-60">11</span>
                <mat-icon class="text-sm md:text-base w-4 h-4 md:w-5 md:h-5">arrow_forward</mat-icon>
              </button>
            </div>

            <!-- Right Column: Mock Works -->
            <div class="w-full lg:w-[65%] flex gap-4 md:gap-8 h-full">
              <!-- Item 1 (Dark Theme) -->
              <div class="work-card flex-1 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl bg-[#0f0f0f] h-[80%] self-end mt-auto opacity-0 translate-y-12">
                <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover opacity-80 mix-blend-lighten" alt="Work 1" referrerpolicy="no-referrer">
                <div class="absolute bottom-6 left-6 text-white uppercase text-sm md:text-xl font-bold tracking-tight">Monster</div>
              </div>
              <!-- Item 2 (Light Theme) -->
              <div class="work-card flex-1 rounded-2xl md:rounded-[40px] overflow-hidden relative shadow-2xl bg-[#f0f0f0] h-[95%] mb-auto opacity-0 translate-y-12">
                <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop" class="w-[120%] h-[120%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="Work 2" referrerpolicy="no-referrer">
                <div class="absolute bottom-6 left-6 text-black uppercase text-sm md:text-xl font-bold tracking-tight">Vizcom</div>
              </div>
            </div>

          </div>
        </div>

        <!-- Right Text -->
        <h1 class="right-text absolute right-[4%] md:right-[8%] text-[10vw] md:text-[8vw] font-serif uppercase tracking-tighter text-[#522218] dark:text-[#FAF6F0] z-10 pointer-events-none transform-gpu origin-right leading-none italic font-light">Bold</h1>

      </section>
    </div>
  `
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private splits: SplitType[] = [];

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  goToAbout() {
    this.router.navigate(['/about']);
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Fill S slowly with white (4 seconds)
    await animate('#loaderSFill', 
      { clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] }, 
      { duration: 4, ease: 'linear' } 
    );

    // Tiny pause
    await new Promise(r => setTimeout(r, 200));

    // 2. Zoom S massively
    const sAnimation = animate('#loaderSContainer', 
      { scale: [0.5, 300], opacity: [1, 0] }, 
      { duration: 1.5, ease: [0.5, 0, 0.5, 1] } 
    );
    
    try {
      await sAnimation;
    } catch {
      await new Promise(r => setTimeout(r, 1500));
    }

    // Hide loader
    const loader = document.getElementById('loader');
    if (loader) {
      animate('#loader', { opacity: 0 }, { duration: 0.4 });
      setTimeout(() => { if(loader) loader.style.display = 'none'; }, 400);
    }

    // Slide in background ST
    animate('.hero-st', 
      { opacity: [0, 1] }, 
      { duration: 1.5, ease: 'easeOut', delay: 0.4 }
    );

    // Stagger in hero lines
    animate('.hero-line', 
      { x: [-80, 0], scale: [0.95, 1], opacity: [0, 1] }, 
      { delay: stagger(0.06), duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    );

    // Fade in subtitle
    animate('.hero-sub', 
      { opacity: [0, 0.7] }, 
      { delay: 0.8, duration: 1.2 } 
    );

    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const heroContainer = document.getElementById('hero-container');
    const heroContent = document.getElementById('hero-content');
    
    // Create a timeline that pins the hero section and animates its contents
    if (heroContainer && heroContent) {
      
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop / Tablet Animation
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: 'top top',
            end: '+=1200', 
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          }
        });

        const heroSt = document.querySelector('.hero-st') as HTMLElement | null;
        if (heroSt) {
          heroTl.to(heroSt, {
            yPercent: -40,
            opacity: 0,
            ease: 'none',
            duration: 1
          }, 0);
        }

        heroTl.to(['.hero-sub', '.hero-scroll-2'], { 
          opacity: 0, y: -20, duration: 0.3, ease: 'power1.out'
        }, 0);

        heroTl.to('.hero-scroll-1', { scale: 1.5, x: '-15vw', ease: 'power2.inOut', duration: 0.8 }, 0);
        heroTl.to('.stirring-text', { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to('.elevating-text', { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to('.hero-scroll-3', { scale: 1.5, x: '15vw', ease: 'power2.inOut', duration: 0.8 }, 0);
        heroTl.to('.into-reality-text', { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to('.improve-text', { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(['.hero-scroll-1', '.hero-scroll-3'], { opacity: 0, scale: 2, duration: 0.2 }, 0.8);
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Animation
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: 'top top',
            end: '+=1000', 
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          }
        });

        const heroSt = document.querySelector('.hero-st') as HTMLElement | null;
        if (heroSt) {
          heroTl.to(heroSt, {
            yPercent: -25,
            opacity: 0,
            ease: 'none',
            duration: 1
          }, 0);
        }

        heroTl.to(['.hero-sub', '.hero-scroll-2'], { 
          opacity: 0, y: -10, duration: 0.3, ease: 'power1.out'
        }, 0);

        heroTl.to('.hero-scroll-1', { scale: 1.2, x: '-5vw', ease: 'power2.inOut', duration: 0.8 }, 0);
        heroTl.to('.stirring-text', { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to('.elevating-text', { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to('.hero-scroll-3', { scale: 1.2, x: '5vw', ease: 'power2.inOut', duration: 0.8 }, 0);
        heroTl.to('.into-reality-text', { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to('.improve-text', { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(['.hero-scroll-1', '.hero-scroll-3'], { opacity: 0, scale: 1.5, duration: 0.2 }, 0.8);
      });
    }

    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'center center',
        end: '+=1500',
        scrub: 1,
        pin: true,
        pinSpacing: true
      }
    });

    // The image wrapper expands
    galleryTl.to('.gallery-wrapper', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    // The image bg zooms out to normal
    galleryTl.to('.gallery-bg', {
      scale: 1,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);
    
    // Clear overlay
    galleryTl.to('.gallery-overlay', {
      opacity: 0,
      duration: 0.8
    }, 0);

    // Fade in dark works overlay to make content readable
    galleryTl.to('.works-overlay', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0.5);

    // Left text smoothly slides left and fades out
    galleryTl.to('.left-text', {
      x: '-40vw',
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 0);

    // Right text smoothly slides right and fades out
    galleryTl.to('.right-text', {
      x: '40vw',
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 0);

    // Show works content
    galleryTl.to('.works-content', {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.1
    }, 0.8);

    // Stagger in the works elements (title, button, cards)
    galleryTl.to(['.works-title', '.works-btn', '.work-card'], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, 0.8);


    // Stack animation for About section (shrinks and dims as next section comes up)
    gsap.to('#about-section', {
      scale: 0.9,
      opacity: 0.4,
      scrollTrigger: {
        trigger: '#about-section',
        start: 'top top',
        endTrigger: '.gallery-section',
        end: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true
      }
    });

    // Split text animation for About section
    const splitElements = document.querySelectorAll('.split-text-about');
    splitElements.forEach((el) => {
      const split = new SplitType(el as HTMLElement, { types: 'lines,words' });
      this.splits.push(split);

      if (split.lines) {
        split.lines.forEach(line => {
          (line as HTMLElement).style.overflow = 'hidden';
        });
      }

      gsap.fromTo(split.words, 
        {
          opacity: 0,
          y: '100%',
        },
        {
          opacity: 1,
          y: '0%',
          duration: 1.2,
          stagger: 0.03, // Small stagger for smooth flowing effect
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate the rest of the about items (button, profile image etc)
    gsap.fromTo('.about-item', 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-container',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.splits.forEach(s => s.revert());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

