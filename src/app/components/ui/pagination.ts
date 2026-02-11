import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    NgClass
  ],
  template: `
    <nav role="navigation" aria-label="pagination" [ngClass]="className">
      <ul class="flex flex-row items-center gap-1">
        <li>
          <a
            aria-label="Go to previous page"
            [ngClass]="linkClass(false, 'default', 'gap-1 pl-2.5')"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
            <span>Previous</span>
          </a>
        </li>

        <li>
          <a [ngClass]="linkClass(true)">1</a>
        </li>

        <li class="flex h-9 w-9 items-center justify-center">
          <svg class="h-4 w-4" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
          </svg>
          <span class="sr-only">More pages</span>
        </li>

        <li>
          <a [ngClass]="linkClass(false)">10</a>
        </li>

        <li>
          <a
            aria-label="Go to next page"
            [ngClass]="linkClass(false, 'default', 'gap-1 pr-2.5')"
          >
            <span>Next</span>
            <svg class="h-4 w-4" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class PaginationComponent {
  @Input() className = 'mx-auto flex w-full justify-center';

  /**
   * Génère les classes de style pour un lien de pagination
   * @param isActive active ou non
   * @param size 'icon' ou 'default'
   * @param extraClasses classes supplémentaires
   */
  linkClass(isActive = false, size: 'icon' | 'default' = 'icon', extraClasses = ''): string {
    const variant = isActive ? 'outline' : 'ghost';
    const sizeClass = size === 'default' ? 'px-3 py-1' : 'px-2 py-0.5';
    return `inline-flex items-center justify-center rounded ${variant} ${sizeClass} ${extraClasses}`;
  }
}
