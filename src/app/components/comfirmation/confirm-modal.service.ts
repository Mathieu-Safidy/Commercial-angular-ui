import { Injectable, signal } from '@angular/core';

export type ConfirmModalTheme = 'danger' | 'success' | 'warning' | 'info' | 'logout';

export interface ConfirmModalConfig {
  theme: ConfirmModalTheme;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  details?: string[]; // résumé optionnel (ex: articles du panier)
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmModalService {
  isOpen = signal(false);
  config = signal<ConfirmModalConfig | null>(null);
  isLoading = signal(false);

  open(config: ConfirmModalConfig) {
    this.config.set(config);
    this.isOpen.set(true);
    this.isLoading.set(false);
  }

  async confirm() {
    const cfg = this.config();
    if (!cfg) return;
    this.isLoading.set(true);
    try {
      await cfg.onConfirm();
    } finally {
      this.isLoading.set(false);
      this.close();
    }
  }

  cancel() {
    this.config()?.onCancel?.();
    this.close();
  }

  close() {
    this.isOpen.set(false);
    setTimeout(() => this.config.set(null), 300);
  }
}