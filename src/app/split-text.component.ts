import { Component, ElementRef, Input, OnDestroy, AfterViewInit, ViewChild, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-split-text',
  standalone: true,
  template: `
    <div style="display: contents;">
      <div #textContainer [class]="'split-parent ' + className" [style.text-align]="textAlign" style="display: inline-block; white-space: normal; word-wrap: break-word; will-change: transform, opacity;">
        <ng-content></ng-content>
        {{ text }}
      </div>
    </div>
  `
})
export class SplitTextComponent implements AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() className: string = '';
  @Input() delay: number = 50; // ms
  @Input() duration: number = 1.25; // s
  @Input() ease: string = 'power3.out';
  @Input() splitType: 'chars' | 'words' | 'lines' | 'words,chars' | 'lines,words' | 'lines,words,chars' = 'chars';
  @Input() from: any = { opacity: 0, y: 40 };
  @Input() to: any = { opacity: 1, y: 0 };
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '-100px';
  @Input() textAlign: string = 'center';

  @ViewChild('textContainer') textContainer!: ElementRef;

  private splitInstance: SplitType | null = null;
  private platformId = inject(PLATFORM_ID);
  private tl: gsap.core.Tween | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // We need a slight delay to ensure fonts have loaded for precise splitting
    setTimeout(() => {
      this.initAnimation();
    }, 150);
  }

  initAnimation() {
    if (!this.textContainer || !this.textContainer.nativeElement) return;
    const el = this.textContainer.nativeElement;

    // Parse root margin into GSAP start value
    const startPct = (1 - this.threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(this.rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    this.splitInstance = new SplitType(el, { 
      types: this.splitType as any,
    });
    
    let targets: any[] = [];
    if (this.splitType.includes('chars') && this.splitInstance.chars?.length) targets = this.splitInstance.chars;
    else if (this.splitType.includes('words') && this.splitInstance.words?.length) targets = this.splitInstance.words;
    else if (this.splitType.includes('lines') && this.splitInstance.lines?.length) targets = this.splitInstance.lines;

    if (!targets || targets.length === 0) return;

    // Handle overflow hidden for smooth Y-axis entrance
    if (this.from.y || this.from.yPercent) {
      if (this.splitType.includes('words') && this.splitInstance.words) {
         this.splitInstance.words.forEach((w: HTMLElement) => {
           w.style.overflow = 'hidden';
           w.style.paddingBottom = '0.1em';
           w.style.marginBottom = '-0.1em';
         });
      }
      if (this.splitType.includes('lines') && this.splitInstance.lines && !this.splitType.includes('words') && !this.splitType.includes('chars')) {
        this.splitInstance.lines.forEach((l: HTMLElement) => {
          l.style.overflow = 'hidden';
          l.style.paddingBottom = '0.1em';
          l.style.marginBottom = '-0.1em';
        });
      }
    }

    this.tl = gsap.fromTo(targets, 
      this.from,
      {
        ...this.to,
        duration: this.duration,
        ease: this.ease,
        stagger: this.delay / 1000,
        willChange: 'transform, opacity',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: start,
          once: true,
          fastScrollEnd: true
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.tl) {
      this.tl.kill();
    }
    if (this.splitInstance) {
      this.splitInstance.revert();
    }
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === this.textContainer?.nativeElement) {
        st.kill();
      }
    });
  }
}
