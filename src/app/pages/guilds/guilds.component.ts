import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.scss']
})
export class GuildsComponent implements OnInit {

  public loading = true;
  public guilds = [];
  public sortBy = '';
  public sortOptions = [
    { name: 'Highest Level', value: 'level-asc' },
    { name: 'Lowest Level', value: 'level-desc' },
    { name: 'Name A-Z', value: 'name-asc' },
    { name: 'Name Z-A', value: 'name-desc' },
    { name: 'Most Members', value: 'member-count' }
  ];

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.getGuilds()
      .subscribe((guilds: any[]) => {
        this.loading = false;
        this.guilds = guilds;
      });
  }

  public sort() {
    this.guilds.sort((a, b) => {
      switch (this.sortBy) {
        case 'level-desc':
          return this.guildLevel(a) - this.guildLevel(b);
        case 'level-asc':
          return this.guildLevel(b) - this.guildLevel(a);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'member-count':
          return Object.keys(b.members).length - Object.keys(a.members).length;
      }
    });
  }

  public guildLevel(guild): number {
    const levels: number[] = Object.values(guild.buildingLevels);
    return Math.floor(levels.reduce((prev, cur) => prev + cur, 0) / levels.length);
  }

  public memberCount(guild): number {
    return Object.keys(guild.members).length;
  }

}
