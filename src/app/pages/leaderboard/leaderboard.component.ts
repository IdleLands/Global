import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  public loading = true;
  public leaderboard: any[] = null;

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.getLeaderboard()
      .subscribe((leaderboard: any[]) => {
        this.loading = false;
        this.leaderboard = leaderboard;
      });
  }

}
