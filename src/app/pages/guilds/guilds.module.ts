import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuildsRoutingModule } from './guilds-routing.module';
import { GuildsComponent } from './guilds.component';
import { UIModule } from '../../ui.module';


@NgModule({
  declarations: [GuildsComponent],
  imports: [
    CommonModule,
    GuildsRoutingModule,
    UIModule
  ]
})
export class GuildsModule { }
