import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response, Entry } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { BG_COLOR } from 'src/assets/config';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-about-entries',
  templateUrl: './about-entries.component.html',
  styleUrls: ['./about-entries.component.scss'],
})
export class AboutEntriesComponent implements OnInit {
  public color: string = BG_COLOR;
  public entry: Entry = {
    _id: '',
    title: '',
    text: '',
    usersId: {
      _id: '',
      username: '',
      email: '',
      privelages: null,
    },
    tagsId: {
      _id: '',
      title: '',
    },
  };
  public isLoaded: boolean = false;
  public isFound: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.loadEntry(params.id);
    });
  }

  private loadEntry(id: string): void {
    this.entriesService.getEntry(id).subscribe(
      (res: Response) => {
        this.entry = res.data;
        this.isLoaded = true;
        this.isFound = true;
      },
      (_: Response) => {
        this.isLoaded = true;
        this.isFound = false;
      }
    );
  }

  public onDelete(): void {
    this.entriesService.deleteEntry(this.entry._id).subscribe(
      (_: Response) => {
        this._snackBarService.success('Entry Deleted.');
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("You Can't Delete This Entry.");
      }
    );
  }
}
