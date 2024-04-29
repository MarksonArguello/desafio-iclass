import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simple-search.component.html',
  styleUrl: './simple-search.component.css',
})
export class SimpleSearchComponent {
  formulario!: FormGroup;
  @Input() loading = false;
  submitted = false;
  @Output() simpleSearchEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      serviceOrderCode: ['', Validators.required],
    });
  }

  findByServiceOrderCode() {
    this.submitted = true;

    if (this.formulario.invalid) {
      return;
    }

    const value = this.serviceOrderCode?.value || '';
    this.simpleSearchEvent.emit(value);
  }

  get serviceOrderCode() {
    return this.formulario.get('serviceOrderCode');
  }
}
