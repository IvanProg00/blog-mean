import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddEntry, Response, Tag } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { TagsService } from 'src/app/tags/tags.service';
import { UserService } from 'src/app/user/user.service';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-add-entries',
  templateUrl: './add-entries.component.html',
  styleUrls: ['./add-entries.component.scss'],
})
export class AddEntriesComponent implements OnInit {
  public entryForm: FormGroup;
  public addEntrie: AddEntry = {
    title: '',
    text: '',
    tagsId: '',
    usersId: '',
  };
  public allTags: Tag[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private tagsService: TagsService,
    private entriesService: EntriesService,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    if (!this.userService.registred) {
      this.router.navigate(['/']);
    }

    this.entryForm = new FormGroup({
      title: new FormControl(this.addEntrie.title, [Validators.required]),
      text: new FormControl(this.addEntrie.text, [Validators.required]),
      tagsId: new FormControl(this.addEntrie.tagsId, [Validators.required]),
      usersId: new FormControl(this.addEntrie.usersId),
    });

    this.tagsService.getAllTags().subscribe((res: Response) => {
      this.allTags = res.data;
      if (this.allTags.length > 0) {
        this.tagsId.setValue(this.allTags[0]._id);
      }
    });

    this.usersId.setValue(this.userService.getToken());
  }

  public onSubmit(): void {
    if (!this.entryForm.invalid) {
      this.entriesService.createEntry(this.entryForm.value).subscribe(
        (_: Response) => {
          this._snackBarService.success('Entry Created.');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 0) {
            this._snackBarService.error("You Can't Create An Entry");
            this.router.navigate(['/']);
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

  get usersId(): AbstractControl {
    return this.entryForm.get('usersId');
  }
}
