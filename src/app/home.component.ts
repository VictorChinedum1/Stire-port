import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  OnDestroy,
  signal,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { RotatingTextComponent } from "./rotating-text.component";
import { SplitTextComponent } from "./split-text.component";
import { RouterModule, Router } from "@angular/router";
import { animate, stagger } from "motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RotatingTextComponent,
    SplitTextComponent,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading Screen Overlay -->
    <div
      id="loader"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-[#522218] overflow-hidden"
    >
      <div
        id="loaderSContainer"
        class="relative font-serif text-[25vw] font-bold leading-none origin-center"
        style="transform: scale(0.5); opacity: 1;"
      >
        <!-- Base S (Black) -->
        <div class="text-black">S</div>
        <!-- Fill S (Cream) -->
        <div
          id="loaderSFill"
          class="absolute inset-0 text-[#FAF6F0]"
          style="clip-path: inset(100% 0 0 0);"
        >
          S
        </div>
      </div>
    </div>

    <!-- HERO SECTION (Fold 1) -->
    <div
      id="hero-container"
      class="h-screen flex flex-col w-full relative z-10 will-change-transform transform-gpu overflow-hidden justify-center pt-48 lg:pt-[25vh]"
    >
      <!-- Particles Canvas -->
      <canvas
        id="particle-canvas"
        class="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-60 transition-opacity duration-1000"
      ></canvas>

      <!-- Background ST -->
      <div
        class="absolute inset-0 flex items-center justify-end pointer-events-none z-0 overflow-hidden right-0"
      >
        <span
          class="font-display text-[45vw] md:text-[40vw] text-[#522218]/[0.05] dark:text-[#6B2E20] leading-none select-none translate-x-[15%] md:translate-x-[10%] -translate-y-[5%] hero-st opacity-0"
        >
          ST
        </span>
      </div>

      <!-- Main Brutalist Hero Content -->
      <main
        id="hero-content"
        class="flex-grow flex flex-col justify-center px-6 md:px-12 z-10 w-full max-w-[1500px] mx-auto pb-16 md:pb-24 select-none"
      >
        <div
          class="flex flex-col font-serif uppercase tracking-tight leading-[0.95] text-left text-[10vw] sm:text-[9vw] md:text-[7.5vw] xl:text-[8rem] 2xl:text-[9rem]"
        >
          <!-- First Line -->
          <div
            class="block hero-line opacity-0"
            style="transform: translateX(-400px);"
          >
            <div class="hero-scroll-1 relative origin-left inline-block">
              <span class="stirring-text inline-block">STIRRING</span>
              <span
                class="elevating-text absolute top-0 left-0 opacity-0 inline-block"
                >ELEVATING</span
              >
            </div>
          </div>

          <!-- Second Line -->
          <div
            class="flex items-center italic font-light mt-[-1%] md:mt-[-0.5%] hero-line opacity-0"
            style="transform: translateX(-400px);"
          >
            <div class="hero-scroll-2 origin-left inline-flex items-center">
              <span
                class="font-sans font-light text-[0.85em] md:text-[0.75em] mr-[1vw] md:mr-[1.5vw] transform -translate-y-[8%] opacity-60"
                >[</span
              >
              <app-rotating-text
                class="font-serif"
                [texts]="['VISIONS', 'BRANDS', 'CONCEPTS']"
                [intervalMs]="3000"
                [loop]="true"
              ></app-rotating-text>
              <span
                class="font-sans font-light text-[0.85em] md:text-[0.75em] ml-[1vw] md:ml-[1.5vw] transform -translate-y-[8%] opacity-60"
                >]</span
              >
            </div>
          </div>

          <!-- Third Line -->
          <div
            class="block mt-[-1%] md:mt-[-0.5%] hero-line opacity-0"
            style="transform: translateX(-400px);"
          >
            <div class="hero-scroll-3 relative origin-left inline-block">
              <span class="into-reality-text inline-block whitespace-nowrap"
                >INTO REALITY.</span
              >
              <span
                class="improve-text absolute top-0 left-0 opacity-0 inline-block whitespace-nowrap"
                >IMPROVE</span
              >
            </div>
          </div>
        </div>

        <app-split-text
          className="hero-sub mt-6 md:mt-10 font-sans text-base md:text-xl lg:text-2xl max-w-2xl opacity-70 tracking-tight leading-relaxed lg:pl-1"
          text="We turn bold ideas into brands that move the world."
          splitType="words,chars"
          [delay]="20"
          [duration]="1"
          textAlign="left"
        ></app-split-text>
      </main>
    </div>

    <!-- Stacking Wrapper -->
    <div
      class="relative w-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-black"
    >
      <!-- ABOUT US SECTION (Fold 2) -->
      <section
        id="about-section"
        class="w-full min-h-[100vh] flex flex-col justify-center py-24 md:py-40 px-6 md:px-12 bg-[#FAF6F0] text-[#522218] dark:bg-[#3D1A12] dark:text-[#FAF6F0] transition-colors duration-500 transform-gpu overflow-hidden"
      >
        <div
          class="about-container max-w-[1500px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 justify-center"
        >
          <!-- Main Content -->
          <div
            class="w-full max-w-4xl flex flex-col items-start xl:items-center xl:text-center relative"
          >
            <!-- Decorative Quote Icon -->
            <mat-icon
              class="about-quote-icon absolute -top-16 -left-8 md:-top-24 md:-left-16 text-[120px] md:text-[200px] w-auto h-auto leading-none opacity-5 text-[#522218] dark:text-[#FAF6F0] transform-gpu pointer-events-none -scale-x-100"
              >format_quote</mat-icon
            >
            <app-split-text
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-8 uppercase text-left xl:text-center"
              splitType="words"
              [delay]="100"
              [duration]="1.5"
              textAlign="left xl:text-center"
            >
              <span class="italic font-light">driven by</span> purpose.
            </app-split-text>
            <app-split-text
              className="font-sans text-base md:text-xl lg:text-2xl max-w-3xl opacity-80 leading-relaxed mb-12 text-left xl:text-center"
              text="Stire was founded on the belief that brands should not only stand out but move people. We combine brutalist aesthetics with refined typography to craft digital experiences that leave a lasting mark, pushing boundaries to redefine what is possible on the web."
              splitType="chars"
              [delay]="20"
              [duration]="1"
              textAlign="left xl:text-center"
            >
            </app-split-text>

            <!-- Button adjusted: no hover bg, reduced y-padding -->
            <button
              (click)="goToAbout()"
              class="about-item opacity-0 translate-y-[40px] group flex items-center justify-center gap-3 px-8 py-2 rounded-[100px] border border-[#522218]/50 dark:border-[#FAF6F0]/50 text-[#522218] dark:text-[#FAF6F0] focus:outline-none transition-all duration-300"
            >
              <span
                class="inline-block transition-transform duration-300 font-bold uppercase tracking-[0.1em] text-[13px] leading-none"
              >
                About us
              </span>
              <mat-icon
                class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >arrow_outward</mat-icon
              >
            </button>

            <div
              class="about-item opacity-0 translate-y-[40px] flex xl:justify-center items-center gap-4 border-t border-[#522218]/20 dark:border-[#FAF6F0]/20 pt-6 mt-10 w-full max-w-2xl"
            >
              <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Team"
                  class="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
                  referrerpolicy="no-referrer"
                />
              </div>
              <div>
                <div class="font-bold tracking-wider text-sm uppercase">
                  Creative Direction
                </div>
                <div class="opacity-70 text-sm">Founded in 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacer to create delay before next section overlaps -->
      <div
        class="w-full h-[80vh] md:h-[100vh] pointer-events-none bg-black"
      ></div>

      <!-- IMAGE GALLERY SECTION (Fold 3) -->
      <section
        class="gallery-section relative z-30 w-full h-screen flex flex-row items-center justify-center overflow-hidden bg-[#FAF6F0] dark:bg-[#3D1A12] transition-colors duration-500"
      >
        <!-- Left Text -->
        <h1
          class="left-text absolute left-[4%] md:left-[8%] text-[10vw] md:text-[8vw] font-serif uppercase tracking-tighter text-[#522218] dark:text-[#FAF6F0] z-10 pointer-events-none transform-gpu origin-left leading-none italic font-light"
        >
          Craft
        </h1>

        <!-- Middle Image Container -->
        <div
          class="gallery-wrapper relative overflow-hidden rounded-[20px] w-16 h-16 md:w-20 md:h-20 will-change-transform transform-gpu shadow-xl z-20 bg-black flex items-center justify-center"
        >
          <!-- Initial S -->
          <div
            class="gallery-initial-s absolute inset-0 flex items-center justify-center font-serif text-4xl md:text-5xl text-white pointer-events-none transition-opacity duration-300 italic font-medium z-40"
          >
            s
          </div>

          <!-- Works Content (Appears after expansion) -->
          <div
            class="works-content absolute inset-0 z-30 flex flex-col lg:flex-row opacity-0 pointer-events-none p-6 md:p-12 lg:p-24 pb-8 overflow-hidden h-full"
          >
            <!-- Left Column: Title & Button -->
            <div
              class="w-full lg:w-[35%] flex flex-col justify-center items-start text-white mb-8 lg:mb-0 lg:pl-8"
            >
              <button
                class="works-btn flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-white/30 rounded-[100px] hover:bg-white hover:text-black transition-colors duration-300 opacity-0 translate-y-4 shadow-xl backdrop-blur-sm group"
              >
                <span
                  class="text-[10px] md:text-xs tracking-widest font-medium uppercase"
                  >Our Works</span
                >
                <span
                  class="text-[10px] md:text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                  >11</span
                >
                <mat-icon
                  class="text-sm md:text-base w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform"
                  >arrow_forward</mat-icon
                >
              </button>
            </div>

            <!-- Right Column: Works Grid -->
            <div
              class="works-right-col w-full lg:w-[65%] h-[50vh] lg:h-full overflow-hidden pointer-events-auto relative"
            >
              <div
                class="works-grid absolute top-12 lg:top-24 left-0 right-0 grid grid-cols-2 gap-4 md:gap-8 w-full pb-32 lg:pb-64"
              >
                <!-- Item 1 (Dark Theme) -->
                <div
                  class="work-card group rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl bg-[#0f0f0f] aspect-[3/4] opacity-0 translate-y-12 cursor-pointer mt-12 lg:mt-24"
                >
                  <img
                    src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop"
                    class="w-full h-full object-cover opacity-80 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
                    alt="Work 1"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  ></div>
                  <div
                    class="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div
                      class="text-white uppercase text-sm md:text-xl font-bold tracking-tight mb-1"
                    >
                      Monster Energy
                    </div>
                    <div
                      class="text-white/0 group-hover:text-white/80 text-xs md:text-sm font-light max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      Bold typography and high-performance brand identity.
                    </div>
                  </div>
                </div>

                <!-- Item 2 (Light Theme) -->
                <div
                  class="work-card group rounded-2xl md:rounded-[40px] overflow-hidden relative shadow-2xl bg-[#f0f0f0] aspect-[3/4] opacity-0 translate-y-12 cursor-pointer"
                >
                  <div
                    class="absolute inset-0 opacity-[0.03] z-0"
                    style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"
                  ></div>
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop"
                    class="w-[120%] h-[120%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110 z-0"
                    alt="Work 2"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  ></div>
                  <div
                    class="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div
                      class="text-black group-hover:text-white uppercase text-sm md:text-xl font-bold tracking-tight mb-1 transition-colors duration-500"
                    >
                      Vizcom
                    </div>
                    <div
                      class="text-white/0 group-hover:text-white/80 text-xs md:text-sm font-light max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      AI-powered automotive rendering interface.
                    </div>
                  </div>
                </div>

                <!-- Item 3 (Dark Theme) -->
                <div
                  class="work-card group rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl bg-[#0f0f0f] aspect-[3/4] opacity-0 translate-y-12 cursor-pointer mt-12 lg:mt-24"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop"
                    class="w-full h-full object-cover opacity-80 mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
                    alt="Work 3"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  ></div>
                  <div
                    class="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div
                      class="text-white uppercase text-sm md:text-xl font-bold tracking-tight mb-1"
                    >
                      Minimalism
                    </div>
                    <div
                      class="text-white/0 group-hover:text-white/80 text-xs md:text-sm font-light max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      Clean lines and abstract forms.
                    </div>
                  </div>
                </div>

                <!-- Item 4 (Abstract Theme) -->
                <div
                  class="work-card group rounded-2xl md:rounded-[40px] overflow-hidden relative shadow-2xl bg-[#0a0a0a] aspect-[3/4] opacity-0 translate-y-12 cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                    class="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                    alt="Work 4"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  ></div>
                  <div
                    class="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div
                      class="text-white uppercase text-sm md:text-xl font-bold tracking-tight mb-1"
                    >
                      Spatial
                    </div>
                    <div
                      class="text-white/0 group-hover:text-white/80 text-xs md:text-sm font-light max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      3D environments and immersive spaces.
                    </div>
                  </div>
                </div>

                <!-- Item 5 (Branding) -->
                <div
                  class="work-card group rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl bg-[#f0f0f0] aspect-[3/4] opacity-0 translate-y-12 cursor-pointer mt-12 lg:mt-24"
                >
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Work 5"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  ></div>
                  <div
                    class="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div
                      class="text-black group-hover:text-white uppercase text-sm md:text-xl font-bold tracking-tight mb-1 transition-colors duration-500"
                    >
                      Aura
                    </div>
                    <div
                      class="text-white/0 group-hover:text-white/80 text-xs md:text-sm font-light max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                      Elevating natural luxury.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Text -->
        <h1
          class="right-text absolute right-[4%] md:right-[8%] text-[10vw] md:text-[8vw] font-serif uppercase tracking-tighter text-[#522218] dark:text-[#FAF6F0] z-10 pointer-events-none transform-gpu origin-right leading-none italic font-light"
        >
          Bold
        </h1>
      </section>

      <!-- SERVICES SECTION (Fold 4) -->
      <section
        id="services-section"
        class="relative z-[45] w-full bg-[#FAF6F0] dark:bg-[#522218] text-[#522218] dark:text-[#FAF6F0] py-24 md:py-40 flex justify-center transition-colors duration-500 overflow-hidden"
      >
        <div
          class="max-w-[1500px] w-full mx-auto px-6 md:px-12"
          style="perspective: 1200px;"
        >
          <div
            class="flex flex-col border-t border-[#522218]/20 dark:border-white/20"
          >
            @for (item of services; track item.num; let i = $index) {
              <div
                class="service-item w-full border-b border-[#522218]/20 dark:border-white/20 cursor-pointer overflow-hidden flex flex-col justify-end relative transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group"
                [ngClass]="
                  activeService() === i
                    ? 'pt-32 md:pt-48 pb-10 md:pb-14'
                    : 'pt-10 md:pt-16 pb-6 md:pb-8 hover:bg-[#522218]/5 dark:hover:bg-white/5'
                "
                (click)="activeService.set(i)"
              >
                <!-- Big huge number -->
                <div
                  class="absolute left-[-2%] md:left-4 top-4 md:top-8 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"
                  [ngClass]="
                    activeService() === i
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-[-5%] opacity-30 dark:opacity-50 group-hover:opacity-100'
                  "
                >
                  <span
                    class="text-[100px] md:text-[160px] lg:text-[200px] leading-[0.8] tracking-tighter font-sans font-light text-[#522218]/10 dark:text-white/10 drop-shadow-sm"
                  >
                    {{ item.num }}
                  </span>
                </div>

                <!-- Foreground Content -->
                <div
                  class="w-full relative z-10 flex flex-row items-end justify-between md:pl-[40%] lg:pl-[45%]"
                >
                  <!-- Content Area -->
                  <div class="flex-1 flex flex-col w-full">
                    <h3
                      class="text-xl md:text-2xl lg:text-3xl uppercase tracking-wider font-light text-[#522218] dark:text-white transition-all duration-700"
                      [ngClass]="
                        activeService() === i ? 'mb-8 md:mb-12' : 'mb-0'
                      "
                    >
                      {{ item.title }}
                    </h3>

                    <div
                      class="grid transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      [ngClass]="
                        activeService() === i
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      "
                    >
                      <div class="overflow-hidden">
                        <div class="flex flex-col gap-6 max-w-xl md:pt-2">
                          <p
                            class="text-[12px] md:text-[14px] text-[#522218]/70 dark:text-white/70 font-light leading-relaxed flex items-start"
                          >
                            <span
                              class="mr-3 text-[#522218]/40 dark:text-white/40 mt-1 border border-[#522218]/40 dark:border-white/40 rounded-full w-2 h-2 md:w-3 md:h-3 flex-shrink-0 inline-block"
                            ></span>
                            {{ item.desc }}
                          </p>
                          <div
                            class="flex flex-col gap-1 text-[10px] md:text-[12px] text-[#522218]/50 dark:text-white/50 font-light ml-5 md:ml-6"
                          >
                            <div>
                              Location:
                              <span
                                class="text-[#522218]/90 dark:text-white/90"
                                >{{ item.location }}</span
                              >
                            </div>
                            <div>
                              Domain:
                              <span
                                class="text-[#522218]/90 dark:text-white/90"
                                >{{ item.domain }}</span
                              >
                            </div>
                            <div>
                              Work experience:
                              <span
                                class="text-[#522218]/90 dark:text-white/90"
                                >{{ item.exp }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Icon Area -->
                  <div class="ml-4 flex-shrink-0 mb-1 md:mb-2">
                    <div
                      class="relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      [ngClass]="
                        activeService() === i
                          ? 'bg-[#522218] dark:bg-white border-[#522218] dark:border-white text-[#FAF6F0] dark:text-[#522218]'
                          : 'bg-transparent border-[#522218]/20 dark:border-white/20 text-[#522218] dark:text-white group-hover:border-[#522218]/50 dark:group-hover:border-white/50'
                      "
                    >
                      <div
                        class="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                        [ngClass]="
                          activeService() === i ? 'rotate-180' : 'rotate-0'
                        "
                      >
                        <mat-icon
                          class="absolute transition-all duration-500 font-thin text-[18px] w-[18px] h-[18px] leading-[18px]"
                          [ngClass]="
                            activeService() === i
                              ? 'opacity-0 scale-50'
                              : 'opacity-100 scale-100'
                          "
                          >add</mat-icon
                        >
                        <mat-icon
                          class="absolute transition-all duration-500 font-thin text-[18px] w-[18px] h-[18px] leading-[18px]"
                          [ngClass]="
                            activeService() === i
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-50'
                          "
                          >remove</mat-icon
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- FOOTER SECTION -->
      <section
        class="footer-section relative z-50 w-full bg-[#522218] dark:bg-[#FAF6F0] text-[#FAF6F0] dark:text-[#522218] py-24 md:py-32 flex justify-center overflow-hidden"
      >
        <!-- Decorative circular lines -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] md:w-[80vw] aspect-square rounded-full border border-dashed border-[#FAF6F0]/20 dark:border-[#522218]/20 pointer-events-none"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[60vw] aspect-square rounded-full border border-dashed border-[#FAF6F0]/10 dark:border-[#522218]/10 pointer-events-none"
        ></div>

        <div
          class="max-w-[1500px] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col xl:flex-row justify-between gap-16 md:gap-20"
        >
          <!-- Left side: Big Text and Button -->
          <div class="flex-1 flex flex-col justify-between max-w-4xl">
            <h2
              class="font-sans font-light text-[12vw] sm:text-[9vw] xl:text-[80px] leading-[1.1] tracking-tight uppercase footer-stire w-full"
            >
              <div class="overflow-hidden pb-2 -mb-2">
                <div class="footer-line-text translate-y-[120%] opacity-0">
                  Ready to stir
                </div>
              </div>
              <div
                class="flex flex-wrap items-center gap-4 xl:gap-8 min-h-[1.2em] mt-2 xl:mt-4"
              >
                <div class="overflow-hidden pb-2 -mb-2">
                  <div class="footer-line-text translate-y-[120%] opacity-0">
                    something
                  </div>
                </div>
                <div class="footer-btn-wrapper opacity-0 translate-y-8">
                  <button
                    class="flex items-center gap-3 px-6 py-3 xl:px-8 xl:py-4 rounded-[40px] border border-[#FAF6F0]/30 dark:border-[#522218]/30 hover:bg-[#FAF6F0] hover:text-[#522218] dark:hover:bg-[#522218] dark:hover:text-[#FAF6F0] transition-colors duration-500 font-sans tracking-widest text-[10px] xl:text-xs uppercase whitespace-nowrap mt-2 sm:mt-0 font-medium"
                  >
                    Get in touch
                    <mat-icon
                      class="text-[16px] w-4 h-4 leading-4 flex items-center justify-center"
                      >arrow_forward</mat-icon
                    >
                  </button>
                </div>
              </div>
              <div class="overflow-hidden pb-2 -mb-2 mt-2 xl:mt-4">
                <div class="footer-line-text translate-y-[120%] opacity-0">
                  great?
                </div>
              </div>
            </h2>
          </div>

          <!-- Right side: Links Grid -->
          <div
            class="flex-[0.7] grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 font-sans text-[10px] sm:text-xs tracking-widest uppercase opacity-80 pt-4 xl:pt-8 footer-links"
          >
            <!-- Sitemap -->
            <div class="flex flex-col gap-6">
              <span class="opacity-50 mb-1">Sitemap</span>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Home</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >About Us</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Work</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Services</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Contact</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
            </div>

            <!-- Connect -->
            <div class="flex flex-col gap-6">
              <span class="opacity-50 mb-1">Connect</span>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Twitter</span
                >
                <span
                  class="opacity-0 translate-y-2 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                  >↗</span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Awwwards</span
                >
                <span
                  class="opacity-0 translate-y-2 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                  >↗</span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >FWA</span
                >
                <span
                  class="opacity-0 translate-y-2 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                  >↗</span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Instagram</span
                >
                <span
                  class="opacity-0 translate-y-2 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                  >↗</span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >LinkedIn</span
                >
                <span
                  class="opacity-0 translate-y-2 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                  >↗</span
                >
              </a>
            </div>

            <!-- Offices -->
            <div class="flex flex-col gap-6">
              <span class="opacity-50 mb-1">Offices</span>
              <span
                class="hover:opacity-100 transition-opacity cursor-pointer group w-fit relative overflow-hidden pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current"
                >London</span
              >
              <span
                class="hover:opacity-100 transition-opacity cursor-pointer group w-fit relative overflow-hidden pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current"
                >Glasgow</span
              >
            </div>

            <!-- Admin -->
            <div class="flex flex-col gap-6">
              <span class="opacity-50 mb-1 mt-2 lg:mt-0">Admin</span>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Privacy</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
              <a
                href="#"
                class="hover:opacity-100 transition-opacity flex items-center justify-between group w-fit gap-4 relative overflow-hidden"
              >
                <span
                  class="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-out after:duration-500 after:bg-current pb-1"
                  >Careers</span
                >
                <span
                  class="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                  >-></span
                >
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private splits: SplitType[] = [];
  private cleanupParticles?: () => void;

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  activeService = signal<number | null>(0);

  services = [
    {
      num: "01",
      title: "BRAND DESIGNER",
      location: "Stockholm",
      domain: "Domeniste lauro: notte nome",
      exp: "4+ years",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Suspendisse in est ante in. Nibh sit amet commodo nulla facilisis nullam vehicula the entolo ullamcorper sit.",
    },
    {
      num: "02",
      title: "MARKETING",
      location: "London",
      domain: "Digital Marketing Strategy",
      exp: "5+ years",
      desc: "Crafting robust marketing strategies that penetrate markets and captivate target audiences globally. We blend data with creativity.",
    },
    {
      num: "03",
      title: "VR DESIGNER",
      location: "Berlin",
      domain: "Virtual Reality Interfacing",
      exp: "3+ years",
      desc: "Designing immersive virtual realities that redefine interaction. Specializing in spatial UI and environment conceptualization.",
    },
    {
      num: "04",
      title: "WEB DEVELOP",
      location: "Remote",
      domain: "Frontend Engineering",
      exp: "6+ years",
      desc: "Building high-performance web applications with brutalist aesthetics and meticulous motion design. Pushing browser capabilities.",
    },
  ];

  goToAbout() {
    this.router.navigate(["/about"]);
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // 1. Fill S slowly with white (4 seconds)
    await animate(
      "#loaderSFill",
      { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] },
      { duration: 4, ease: "linear" },
    );

    // Tiny pause
    await new Promise((r) => setTimeout(r, 200));

    // 2. Zoom S massively
    const sAnimation = animate(
      "#loaderSContainer",
      { scale: [0.5, 300], opacity: [1, 0] },
      { duration: 1.5, ease: [0.5, 0, 0.5, 1] },
    );

    try {
      await sAnimation;
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
    }

    // Hide loader
    const loader = document.getElementById("loader");
    if (loader) {
      animate("#loader", { opacity: 0 }, { duration: 0.4 });
      setTimeout(() => {
        if (loader) loader.style.display = "none";
      }, 400);
    }

    // Slide in background ST
    animate(
      ".hero-st",
      { opacity: [0, 1] },
      { duration: 1.5, ease: "easeOut", delay: 0.4 },
    );

    // Stagger in hero lines
    animate(
      ".hero-line",
      { x: [-80, 0], scale: [0.95, 1], opacity: [0, 1] },
      { delay: stagger(0.06), duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    );

    this.setupScrollAnimations();
    this.initParticles();
  }

  initParticles() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.getElementById(
      "particle-canvas",
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;

    // Smooth mouse coordinates for physics
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", onResize);

    const imageUrls = [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507908708918-778587c9e563?w=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=100&auto=format&fit=crop",
    ];

    const loadedImages: HTMLImageElement[] = [];
    imageUrls.forEach((url) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      loadedImages.push(img);
    });

    const particles: Particle[] = [];
    const particleCount = width > 768 ? 30 : 15; // Less particles since they are images

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 40 + 20, // Much larger sizes
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        z: Math.random() * 2 + 0.5, // Z depth for parallax
        imgIndex: Math.floor(Math.random() * imageUrls.length),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let animationFrameId: number;

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse for smoother movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Parallax offset based on mouse position
        const dx = (mouseX - width / 2) * p.z * 0.05;
        const dy = (mouseY - height / 2) * p.z * 0.05;

        const drawX = p.x - dx;
        const drawY = p.y - dy;

        // Wrap around logic
        if (p.x < -150) p.x = width + 150;
        if (p.x > width + 150) p.x = -150;
        if (p.y < -150) p.y = height + 150;
        if (p.y > height + 150) p.y = -150;

        const img = loadedImages[p.imgIndex];
        if (img.complete && img.naturalWidth !== 0) {
          const drawSize = p.size * (1 + p.z * 0.5);
          ctx.save();
          ctx.translate(drawX, drawY);
          ctx.rotate(p.rotation);

          const isDark = document.documentElement.classList.contains("dark");
          // Adjust opacity based on theme and z-depth
          ctx.globalAlpha = isDark ? p.z * 0.25 : p.z * 0.35;

          // Draw rounded image
          ctx.beginPath();
          ctx.arc(0, 0, drawSize / 2, 0, Math.PI * 2);
          ctx.clip();

          ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Store cleanup function
    this.cleanupParticles = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }

  setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const heroContainer = document.getElementById("hero-container");
    const heroContent = document.getElementById("hero-content");

    // Create a timeline that pins the hero section and animates its contents
    if (heroContainer && heroContent) {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop / Tablet Animation
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: "top top",
            end: "+=1200",
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          },
        });

        const heroSt = document.querySelector(".hero-st") as HTMLElement | null;
        if (heroSt) {
          heroTl.to(
            heroSt,
            {
              yPercent: -40,
              opacity: 0,
              ease: "none",
              duration: 1,
            },
            0,
          );
        }

        heroTl.to(
          [".hero-sub", ".hero-scroll-2"],
          {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power1.out",
          },
          0,
        );

        heroTl.to(
          ".hero-scroll-1",
          { scale: 1.5, x: "-15vw", ease: "power2.inOut", duration: 0.8 },
          0,
        );
        heroTl.to(".stirring-text", { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to(".elevating-text", { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(
          ".hero-scroll-3",
          { scale: 1.5, x: "15vw", ease: "power2.inOut", duration: 0.8 },
          0,
        );
        heroTl.to(".into-reality-text", { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to(".improve-text", { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(
          [".hero-scroll-1", ".hero-scroll-3"],
          { opacity: 0, scale: 2, duration: 0.2 },
          0.8,
        );
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Animation
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: "top top",
            end: "+=1000",
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          },
        });

        const heroSt = document.querySelector(".hero-st") as HTMLElement | null;
        if (heroSt) {
          heroTl.to(
            heroSt,
            {
              yPercent: -25,
              opacity: 0,
              ease: "none",
              duration: 1,
            },
            0,
          );
        }

        heroTl.to(
          [".hero-sub", ".hero-scroll-2"],
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power1.out",
          },
          0,
        );

        heroTl.to(
          ".hero-scroll-1",
          { scale: 1.2, x: "-5vw", ease: "power2.inOut", duration: 0.8 },
          0,
        );
        heroTl.to(".stirring-text", { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to(".elevating-text", { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(
          ".hero-scroll-3",
          { scale: 1.2, x: "5vw", ease: "power2.inOut", duration: 0.8 },
          0,
        );
        heroTl.to(".into-reality-text", { opacity: 0, duration: 0.2 }, 0.3);
        heroTl.to(".improve-text", { opacity: 1, duration: 0.2 }, 0.3);

        heroTl.to(
          [".hero-scroll-1", ".hero-scroll-3"],
          { opacity: 0, scale: 1.5, duration: 0.2 },
          0.8,
        );
      });
    }

    const galleryTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gallery-section",
        start: "center center",
        end: "+=2500",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Left text smoothly slides left and fades out
    galleryTl.to(
      ".left-text",
      {
        x: "-40vw",
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0,
    );

    // Right text smoothly slides right and fades out
    galleryTl.to(
      ".right-text",
      {
        x: "40vw",
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0,
    );

    // Fade out the initial s
    galleryTl.to(
      ".gallery-initial-s",
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0,
    );

    // Show works content
    galleryTl.to(
      ".works-content",
      {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.1,
      },
      0.8,
    );

    // The image wrapper expands
    galleryTl.to(
      ".gallery-wrapper",
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      0,
    );

    // Stagger in the first row of elements (button, first 2 cards)
    galleryTl.to(
      [".works-btn", ".work-card:nth-child(1)", ".work-card:nth-child(2)"],
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      0.8,
    );

    // Animate the remaining cards coming in as they scroll up
    galleryTl.to(
      ".work-card:nth-child(n+3)",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.5,
        ease: "power3.out",
      },
      1.2,
    );

    // Scroll the projects up - Parallax effect for columns
    const gridY = () => {
      const grid = document.querySelector(".works-grid") as HTMLElement;
      const col = document.querySelector(".works-right-col") as HTMLElement;
      if (grid && col) {
        return -Math.max(0, grid.offsetHeight - col.offsetHeight + 100);
      }
      return -500;
    };

    galleryTl.to(
      ".work-card:nth-child(odd)",
      {
        y: gridY,
        duration: 2.5,
        ease: "none",
      },
      1.0,
    );

    galleryTl.to(
      ".work-card:nth-child(even)",
      {
        y: () => (gridY() as number) * 1.2, // Move faster for parallax
        duration: 2.5,
        ease: "none",
      },
      1.0,
    );

    // Stack animation for About section (shrinks and dims as next section comes up)
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "top top",
        endTrigger: ".gallery-section",
        end: "top top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      },
    });

    // The scale and opacity animation should only happen as the gallery section enters
    aboutTl
      .to("#about-section", { opacity: 1, duration: 0.6 }) // Do nothing for first 60% of scroll (delay)
      .to("#about-section", { scale: 0.9, opacity: 0.4, duration: 0.4 }); // Scale down during overlap

    // Stack animation for Gallery section entering Services section
    gsap.to(".gallery-wrapper", {
      scale: 0.9,
      opacity: 0.4,
      yPercent: 20,
      scrollTrigger: {
        trigger: "#services-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // Fade in animation for Service Items - staggered per item
    gsap.utils.toArray<HTMLElement>(".service-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100, rotateX: -15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Animate the rest of the about items (button, profile image etc)
    gsap.fromTo(
      [".about-item", ".about-quote-icon"],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: (i, target) =>
          target.classList.contains("about-quote-icon") ? 0.05 : 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Stack animation for Services section entering Footer section
    gsap.to("#services-section > div", {
      scale: 0.9,
      opacity: 0.2,
      yPercent: 10,
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // Sleek Fade in animation for Footer
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    footerTl.fromTo(
      ".footer-line-text",
      { y: "120%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
    );

    footerTl.fromTo(
      ".footer-btn-wrapper",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8",
    );

    footerTl.fromTo(
      ".footer-links > div",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6",
    );
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.splits.forEach((s) => s.revert());
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (this.cleanupParticles) {
      this.cleanupParticles();
    }
  }
}

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  imgIndex: number;
  rotation: number;
  rotSpeed: number;
}
