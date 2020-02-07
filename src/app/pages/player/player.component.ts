import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public loading = true;
  public player = null;

  constructor(private router: Router, private route: ActivatedRoute, private api: APIService) {  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) { return; }

    this.api.getPlayer(name)
      .subscribe((player: any) => {
        if (!player) {
          this.router.navigate(['/players']);
          return;
        }

        this.loading = false;
        this.player = player;
      });
  }

  public timeString(milliseconds) {
    if (!milliseconds) {
      return 'a long time';
    }
    // Time since
    milliseconds = Date.now() - milliseconds;
    const keys = {
      year: 31557600,
      month: 2629800,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    let duration = Math.floor((milliseconds + 500) / 1000);
    const resp = {};
    const stamp = [];

    Object.keys(keys).forEach((key) => {
      resp[key] = Math.floor(duration / keys[key]);
      duration -= resp[key] * keys[key];
      if (resp[key] > 0) {
        stamp.push(`${resp[key]} ${resp[key] === 1 ? key : key + 's'}`);
      }
    });

    return stamp.join(', ');
  }

}
