import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuildComponent } from './guild.component';

const routes: Routes = [{ path: '', component: GuildComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuildRoutingModule { }
