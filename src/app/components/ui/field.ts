import { Component, Input } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

type Orientation = 'vertical' | 'horizontal' | 'responsive';
type FieldLegendVariant = 'legend' | 'label';

@Component({
  selector: 'app-field',
  template: `
    <fieldset
      data-slot="field-set"
      [ngClass]="['flex flex-col gap-6', className]"
    >
      <!-- Legend -->
      <legend
        *ngIf="legend"
        data-slot="field-legend"
        [attr.data-variant]="legendVariant"
        [ngClass]="['mb-3 font-medium', legendVariant === 'legend' ? 'text-base' : 'text-sm']"
      >
        {{ legend }}
      </legend>

      <!-- Field Group -->
      <div
        data-slot="field-group"
        [ngClass]="['group/field-group flex w-full flex-col gap-7', groupClass]"
      >
        <ng-content select="[field-group]"></ng-content>
      </div>

      <!-- Field -->
      <div
        role="group"
        data-slot="field"
        [attr.data-orientation]="orientation"
        [ngClass]="getFieldClasses()"
      >
        <ng-content select="[field]"></ng-content>
      </div>

      <!-- Field Content -->
      <div
        data-slot="field-content"
        [ngClass]="['group/field-content flex flex-1 flex-col gap-1.5 leading-snug', contentClass]"
      >
        <ng-content select="[field-content]"></ng-content>
      </div>

      <!-- Field Label -->
      <label
        data-slot="field-label"
        [ngClass]="['flex w-fit gap-2 leading-snug', labelClass]"
      >
        <ng-content select="[field-label]"></ng-content>
      </label>

      <!-- Field Title -->
      <div
        data-slot="field-label"
        [ngClass]="['flex w-fit items-center gap-2 text-sm font-medium leading-snug', titleClass]"
      >
        <ng-content select="[field-title]"></ng-content>
      </div>

      <!-- Field Description -->
      <p
        data-slot="field-description"
        [ngClass]="['text-muted-foreground text-sm font-normal leading-normal', descriptionClass]"
      >
        <ng-content select="[field-description]"></ng-content>
      </p>

      <!-- Field Separator -->
      <div
        data-slot="field-separator"
        [attr.data-content]="!!separatorContent"
        [ngClass]="['relative -my-2 h-5 text-sm', separatorClass]"
      >
        <ng-content select="[field-separator]"></ng-content>
        <span *ngIf="separatorContent"
              class="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
              data-slot="field-separator-content">
          {{ separatorContent }}
        </span>
      </div>

      <!-- Field Error -->
      <div
        *ngIf="errorMessages?.length || errorContent"
        role="alert"
        data-slot="field-error"
        [ngClass]="['text-destructive text-sm font-normal', errorClass]"
      >
        <ng-container *ngIf="errorContent; else errorList">{{ errorContent }}</ng-container>
        <ng-template #errorList>
          <ul class="ml-4 flex list-disc flex-col gap-1">
            <li *ngFor="let err of errorMessages">{{ err }}</li>
          </ul>
        </ng-template>
      </div>
    </fieldset>
  `,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  styles: []
})
export class FieldComponent {
  @Input() className = '';
  @Input() groupClass = '';
  @Input() contentClass = '';
  @Input() labelClass = '';
  @Input() titleClass = '';
  @Input() descriptionClass = '';
  @Input() separatorClass = '';
  @Input() errorClass = '';

  @Input() legend?: string;
  @Input() legendVariant: FieldLegendVariant = 'legend';

  @Input() orientation: Orientation = 'vertical';

  @Input() separatorContent?: string;
  @Input() errorContent?: string;
  @Input() errorMessages?: string[];

  getFieldClasses(): string[] {
    const base = 'group/field data-[invalid=true]:text-destructive flex w-full gap-3';
    const orientationClasses: Record<Orientation, string[]> = {
      vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
      horizontal: [
        'flex-row items-center',
        '[&>[data-slot=field-label]]:flex-auto',
        'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start'
      ],
      responsive: [
        '@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto',
        '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
      ]
    };

    return [base, ...(orientationClasses[this.orientation] ?? [])];
  }
}
