import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  inject,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: "app-split-text",
  standalone: true,
  template: `
    <div style="display: contents;">
      <div
        #textContainer
        [class]="'split-parent ' + className"
        [style.text-align]="textAlign"
        style="display: inline-block; white-space: normal; word-wrap: break-word; will-change: transform, opacity;"
      >
        <ng-content></ng-content>
        {{ text }}
      </div>
    </div>
  `,
})
export class SplitTextComponent implements AfterViewInit, OnDestroy {
  @Input() text: string = "";
  @Input() className = "";
  @Input() delay = 50; // ms
  @Input() duration = 1.25; // s
  @Input() ease = "power3.out";
  @Input() splitType:
    | "chars"
    | "words"
    | "lines"
    | "words,chars"
    | "lines,words"
    | "lines,words,chars" = "chars";
  @Input() from: Record<string, unknown> = { opacity: 0, y: 40 };
  @Input() to: Record<string, unknown> = { opacity: 1, y: 0 };
  @Input() yOffset: string | number | null = null;
  @Input() threshold = 0.1;
  @Input() rootMargin = "-100px";
  @Input() textAlign = "center";

  @ViewChild("textContainer") textContainer!: ElementRef;

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
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
      this.rootMargin,
    );
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const sign =
      marginValue === 0
        ? ""
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    this.splitInstance = new SplitType(el, {
      types: this.splitType as any,
    });

    let targets: HTMLElement[] | null = [];
    if (this.splitType.includes("chars") && this.splitInstance.chars?.length)
      targets = this.splitInstance.chars;
    else if (
      this.splitType.includes("words") &&
      this.splitInstance.words?.length
    )
      targets = this.splitInstance.words;
    else if (
      this.splitType.includes("lines") &&
      this.splitInstance.lines?.length
    )
      targets = this.splitInstance.lines;

    if (!targets || targets.length === 0) return;

    let fromConfig = { ...this.from };
    if (this.yOffset !== null) {
      fromConfig["y"] = this.yOffset;
    }

    if (fromConfig["y"] || fromConfig["yPercent"]) {
      if (
        this.splitType.includes("chars") &&
        this.splitType.includes("words") &&
        this.splitInstance.words
      ) {
        // If animating chars, mask using words
        this.splitInstance.words.forEach((w: HTMLElement) => {
          w.style.overflow = "hidden";
          w.style.paddingBottom = "0.1em";
          w.style.marginBottom = "-0.1em";
        });
      } else if (
        this.splitType.includes("words") &&
        this.splitType.includes("lines") &&
        this.splitInstance.lines
      ) {
        // If animating words, mask using lines
        this.splitInstance.lines.forEach((l: HTMLElement) => {
          l.style.overflow = "hidden";
          l.style.paddingBottom = "0.1em";
          l.style.marginBottom = "-0.1em";
        });
      } else if (this.splitType === "lines" && this.splitInstance.lines) {
        // If animating lines, there is no parent wrapper created by split-type to mask them easily,
        // unless we wrap them. In this case, we just animate them without masking.
        // Or we could wrap each line in a container.
        this.splitInstance.lines.forEach((l: HTMLElement) => {
          l.style.overflow = "hidden";
        });
      }
    }

    this.tl = gsap.fromTo(targets, fromConfig, {
      ...this.to,
      duration: this.duration,
      ease: this.ease,
      stagger: this.delay / 1000,
      willChange: "transform, opacity",
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: start,
        once: true,
        fastScrollEnd: true,
      },
    });
  }

  ngOnDestroy() {
    if (this.tl) {
      this.tl.kill();
    }
    if (this.splitInstance) {
      this.splitInstance.revert();
    }
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === this.textContainer?.nativeElement) {
        st.kill();
      }
    });
  }
}
