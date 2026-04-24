import { Component, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-rotating-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="relative inline-flex justify-center overflow-hidden pb-[0.05em]" style="vertical-align: bottom;">
      @for (word of texts; track wordIndex; let wordIndex = $index) {
        @if (currentIndex === wordIndex || previousIndex === wordIndex) {
          <span class="flex items-center justify-center whitespace-nowrap"
                [ngClass]="currentIndex === wordIndex ? 'relative' : 'absolute top-0 left-1/2 -translate-x-1/2'"
                [style.z-index]="currentIndex === wordIndex ? 10 : 5">
            @for (char of word.split(''); track charIndex; let charIndex = $index) {
              <span class="inline-block will-change-transform" 
                    [id]="'rot-' + id + '-' + wordIndex + '-' + charIndex" 
                    [style.transform]="wordIndex === currentIndex ? 'translateY(120%)' : 'translateY(0%)'"
                    [style.opacity]="wordIndex === currentIndex ? '0' : '1'">
                {{ char === ' ' ? '&nbsp;' : char }}
              </span>
            }
          </span>
        }
      }
    </span>
  `
})
export class RotatingTextComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  @Input() intervalMs = 2500;
  @Input() loop = false;

  longestText = '';
  currentIndex = 0;
  previousIndex = -1;
  id = Math.random().toString(36).substring(2, 9);
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.longestText = this.texts.reduce((a, b) => a.length > b.length ? a : b, '');

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Initial entrance
        this.animateIn(this.currentIndex);
        
        this.intervalId = setInterval(() => {
          if (!this.loop && this.currentIndex === this.texts.length - 1) {
            clearInterval(this.intervalId);
            return;
          }
          
          this.previousIndex = this.currentIndex;
          this.currentIndex = (this.currentIndex + 1) % this.texts.length;

          this.animateOut(this.previousIndex);
          // Small delay before animating next word in to avoid overlap
          setTimeout(() => {
            this.animateIn(this.currentIndex);
          }, 300);
        }, this.intervalMs);

      }, 1500);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  animateIn(wordIndex: number) {
    const chars = document.querySelectorAll(`[id^="rot-${this.id}-${wordIndex}-"]`);
    if (chars.length) {
      chars.forEach((el: any) => {
         el.style.transform = 'translateY(120%)';
         el.style.opacity = '0';
      });
      animate(
        chars,
        { y: ['120%', '0%'], opacity: [0, 1] },
        { delay: stagger(0.04, { from: 'first' }), duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
      );
    }
  }

  animateOut(wordIndex: number) {
    const chars = document.querySelectorAll(`[id^="rot-${this.id}-${wordIndex}-"]`);
    if (chars.length) {
      animate(
        chars,
        { y: ['0%', '-120%'], opacity: [1, 0] },
        { delay: stagger(0.04, { from: 'first' }), duration: 0.4, ease: [0.36, 0, 0.66, -0.56] }
      );
    }
  }
}

