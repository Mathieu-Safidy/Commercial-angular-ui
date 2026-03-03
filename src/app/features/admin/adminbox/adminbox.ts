import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  MapPin,
  Maximize2,
  DollarSign,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Save,
  RefreshCw,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { BadgeComponent } from '../../../components/ui/badge';
import { Box } from '../../../services/box/box';
import { ConfirmModalService } from '../../../components/comfirmation/confirm-modal.service';
import { LocationDetail } from '../../../services/locationDetail/location-detail';

// import { ConfirmModalService } from '../../../components/ui/confirm-modal/confirm-modal.service';

export interface BoxModel {
  _id?: string;
  numero: string;
  position: number;
  dimension: number;
  prixInitial: number;
  status?: string;
}

@Component({
  selector: 'app-admin-boxes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './adminBox.html',
})
export class AdminBoxesComponent implements OnInit {
  private boxService = inject(Box);
  private confirmModal = inject(ConfirmModalService);
  private fb = inject(FormBuilder);
  private detailLocationService = inject(LocationDetail);

  readonly Plus = Plus;
  readonly Search = Search;
  readonly X = X;
  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;
  readonly MapPin = MapPin;
  readonly Maximize2 = Maximize2;
  readonly DollarSign = DollarSign;
  readonly Package = Package;
  readonly CheckCircle2 = CheckCircle2;
  readonly Clock = Clock;
  readonly AlertCircle = AlertCircle;
  readonly Filter = Filter;
  readonly ChevronDown = ChevronDown;
  readonly ArrowUpDown = ArrowUpDown;
  readonly MoreHorizontal = MoreHorizontal;
  readonly Save = Save;
  readonly RefreshCw = RefreshCw;

  // ── State ──
  allBoxes = signal<BoxModel[]>([]);
  isLoading = signal(true);
  isSubmitting = signal(false);
  openMenuId = signal<string | null>(null);

  // Modal
  modalOpen = signal(false);
  modalMode = signal<'create' | 'edit'>('create');
  editingBox = signal<BoxModel | null>(null);

  // Filtres
  searchQuery = signal('');
  statusFilter = signal<'all' | 'disponible' | 'valide' | 'en attente'>('all');
  sortBy = signal<'numero' | 'prix-asc' | 'prix-desc' | 'dimension'>('numero');
  sortDropdownOpen = signal(false);

  // ── Form ──
  form = this.fb.group({
    numero: ['', [Validators.required, Validators.minLength(1)]],
    position: [null as number | null, [Validators.required]],
    dimension: [null as number | null, [Validators.required, Validators.min(1)]],
    prixInitial: [null as number | null, [Validators.required, Validators.min(0)]],
  });

  // ── Computed ──
  filteredBoxes = computed(() => {
  let list = [...this.allBoxes()];
  const q = this.searchQuery().toLowerCase().trim();

  if (q) list = list.filter(b =>
    String(b.numero ?? '').toLowerCase().includes(q) ||  // ← String()
    String(b.position ?? '').toLowerCase().includes(q)   // ← String()
  );

  if (this.statusFilter() !== 'all')
    list = list.filter(b => b.status === this.statusFilter());

  switch (this.sortBy()) {
    case 'numero': list.sort((a, b) =>
      String(a.numero ?? '').localeCompare(String(b.numero ?? ''))  // ← String()
    ); break;
    case 'prix-asc': list.sort((a, b) => a.prixInitial - b.prixInitial); break;
    case 'prix-desc': list.sort((a, b) => b.prixInitial - a.prixInitial); break;
    case 'dimension': list.sort((a, b) => b.dimension - a.dimension); break;
  }

  return list;
});

  stats = computed(() => ({
    total: this.allBoxes().length,
    disponible: this.allBoxes().filter((b) => !b.status || b.status === 'disponible').length,
    loue: this.allBoxes().filter((b) => b.status === 'valide').length,
    attente: this.allBoxes().filter((b) => b.status === 'en attente').length,
  }));

  sortOptions = [
    { value: 'numero', label: 'Numéro' },
    { value: 'prix-asc', label: 'Prix croissant' },
    { value: 'prix-desc', label: 'Prix décroissant' },
    { value: 'dimension', label: 'Surface' },
  ];

