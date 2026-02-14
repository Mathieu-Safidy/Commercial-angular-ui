import {
  Component,
  Injectable,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ContentChild,
  TemplateRef,
  forwardRef,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

// --- CONFIGURATION ET TYPES ---
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

type SidebarState = "expanded" | "collapsed";

// --- SERVICE D'ÉTAT (Le "Context" React) ---
@Injectable()
export class SidebarService {
  open = signal<boolean>(this.getInitialState());
  openMobile = signal<boolean>(false);
  isMobile = signal<boolean>(window.innerWidth < 768);
  state = computed(() => this.open() ? 'expanded' : 'collapsed');

  private getInitialState(): boolean {
    if (typeof document === 'undefined') return true;
    const match = document.cookie.match(new RegExp('(^| )' + SIDEBAR_COOKIE_NAME + '=([^;]+)'));
    return match ? match[2] === 'true' : true;
  }

  toggle() {
    if (this.isMobile()) {
      this.openMobile.update(v => !v);
    } else {
      this.open.update(v => {
        const next = !v;
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        return next;
      });
    }
  }
}

// --- COMPOSANTS ---

@Component({
  selector: 'sidebar-provider',
  standalone: true,
  imports: [CommonModule],
  providers: [SidebarService],
  template: `
    <div
      class="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
      [style.--sidebar-width]="sidebarWidth"
      [style.--sidebar-width-icon]="sidebarWidthIcon">
      <ng-content></ng-content>
    </div>
  `
})
export class SidebarProvider {
  sidebarWidth = SIDEBAR_WIDTH;
  sidebarWidthIcon = SIDEBAR_WIDTH_ICON;
  svc = inject(SidebarService);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.svc.toggle();
    }
  }
}

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group peer hidden md:block text-sidebar-foreground"
         [attr.data-state]="svc.state()"
         [attr.data-collapsible]="svc.state() === 'collapsed' ? collapsible : ''"
         [attr.data-variant]="variant"
         [attr.data-side]="side">

      <div [class]="'relative h-full w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear ' +
                    'group-data-[collapsible=offcanvas]:w-0 ' +
                    'group-data-[side=right]:rotate-180 ' +
                    (variant === 'floating' || variant === 'inset'
                      ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
                      : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]')">
      </div>

      <div [class]="'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex ' +
                    (side === 'left'
                      ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] '
                      : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] ') +
                    (variant === 'floating' || variant === 'inset'
                      ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]'
                      : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] border-sidebar-border ' + (side === 'left' ? 'border-r' : 'border-l'))">

        <div data-sidebar="sidebar" class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow">
          <ng-content></ng-content>
        </div>
      </div>
    </div>

    <div *ngIf="svc.isMobile() && svc.openMobile()"
         class="fixed inset-0 z-50 bg-black/50 md:hidden" (click)="svc.openMobile.set(false)"></div>
    <div *ngIf="svc.isMobile()"
         [class]="'fixed inset-y-0 left-0 z-50 w-[18rem] bg-sidebar transition-transform duration-300 md:hidden ' + (svc.openMobile() ? 'translate-x-0' : '-translate-x-full')">
       <ng-content></ng-content>
    </div>
  `
})
export class Sidebar {
  @Input() side: 'left' | 'right' = 'left';
  @Input() variant: 'sidebar' | 'floating' | 'inset' = 'sidebar';
  @Input() collapsible: 'offcanvas' | 'icon' | 'none' = 'icon';
  svc = inject(SidebarService);
}

// --- COMPOSANTS DE STRUCTURE ---

@Component({ selector: 'sidebar-header', standalone: true, template: `<div class="flex flex-col gap-2 p-2"><ng-content></ng-content></div>` })
export class SidebarHeader {}

@Component({ selector: 'sidebar-content', standalone: true, template: `<div class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"><ng-content></ng-content></div>` })
export class SidebarContent {}

@Component({ selector: 'sidebar-footer', standalone: true, template: `<div class="flex flex-col gap-2 p-2"><ng-content></ng-content></div>` })
export class SidebarFooter {}

@Component({ selector: 'sidebar-group', standalone: true, template: `<div class="relative flex w-full min-w-0 flex-col p-2"><ng-content></ng-content></div>` })
export class SidebarGroup {}

@Component({
  selector: 'sidebar-menu-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.data-sidebar]="'menu-button'"
      [attr.data-size]="size"
      [attr.data-active]="isActive"
      [class]="'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 ' +
               (isActive ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground' : '')">
      <ng-content></ng-content>
    </button>
  `
})
export class SidebarMenuButton {
  @Input() isActive = false;
  @Input() size: 'default' | 'sm' | 'lg' = 'default';
}

@Component({
  selector: 'sidebar-menu-sub',
  standalone: true,
  template: `
    <ul class="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden">
      <ng-content></ng-content>
    </ul>
  `
})
export class SidebarMenuSub {}

@Component({
  selector: 'sidebar-rail',
  standalone: true,
  template: `
    <button
      (click)="svc.toggle()"
      class="absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex">
    </button>
  `
})
export class SidebarRail {
  svc = inject(SidebarService);
}

@Component({
  selector: 'sidebar-trigger',
  standalone: true,
  template: `
    <button (click)="svc.toggle()" class="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-sidebar-accent">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `
})
export class SidebarTrigger {
  svc = inject(SidebarService);
}
