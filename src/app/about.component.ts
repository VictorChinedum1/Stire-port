import { ChangeDetectionStrategy, Component, AfterViewInit, inject, PLATFORM_ID, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .word {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  `],
  template: `
    <div class="min-h-screen pt-32 pb-24 px-6 md:px-12 w-full max-w-[1500px] mx-auto select-none">
      <div class="mb-24">
        <h1 class="split-text font-serif text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tight leading-[0.95] mb-8">
          About Us.
        </h1>
        <p class="split-text font-sans text-xl md:text-3xl max-w-4xl opacity-80 leading-relaxed font-light">
          We are not just a creative studio. We are a collective of thinkers, designers, and engineers dedicated to crafting digital excellence. Our approach strips away the unnecessary, focusing purely on aesthetic impact and purposeful experiences.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pb-32">
        <div class="flex flex-col border-t border-[#522218]/20 dark:border-[#FAF6F0]/20 pt-8">
          <h3 class="split-text font-bold tracking-widest text-sm uppercase mb-6 opacity-70">Philosophy</h3>
          <p class="split-text-rotate text-lg md:text-2xl leading-relaxed opacity-90">
            Every line of code and every pixel on the screen is placed with deliberate intent. We believe in brutalist elegance—bold structures refined by meticulous detail. We don't just build websites; we architect digital spaces that resonate.
          </p>
        </div>
        
        <div class="flex flex-col border-t border-[#522218]/20 dark:border-[#FAF6F0]/20 pt-8">
          <h3 class="split-text font-bold tracking-widest text-sm uppercase mb-6 opacity-70">Process</h3>
          <p class="split-text-rotate text-lg md:text-2xl leading-relaxed opacity-90">
            Our methodology is rooted in collaboration and transparency. From the initial conceptualization phase to final execution, we iteratively refine our ideas. Quality is not a milestone; it is the constant pulse of our work.
          </p>
        </div>
      </div>

      <div class="bg-[#522218] dark:bg-[#FAF6F0] p-12 md:p-24 rounded-3xl text-[#FAF6F0] dark:text-[#522218] mb-32 flex flex-col items-center text-center">
        <h2 class="split-text font-serif text-4xl md:text-6xl mb-8">Ready to disrupt?</h2>
        <p class="split-text text-lg md:text-2xl opacity-80 max-w-2xl mx-auto">
          Whatever concept you have, we have the tools to stir it into reality. Let's build something unforgettable.
        </p>
      </div>
    </div>
  `
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private splits: SplitType[] = [];

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup for smooth loading
    setTimeout(() => {
      this.initSplitText();
    }, 100);
  }

  initSplitText() {
    const elements = document.querySelectorAll('.split-text');

    elements.forEach((el) => {
      // Split into words, wrapped neatly for animation
      const split = new SplitType(el as HTMLElement, { types: 'lines,words' });
      this.splits.push(split);

      // Add overflow hidden to lines to mask words
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
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%', 
            toggleActions: 'play none none reverse' // Rewinds when you scroll up for constant effect
          }
        }
      );
    });

    const rotateElements = document.querySelectorAll('.split-text-rotate');

    rotateElements.forEach((el) => {
      const split = new SplitType(el as HTMLElement, { types: 'lines,words' });
      this.splits.push(split);

      if (split.lines) {
        split.lines.forEach(line => {
          (line as HTMLElement).style.overflow = 'hidden';
          (line as HTMLElement).style.perspective = '400px';
        });
      }

      gsap.fromTo(split.words, 
        {
          opacity: 0,
          y: '120%',
          rotationX: -60,
          rotationY: 10,
          transformOrigin: '0% 50% -50'
        },
        {
          opacity: 1,
          y: '0%',
          rotationX: 0,
          rotationY: 0,
          duration: 1.4,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%', 
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.splits.forEach(s => s.revert());
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
