import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent implements OnInit {

  public loading = true;
  public guild = null;

  constructor(private router: Router, private route: ActivatedRoute, private api: APIService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) { return; }

    this.api.getGuild(name)
      .subscribe((guild: any) => {
        if (!guild) {
          this.router.navigate(['/guilds']);
          return;
        }

        this.loading = false;
        this.guild = guild;
      });
  }

  public guildLevel(): number {
    const levels: number[] = Object.values(this.guild.buildingLevels);
    return Math.floor(levels.reduce((prev, cur) => prev + cur, 0) / levels.length);
  }

  public memberCount(): number {
    return Object.keys(this.guild.members).length;
  }

  public symbolFor(guildLv: number): string {
    switch (guildLv) {
      case 1:  return '';
      case 5:  return '☆';
      case 10: return '★';
      default: return '';
    }
  }

}
