import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeEntry, Tag, Response } from 'src/app/interfaces';
import { TagsService } from 'src/app/tags/tags.service';
import { MESSAGE_DURATION } from 'src/assets/config';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-change-entries',
  templateUrl: './change-entries.component.html',
  styleUrls: ['./change-entries.component.scss'],
})
export class ChangeEntriesComponent implements OnInit {
  public entry: ChangeEntry = {
    _id: '',
    title: '',
    text: '',
    tagsId: {
      _id: null,
      title: '',
    },
  };
  public error: string = undefined;
  public entryForm: FormGroup;
  public allTags: Tag[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private tagsService: TagsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.entryForm = new FormGroup({
      _id: new FormControl(this.entry._id),
      title: new FormControl(this.entry.title, [Validators.required]),
      text: new FormControl(this.entry.text, [Validators.required]),
      tagsId: new FormControl(this.entry.tagsId, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.createEntryForm(params.id);
    });
  }

  private createEntryForm(id: string): void {
    this.setAllTags();

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
        this.router.navigate(['/']);
      }
    );
  }

  private setAllTags(): void {
    this.tagsService.getAllTags().subscribe(
      (res: Response) => {
        this.allTags = res.data;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    );
  }

  public onSubmit() {
    this.entriesService.changeEntry(this.entryForm.value).subscribe(
      (_: Response) => {
        this.router.navigate(['/entries/about', this.entry._id]);
        this._snackBar.open('Entry Changed', undefined, {
          duration: MESSAGE_DURATION,
        });
      },
      (err: HttpErrorResponse) => {
        this._snackBar.open('You can\'t change this entry', undefined, {
          duration: MESSAGE_DURATION,
        });
        console.error(err);
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
