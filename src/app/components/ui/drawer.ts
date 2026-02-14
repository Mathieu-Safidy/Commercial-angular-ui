import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  signal
} from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Trigger -->
    <ng-content select="[drawerTrigger]"></ng-content>

    <!-- Drawer content -->
    <ng-template #drawerTpl>
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80"
        (click)="close()"
      ></div>

      <!-- Drawer -->
      <div
        class="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col
               rounded-t-[10px] border bg-background animate-slide-up"
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>

        <ng-content select="[drawerContent]"></ng-content>
      </div>
    </ng-template>
  `,
})
export class DrawerComponent {
  @ViewChild('drawerTpl') drawerTpl!: TemplateRef<any>

  private overlayRef?: OverlayRef
  openState = signal(false)

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) {}

  open() {
    if (this.openState()) return

    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    })

    this.overlayRef.attach(
      new TemplatePortal(this.drawerTpl, this.vcr)
    )

    this.openState.set(true)
  }

  close() {
    this.overlayRef?.dispose()
    this.openState.set(false)
  }
}
