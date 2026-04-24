import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { animate } from 'motion';

@Directive({
  selector: '[magnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.el.nativeElement.style.willChange = 'transform';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    
    // Calculate center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Move element slightly towards the cursor (magnetic effect)
    const x = (event.clientX - centerX) * 0.35;
    const y = (event.clientY - centerY) * 0.35;

    animate(this.el.nativeElement, { x, y }, { duration: 0.1 });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Snap back on leave
    animate(
      this.el.nativeElement,
      { x: 0, y: 0 },
      { type: 'spring', stiffness: 250, damping: 15, mass: 0.5 }
    );
  }
}
