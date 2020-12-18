import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response, Entry } from 'src/app/interfaces';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-about-entries',
  templateUrl: './about-entries.component.html',
  styleUrls: ['./about-entries.component.scss'],
})
export class AboutEntriesComponent implements OnInit {
  private id: string;
  public entry: Entry = {
    _id: '',
    title: '',
    text: '',
    usersId: {
      _id: '',
      username: '',
      email: '',
    },
    tagsId: {
      _id: '',
      title: '',
    },
  };
  public isLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.loadEntry();
    });
  }

  private loadEntry(): void {
    this.entriesService.getEntry(this.id).subscribe((res: Response) => {
      this.entry = res.data;
      this.isLoaded = true;
    });
  }

  public onDelete(): void {
    this.entriesService.deleteEntry(this.id).subscribe((_: Response) => {
      this.router.navigate(['/']);
    });
  }
}
