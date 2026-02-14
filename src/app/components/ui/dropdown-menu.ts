import {
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  ViewChild,
  signal,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'

/* ================= ROOT ================= */

@Component({
  selector: 'ui-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content select="[dropdownTrigger]"></ng-content>

    <ng-template #menuTpl>
      <div
        class="z-50 min-w-[8rem] max-h-[var(--radix-dropdown-menu-content-available-height)]
               overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1
               text-popover-foreground shadow-md
               data-[state=open]:animate-in data-[state=closed]:animate-out
               data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0
               data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
      >
        <ng-content select="[dropdownContent]"></ng-content>
      </div>
    </ng-template>
  `,
})
export class DropdownMenuComponent {
  @ViewChild('menuTpl') menuTpl!: TemplateRef<any>

  private overlay = inject(Overlay)
  private vcr = inject(ViewContainerRef)
  private overlayRef?: OverlayRef

  open = signal(false)

  toggle(trigger: HTMLElement) {
    this.open() ? this.close() : this.openMenu(trigger)
  }

  openMenu(trigger: HTMLElement) {
    if (this.overlayRef) return

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
        ]),
    })

    this.overlayRef.backdropClick().subscribe(() => this.close())

    this.overlayRef.attach(
      new TemplatePortal(this.menuTpl, this.vcr)
    )

    this.open.set(true)
  }

  close() {
    this.overlayRef?.dispose()
    this.overlayRef = undefined
    this.open.set(false)
  }
}

/* ================= TRIGGER ================= */

@Directive({
  selector: '[dropdownTrigger]',
  standalone: true,
})
export class DropdownMenuTriggerDirective {
  constructor(private menu: DropdownMenuComponent) {}

  onClick(event: MouseEvent) {
    this.menu.toggle(event.currentTarget as HTMLElement)
  }
}

/* ================= ITEMS ================= */

@Directive({
  selector: '[dropdownItem]',
  standalone: true,
  host: {
    class:
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ' +
      'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    tabindex: '0',
  },
})
export class DropdownMenuItemDirective {}

/* ================= LABEL ================= */

@Directive({
  selector: '[dropdownLabel]',
  standalone: true,
  host: {
    class: 'px-2 py-1.5 text-sm font-semibold',
  },
})
export class DropdownMenuLabelDirective {}

/* ================= SEPARATOR ================= */

@Directive({
  selector: '[dropdownSeparator]',
  standalone: true,
  host: {
    class: '-mx-1 my-1 h-px bg-muted',
  },
})
export class DropdownMenuSeparatorDirective {}

/* ================= SHORTCUT ================= */

@Directive({
  selector: '[dropdownShortcut]',
  standalone: true,
  host: {
    class: 'ml-auto text-xs tracking-widest opacity-60',
  },
})
export class DropdownMenuShortcutDirective {}
