import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <label
      class="grid place-content-center h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      [class.bg-primary]="checked"
      [class.text-primary-foreground]="checked"
    >
      <input
        type="checkbox"
        [disabled]="disabled"
        [(ngModel)]="checked"
        class="peer sr-only"
      />
      <lucide-icon *ngIf="checked" name="check" class="h-4 w-4 text-current"></lucide-icon>
    </label>
  `,
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
}
