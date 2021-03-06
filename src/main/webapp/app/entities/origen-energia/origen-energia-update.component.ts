import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IOrigenEnergia, OrigenEnergia } from 'app/shared/model/origen-energia.model';
import { OrigenEnergiaService } from './origen-energia.service';
import { IRelevamiento } from 'app/shared/model/relevamiento.model';
import { RelevamientoService } from 'app/entities/relevamiento/relevamiento.service';

@Component({
  selector: 'jhi-origen-energia-update',
  templateUrl: './origen-energia-update.component.html'
})
export class OrigenEnergiaUpdateComponent implements OnInit {
  isSaving = false;

  relevamientos: IRelevamiento[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    estado: [],
    relevamiento: []
  });

  constructor(
    protected origenEnergiaService: OrigenEnergiaService,
    protected relevamientoService: RelevamientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ origenEnergia }) => {
      this.updateForm(origenEnergia);

      this.relevamientoService
        .query()
        .pipe(
          map((res: HttpResponse<IRelevamiento[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRelevamiento[]) => (this.relevamientos = resBody));
    });
  }

  updateForm(origenEnergia: IOrigenEnergia): void {
    this.editForm.patchValue({
      id: origenEnergia.id,
      nombre: origenEnergia.nombre,
      estado: origenEnergia.estado,
      relevamiento: origenEnergia.relevamiento
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const origenEnergia = this.createFromForm();
    if (origenEnergia.id !== undefined) {
      this.subscribeToSaveResponse(this.origenEnergiaService.update(origenEnergia));
    } else {
      this.subscribeToSaveResponse(this.origenEnergiaService.create(origenEnergia));
    }
  }

  private createFromForm(): IOrigenEnergia {
    return {
      ...new OrigenEnergia(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      relevamiento: this.editForm.get(['relevamiento'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrigenEnergia>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRelevamiento): any {
    return item.id;
  }
}
