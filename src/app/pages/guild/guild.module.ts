import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuildRoutingModule } from './guild-routing.module';
import { GuildComponent } from './guild.component';
import { UIModule } from '../../ui.module';


@NgModule({
  declarations: [GuildComponent],
  imports: [
    CommonModule,
    GuildRoutingModule,
    UIModule
  ]
})
export class GuildModule { }
