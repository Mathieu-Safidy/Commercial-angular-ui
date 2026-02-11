import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'

/* =========================
   SERVICE (équivalent Radix Root)
========================= */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private overlayRef?: OverlayRef

  open(template: TemplateRef<any>, vcr: ViewContainerRef) {
    this.overlayRef = this.createOverlay()
    this.overlayRef.attach(new TemplatePortal(template, vcr))
  }

  close() {
    this.overlayRef?.dispose()
    this.overlayRef = undefined
  }

  private createOverlay(): OverlayRef {
    return new Overlay().create({
      hasBackdrop: true,
      backdropClass: 'bg-black/80',
      panelClass: 'fixed inset-0 z-50 flex items-center justify-center',
    })
  }
}

/* =========================
   ROOT
========================= */
@Component({
  selector: 'ui-dialog',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class DialogComponent {}

/* =========================
   TRIGGER
========================= */
@Directive({
  selector: '[uiDialogTrigger]',
  standalone: true,
})
export class DialogTriggerDirective {
  @Input('uiDialogTrigger') content!: DialogContentComponent

  constructor(private dialog: DialogService) {}

  @HostListener('click')
  open() {
    this.dialog.open(this.content.template, this.content.vcr)
  }
}

/* =========================
   CONTENT + OVERLAY
========================= */
@Component({
  selector: 'ui-dialog-content',
  standalone: true,
  template: `
    <ng-template #tpl>
      <div
        class="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg
               animate-in fade-in zoom-in-95"
      >
        <ng-content></ng-content>

        <button
          uiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </ng-template>
  `,
})
export class DialogContentComponent {
  @ViewChild('tpl', { static: true }) template!: TemplateRef<any>

  constructor(public vcr: ViewContainerRef) {}
}

/* =========================
   CLOSE
========================= */
@Directive({
  selector: '[uiDialogClose]',
  standalone: true,
})
export class DialogCloseDirective {
  constructor(private dialog: DialogService) {}

  @HostListener('click')
  close() {
    this.dialog.close()
  }
}

/* =========================
   HEADER / FOOTER / TEXT
========================= */
@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-1.5 text-center sm:text-left">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogHeaderComponent {}

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogFooterComponent {}

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  template: `
    <h2 class="text-lg font-semibold tracking-tight">
      <ng-content></ng-content>
    </h2>
  `,
})
export class DialogTitleComponent {}

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  template: `
    <p class="text-sm text-muted-foreground">
      <ng-content></ng-content>
    </p>
  `,
})
export class DialogDescriptionComponent {}
