import { Component, OnInit } from '@angular/core';
import { Entry, Response } from 'src/app/interfaces';
import { BG_COLOR } from 'src/assets/config';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
})
export class AllEntriesComponent implements OnInit {
  public color: string = BG_COLOR;
  public entries: Entry[] = [];
  public isLoading: boolean = true;

  constructor(private entriesService: EntriesService) {}

  ngOnInit(): void {
    this.entriesService.getAllEntries().subscribe(
      (a: Response) => {
        this.entries = a.data;
        this.isLoading = false;
      },
      (_: Response) => {
        this.isLoading = false;
      }
    );
  }
}
