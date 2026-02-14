// import { Component, Input, ContentChild, TemplateRef, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// export type ChartConfig = {
//   [k: string]: {
//     label?: string;
//     icon?: any; // Angular component
//   } & (
//     | { color?: string; theme?: never }
//     | { color?: never; theme: Record<'light' | 'dark', string> }
//     );
// };
//
// const THEMES = { light: '', dark: '.dark' } as const;
//
// @Component({
//   selector: 'ui-chart-container',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div [attr.data-chart]="chartId" class="flex aspect-video justify-center text-xs">
//       <ng-container *ngIf="config">
//         <ui-chart-style [config]="config" [chartId]="chartId"></ui-chart-style>
//       </ng-container>
//       <ng-content></ng-content>
//     </div>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ChartContainerComponent implements AfterContentInit {
//   @Input() id?: string;
//   @Input() config!: ChartConfig;
//
//   chartId!: string;
//
//   ngAfterContentInit() {
//     this.chartId = `chart-${this.id || Math.random().toString(36).slice(2)}`;
//   }
// }
//
// @Component({
//   selector: 'ui-chart-style',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <style *ngIf="colorConfig.length" [innerHTML]="cssString"></style>
//   `
// })
// export class ChartStyleComponent {
//   @Input() chartId!: string;
//   @Input() config!: ChartConfig;
//
//   get colorConfig() {
//     return Object.entries(this.config).filter(
//       ([, cfg]) => cfg.theme || cfg.color
//     );
//   }
//
//   get cssString(): string {
//     return Object.entries(THEMES)
//       .map(([theme, prefix]) => `
// ${prefix} [data-chart=${this.chartId}] {
// ${this.colorConfig
//         .map(([key, itemConfig]) => {
//           const color = (itemConfig.theme?.[theme as keyof typeof itemConfig.theme]) || itemConfig.color;
//           return color ? `  --color-${key}: ${color};` : '';
//         })
//         .join('\n')}
// }
// `)
//       .join('\n');
//   }
// }
//
// @Component({
//   selector: 'ui-chart-tooltip',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div *ngIf="active && payload?.length"
//          class="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
//       <div *ngIf="!nestLabel" class="font-medium">{{ tooltipLabel }}</div>
//       <div class="grid gap-1.5">
//         <ng-container *ngFor="let item of payload">
//           <div class="flex w-full flex-wrap items-stretch gap-2">
//             <ng-container *ngIf="itemConfig(item).icon">
//               <ng-container *ngComponentOutlet="itemConfig(item).icon"></ng-container>
//             </ng-container>
//             <div class="flex flex-1 justify-between leading-none">
//               <span class="text-muted-foreground">{{ itemConfig(item)?.label || item.name }}</span>
//               <span *ngIf="item.value" class="font-mono font-medium tabular-nums text-foreground">
//                 {{ item.value | number }}
//               </span>
//             </div>
//           </div>
//         </ng-container>
//       </div>
//     </div>
//   `
// })
// export class ChartTooltipContentComponent {
//   @Input() payload?: any[];
//   @Input() active = false;
//   @Input() hideLabel = false;
//   @Input() labelKey?: string;
//
//   @Input() config!: ChartConfig;
//
//   get tooltipLabel() {
//     if (!this.payload || this.hideLabel) return null;
//     const item = this.payload[0];
//     const key = `${this.labelKey || item?.dataKey || item?.name || 'value'}`;
//     return this.config[key]?.label || key;
//   }
//
//   get nestLabel() {
//     return this.payload?.length === 1;
//   }
//
//   itemConfig(item: any) {
//     const key = `${this.labelKey || item.name || item.dataKey || 'value'}`;
//     return this.config[key] || this.config[key];
//   }
// }
//
// @Component({
//   selector: 'ui-chart-legend',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="flex items-center justify-center gap-4" [ngClass]="verticalAlignClass">
//       <ng-container *ngFor="let item of payload">
//         <div class="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground">
//           <ng-container *ngIf="itemConfig(item)?.icon && !hideIcon">
//             <ng-container *ngComponentOutlet="itemConfig(item)?.icon"></ng-container>
//           </ng-container>
//           <div *ngIf="!itemConfig(item)?.icon" class="h-2 w-2 shrink-0 rounded-[2px]"
//                [ngStyle]="{'background-color': item.color}"></div>
//           {{ itemConfig(item)?.label }}
//         </div>
//       </ng-container>
//     </div>
//   `
// })
// export class ChartLegendContentComponent {
//   @Input() payload?: any[];
//   @Input() verticalAlign: 'top' | 'bottom' = 'bottom';
//   @Input() hideIcon = false;
//   @Input() nameKey?: string;
//   @Input() config!: ChartConfig;
//
//   get verticalAlignClass() {
//     return this.verticalAlign === 'top' ? 'pb-3' : 'pt-3';
//   }
//
//   itemConfig(item: any) {
//     const key = `${this.nameKey || item.dataKey || 'value'}`;
//     return this.config[key] || item;
//   }
// }