  statusOptions: { value: 'all' | 'disponible' | 'valide' | 'en attente'; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'disponible', label: 'Disponible' },
    { value: 'valide', label: 'Loué' },
    { value: 'en attente', label: 'En attente' },
  ];

  // ── Init ──
  async ngOnInit() {
    await this.loadBoxes();
  }

  async loadBoxes() {
    this.isLoading.set(true);
    try {
      const [boxes, detailLocations] = await Promise.all([
        this.boxService.getAll() as Promise<BoxModel[]>,
        this.detailLocationService.getAll() as Promise<any[]>,
      ]);

      const boxesAvecStatus = boxes.map((box) => {
        const detail = detailLocations.find((d) => d.idBox?._id === box._id);
        let status = 'disponible';

        if (detail) {
          if (detail.status === 'valide') status = 'valide';
          else if (detail.status === 'en attente') status = 'en attente';
        }

        return { ...box, status };
      });

      this.allBoxes.set(boxesAvecStatus);
    } catch (e) {
      console.error('Erreur chargement boxes', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  // ── Modal ──
  openCreateModal() {
    this.modalMode.set('create');
    this.editingBox.set(null);
    this.form.reset();
    this.modalOpen.set(true);
  }

  openEditModal(box: BoxModel) {
    this.modalMode.set('edit');
    this.editingBox.set(box);
    this.form.patchValue({
      numero: box.numero,
      position: box.position,
      dimension: box.dimension,
      prixInitial: box.prixInitial,
    });
    this.modalOpen.set(true);
    this.openMenuId.set(null);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.form.reset();
    this.editingBox.set(null);
  }

  async submitForm() {
    this.form.markAllAsTouched();
    console.log('veriufication ', this.form.value);
    console.log("SUBMIT CLICKED");
    console.log("VALID ?", this.form.valid);
    console.log("ERRORS", this.form.errors);
    if (this.form.invalid) return;
    this.isSubmitting.set(true);

    const payload: BoxModel = {
      numero: this.form.value.numero!,
      position: this.form.value.position!,
      dimension: this.form.value.dimension!,
      prixInitial: this.form.value.prixInitial!,
    };

    try {
      if (this.modalMode() === 'create') {
        const created = (await this.boxService.create({
          numero: payload.numero,
          position: Number(payload.position) || 0,
          dimension: payload.dimension,
          prixInitial: payload.prixInitial,
        })) as BoxModel;
        this.allBoxes.update((list) => [created, ...list]);
      } else {
        const id = this.editingBox()?._id!;
        const updated = (await this.boxService.update(id, {
          numero: payload.numero,
          position: Number(payload.position) || 0,
          dimension: payload.dimension,
          prixInitial: payload.prixInitial,
        })) as BoxModel;
        this.allBoxes.update((list) => list.map((b) => (b._id === id ? { ...b, ...updated } : b)));
      }
      this.closeModal();
    } catch (e) {
      console.error('Erreur sauvegarde box', e);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  // ── Suppression ──
  deleteBox(box: BoxModel) {
    this.openMenuId.set(null);
    this.confirmModal.open({
      theme: 'danger',
      title: `Supprimer Box N°${box.numero} ?`,
      message: 'Cette action est irréversible. La box sera définitivement supprimée.',
      details: [
        `Numéro : ${box.numero}`,
        `Position : ${box.position}`,
        `Dimension : ${box.dimension}m²`,
        `Prix : ${box.prixInitial} MGA/mois`,
      ],
      confirmLabel: 'Supprimer définitivement',
      onConfirm: async () => {
        await this.boxService.delete(box._id!);
        this.allBoxes.update((list) => list.filter((b) => b._id !== box._id));
      },
    });
  }

  // ── Helpers ──
  hasError(field: string, error = ''): boolean {
    const ctrl = this.form.get(field);
    if (!ctrl?.touched || !ctrl?.invalid) return false;
    return error ? ctrl.hasError(error) : ctrl.invalid;
  }

  getStatusConfig(status?: string) {
    switch (status) {
      case 'valide':
        return {
          label: 'Loué',
          class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
          dot: 'bg-emerald-500',
        };
      case 'en attente':
        return {
          label: 'En attente',
          class: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
          dot: 'bg-amber-500',
        };
      default:
        return {
          label: 'Disponible',
          class: 'bg-primary/10 text-primary border-primary/20',
          dot: 'bg-primary',
        };
    }
  }

  getSortLabel(): string {
    return this.sortOptions.find((o) => o.value === this.sortBy())?.label ?? 'Trier';
  }

  setSort(v: string) {
    this.sortBy.set(v as any);
    this.sortDropdownOpen.set(false);
  }

  toggleMenu(id: string) {
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  formatPrice(n: number): string {
    return new Intl.NumberFormat('fr-FR').format(n) + ' MGA';
  }

  trackById(_: number, item: BoxModel) {
    return item._id;
  }
}
