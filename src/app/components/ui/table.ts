import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import {NgClass} from '@angular/common';

// Utilitaire cn pour concaténer les classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

@Component({
  selector: 'app-table',
  template: `
    <div class="relative w-full overflow-auto">
      <table [ngClass]="cn('w-full caption-bottom text-sm', className)">
        <ng-content></ng-content>
      </table>
    </div>
  `,
  imports: [
    NgClass
  ]
})
export class TableComponent {
  @Input() className?: string;

  cn = cn;
}

@Component({
  selector: 'app-table-header',
  template: `
    <thead [ngClass]="cn('[&_tr]:border-b', className)">
    <ng-content></ng-content>
    </thead>
  `,
  imports: [
    NgClass
  ]
})
export class TableHeaderComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-body',
  template: `
    <tbody [ngClass]="cn('[&_tr:last-child]:border-0', className)">
    <ng-content></ng-content>
    </tbody>
  `,
  imports: [
    NgClass
  ]
})
export class TableBodyComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-footer',
  template: `
    <tfoot [ngClass]="cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)">
    <ng-content></ng-content>
    </tfoot>
  `,
  imports: [
    NgClass
  ]
})
export class TableFooterComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-row',
  template: `
    <tr [ngClass]="cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)">
      <ng-content></ng-content>
    </tr>
  `,
  imports: [
    NgClass
  ]
})
export class TableRowComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-head',
  template: `
    <th
      [ngClass]="cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)">
      <ng-content></ng-content>
    </th>
  `,
  imports: [
    NgClass
  ]
})
export class TableHeadComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-cell',
  template: `
    <td
      [ngClass]="cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)">
      <ng-content></ng-content>
    </td>
  `,
  imports: [
    NgClass
  ]
})
export class TableCellComponent {
  @Input() className?: string;
  cn = cn;
}

@Component({
  selector: 'app-table-caption',
  template: `
    <caption [ngClass]="cn('mt-4 text-sm text-muted-foreground', className)">
      <ng-content></ng-content>
    </caption>
  `,
  imports: [
    NgClass
  ]
})
export class TableCaptionComponent {
  @Input() className?: string;
  cn = cn;
}
