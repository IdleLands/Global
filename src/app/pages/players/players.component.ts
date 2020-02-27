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
  public sortBy = '';
  public sortOptions = [
    { name: 'Highest Level', value: 'level-asc' },
    { name: 'Lowest Level', value: 'level-desc' },
    { name: 'Name A-Z', value: 'name-asc' },
    { name: 'Name Z-A', value: 'name-desc' }
  ];

  constructor(private api: APIService) { }

  public sort() {
    const ascension = [];
    const final = [];
    if (this.sortBy === 'level-desc' || this.sortBy === 'level-asc') {

      // sort by ascension level
      this.players.forEach(player => {
        if (!ascension[player.ascensionLevel]) {
          ascension[player.ascensionLevel] = [player];
        } else {
          ascension[player.ascensionLevel].push(player);
        }
      });

      // Sort each ascension level by player level
      ascension.forEach((i, ascLvl) => {
        ascension[ascLvl].sort((a, b) => {
          return a.level.__current - b.level.__current;
        });
      });

      // Loop through both and add to final
      ascension.forEach(group => {
        group.forEach(player => {
          final.push(player);
        });
      });

      // Reverse if needed for sorting
      this.players = (this.sortBy === 'level-desc' ? final : final.reverse());
    }
    this.players.sort((a, b) => {
      switch (this.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
      }
    });
  }

  ngOnInit() {
    this.api.getPlayers()
      .subscribe((players: any[]) => {
        this.loading = false;
        this.players = players;
        this.sortBy = 'level-asc';
        this.sort();
      });
  }

}
