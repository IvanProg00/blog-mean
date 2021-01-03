import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeEntry, Tag, Response } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { TagsService } from 'src/app/tags/tags.service';
import { UserService } from 'src/app/user/user.service';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-change-entries',
  templateUrl: './change-entries.component.html',
  styleUrls: ['./change-entries.component.scss'],
})
export class ChangeEntriesComponent implements OnInit {
  public error: string = undefined;
  private entry: ChangeEntry = {
    _id: '',
    title: '',
    text: '',
    tagsId: {
      _id: '',
      title: '',
    },
  };
  public entryForm: FormGroup = new FormGroup({
    _id: new FormControl(this.entry._id),
    title: new FormControl(this.entry.title, [Validators.required]),
    text: new FormControl(this.entry.text, [Validators.required]),
    tagsId: new FormControl(this.entry.tagsId._id, [Validators.required]),
  });

  public allTags: Tag[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private tagsService: TagsService,
    private router: Router,
    private _snackBarService: SnackBarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (!this.userService.registred) {
      this.router.navigate(['/']);
    }

    const getUser = this.userService.getUserByToken();
    if (!getUser) {
      this._snackBarService.error('You Are Not Logined.');
      this.router.navigate(['/']);
      this.userService.dropToken();
    }
    getUser.subscribe(
      (_: Response) => {
        this.setTags();
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("We Can't Find This User.");
        this.userService.dropToken();
        this.router.navigate(['/']);
      }
    );
  }

  private setTags(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.createEntryForm(params.id);

      this.tagsService.getAllTags().subscribe(
        (res: Response) => {
          this.allTags = res.data;
          this.createEntryForm(params.id);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this._snackBarService.error("Can't Load Tags.");
          this.router.navigate(['/']);
        }
      );
    });
  }

  private createEntryForm(id: string): void {
    this.entriesService.getEntry(id).subscribe(
      (res: Response) => {
        this.entry = res.data;

        this._id.setValue(this.entry._id);
        this.title.setValue(this.entry.title);
        this.text.setValue(this.entry.text);
        this.tagsId.setValue(this.entry.tagsId._id);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("Can't Load An Entry.");
        this.router.navigate(['/']);
      }
    );
  }

  public onSubmit() {
    this.entriesService.changeEntry(this.entryForm.value).subscribe(
      (_: Response) => {
        this._snackBarService.success('Entry Changed.');
        this.router.navigate(['entries/about', this.entry._id]);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        if (err.status === 0) {
          this._snackBarService.error("Can't Be Changed This Entry.");
          this.router.navigate(['/entries/about', this._id.value]);
        } else {
          if (err.error?.error?.title) {
            this.title.setErrors({ other: err.error?.error?.title });
          }
          if (err.error?.error?.text) {
            this.text.setErrors({ other: err.error?.error?.text });
          }
          if (err.error?.error?.tagsId) {
            this.tagsId.setErrors({ other: err.error?.error?.password });
          }
        }
      }
    );
  }

  get _id(): AbstractControl {
    return this.entryForm.get('_id');
  }

  get title(): AbstractControl {
    return this.entryForm.get('title');
  }

  get text(): AbstractControl {
    return this.entryForm.get('text');
  }

  get tagsId(): AbstractControl {
    return this.entryForm.get('tagsId');
  }
}
