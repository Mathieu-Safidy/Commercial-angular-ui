import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { LucideAngularModule } from 'lucide-angular'; // ✅ juste le module

export type ButtonVariant = 'ghost' | 'default' | 'destructive';

@Component({
  selector: 'ui-calendar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-background group/calendar p-3 [--cell-size:2rem]">
      <!-- Navigation -->
      <div class="flex justify-between mb-2">
        <button (click)="prevMonth()">
          <i-lucide name="ChevronLeft" class="size-4"></i-lucide>
        </button>
        <span>{{ month | date:'MMMM yyyy' }}</span>
        <button (click)="nextMonth()">
          <i-lucide name="ChevronRight" class="size-4"></i-lucide>
        </button>
      </div>

      <!-- Weekdays -->
      <div class="flex gap-1.5">
        <div *ngFor="let wd of weekdays" class="flex-1 text-center text-muted-foreground text-[0.8rem] font-normal">
          {{ wd }}
        </div>
      </div>

      <!-- Days -->
      <div class="grid grid-cols-7 gap-1 mt-2">
        <button
          *ngFor="let day of daysInMonth"
          [ngClass]="getDayClasses(day)"
          (click)="selectDay(day)"
          class="flex aspect-square h-[--cell-size] items-center justify-center rounded-md"
        >
          {{ day.getDate() }}
        </button>
      </div>
    </div>
  `
})
export class CalendarComponent {
  @Input() buttonVariant: ButtonVariant = 'ghost';
  @Input() showOutsideDays = true;

  @Output() daySelected = new EventEmitter<Date>();

  month: Date = new Date();
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: Date[] = [];

  constructor() {
    this.generateDays();
  }

  generateDays() {
    const year = this.month.getFullYear();
    const month = this.month.getMonth();
    const date = new Date(year, month, 1);
    this.daysInMonth = [];

    while (date.getMonth() === month) {
      this.daysInMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  prevMonth() {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
    this.generateDays();
  }

  nextMonth() {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
    this.generateDays();
  }

  selectDay(day: Date) {
    this.daySelected.emit(day);
  }

  getDayClasses(day: Date): string {
    const today = new Date();
    const isToday = day.toDateString() === today.toDateString();
    return [
      'text-center p-1 rounded-md',
      isToday ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
    ].join(' ');
  }
}
