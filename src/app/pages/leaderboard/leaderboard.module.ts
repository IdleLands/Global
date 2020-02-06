import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';
import { UIModule } from '../../ui.module';


@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    UIModule
  ]
})
export class LeaderboardModule { }
