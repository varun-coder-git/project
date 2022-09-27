import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-detail',
  templateUrl: './dealer-detail.component.html',
  styleUrls: ['./dealer-detail.component.scss']
})
export class DealerDetailComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DealerDetailComponent>,) { }

  ngOnInit(): void {
  }
  onClose(){
    this.dialogRef.close();
  }

}
