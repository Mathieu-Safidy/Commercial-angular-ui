import { Component, Input, ContentChild, AfterContentInit, forwardRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="formGroup">
      <ng-content></ng-content>
    </form>`,
  imports: [
    ReactiveFormsModule
  ],
  styles: []
})
export class FormComponent {
  @Input() formGroup!: FormGroup;
}

// FormItem: wrapper avec id unique
let uniqueId = 0;
@Component({
  selector: 'app-form-item',
  template: `<div [id]="id" class="space-y-2"><ng-content></ng-content></div>`,
})
export class FormItemComponent {
  id = `form-item-${++uniqueId}`;
}

// FormLabel: label lié à FormItem
@Component({
  selector: 'app-form-label',
  imports: [
    NgClass
  ],
  template: `<label [for]="formItemId" [ngClass]="{'text-destructive': error}">
    <ng-content></ng-content>
  </label>`
})
export class FormLabelComponent {
  @Input() formItemId!: string;
  @Input() error?: string;
}

// FormControl: wrapper pour l’input / select / textarea
@Component({
  selector: 'app-form-control',
  template: `<ng-content></ng-content>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormControlComponent),
    multi: true
  }]
})
export class FormControlComponent implements ControlValueAccessor {
  @Input() formItemId!: string;
  @Input() formDescriptionId!: string;
  @Input() formMessageId!: string;
  @Input() error?: string;

  value: any;
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void { this.value = obj; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}

// FormDescription: description liée au FormItem
@Component({
  selector: 'app-form-description',
  template: `<p [id]="formDescriptionId" class="text-[0.8rem] text-muted-foreground"><ng-content></ng-content></p>`
})
export class FormDescriptionComponent {
  @Input() formDescriptionId!: string;
}

// FormMessage: message d’erreur
@Component({
  selector: 'app-form-message',
  imports: [
    NgIf
  ],
  template: `<p *ngIf="body" [id]="formMessageId" class="text-[0.8rem] font-medium text-destructive">{{ body }}</p>`
})
export class FormMessageComponent {
  @Input() formMessageId!: string;
  @Input() error?: { message?: string };
  @Input() children?: string;

  get body(): string | null {
    if (this.error?.message) return this.error.message;
    if (this.children) return this.children;
    return null;
  }
}
