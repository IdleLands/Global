import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'players', loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule) },
  { path: 'player', loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule) },
  { path: 'guilds', loadChildren: () => import('./pages/guilds/guilds.module').then(m => m.GuildsModule) },
  { path: 'guild', loadChildren: () => import('./pages/guild/guild.module').then(m => m.GuildModule) },
  { path: 'leaderboard', loadChildren: () => import('./pages/leaderboard/leaderboard.module').then(m => m.LeaderboardModule) },
  { path: '**', redirectTo: 'players' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
