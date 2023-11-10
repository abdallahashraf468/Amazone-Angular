import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoupensRoutingModule } from './coupens-routing.module';
import { CoupensComponent } from './coupens.component';
import { CoupensListComponent } from './coupens-list/coupens-list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CoupensComponent,
    CoupensListComponent
  ],
  imports: [
    CommonModule,
    CoupensRoutingModule,
    MatTableModule
  ]
})
export class CoupensModule { }
