import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdvancedSearchParams } from '../../../model/advanced-search-params';
import { ClusterService } from '../../../services/cluster.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.css',
})
export class AdvancedSearchComponent {
  formulario!: FormGroup;
  @Input() loading = false;
  submitted = false;
  @Output() advancedSearchEvent = new EventEmitter<AdvancedSearchParams>();

  filteredClusterNames!: Observable<string[]>;
  clusterNames: string[] = [];

  statuses: Statuses[] = [
    { id: 7, name: 'Encerrada', selected: true },
    { id: 50, name: 'Em aprovação', selected: true },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private clusterService: ClusterService,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      clusterName: ['ICLASS', Validators.required],
      customerName: [''],
      ssn: [''],
      thirdPartyCode: [''],
      createdDate_begin: ['2024-01-01'],
      createdDate_end: ['2024-01-30'],
      updatedDate_begin: [''],
      updatedDate_end: [''],
      closedBy: [''],
    });

    this.clusterService.findAll().subscribe((paginatedResponse) => {
      this.clusterNames = paginatedResponse.objects.map((cluster) => cluster.nome);
    });

    this.filteredClusterNames =
      this.formulario.get('clusterName')?.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.clusterNames.slice();
        }),
      ) || new Observable<string[]>();
  }

  findByFilters() {
    this.submitted = true;

    if (this.invalidForm()) {
      return;
    }

    const searchParams = this.newAdvancedSearchParams(this.formulario.value);

    this.advancedSearchEvent.emit(searchParams);
  }

  private newAdvancedSearchParams(formValue: AdvancedSearchParams) {
    const searchParams = { ...formValue };

    searchParams.statuses = this.statuses.filter((status) => status.selected).map((status) => status.id.toString());

    return this.setDateType(searchParams);
  }

  private setDateType(searchParams: AdvancedSearchParams) {
    const dates = ['createdDate_begin', 'createdDate_end', 'updatedDate_begin', 'updatedDate_end'];

    dates.forEach((date) => {
      if (searchParams[date]) {
        searchParams[date] = new Date(searchParams[date] as string);
      }
    });

    return searchParams;
  }

  get clusterName() {
    return this.formulario.get('clusterName');
  }

  get createdDate_begin() {
    return this.formulario.get('createdDate_begin');
  }

  get createdDate_end() {
    return this.formulario.get('createdDate_end');
  }

  get updatedDate_begin() {
    return this.formulario.get('updatedDate_begin');
  }

  get updatedDate_end() {
    return this.formulario.get('updatedDate_end');
  }

  get hasRangeDateError() {
    const correct =
      (this.createdDate_begin?.value && this.createdDate_end?.value) ||
      (this.updatedDate_begin?.value && this.updatedDate_end?.value);

    return !correct;
  }

  get tooManyDateRanges() {
    let count = 0;

    if (this.createdDate_begin?.value) count++;
    if (this.createdDate_end?.value) count++;
    if (this.updatedDate_begin?.value) count++;
    if (this.updatedDate_end?.value) count++;

    return count > 2;
  }

  private invalidForm() {
    return this.formulario.invalid || this.hasRangeDateError || this.tooManyDateRanges;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.clusterNames.filter((option) => option.toLowerCase().includes(filterValue));
  }
}

export interface Statuses {
  id: number;
  name: string;
  selected?: boolean;
}
