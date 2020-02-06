import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public loading = true;
  public players = [];

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.getPlayers()
      .subscribe((players: any[]) => {
        this.loading = false;
        this.players = players;
      });
  }

}
