import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dealer-performance-details',
  templateUrl: './dealer-performance-details.component.html',
  styleUrls: ['./dealer-performance-details.component.scss']
})
export class DealerPerformanceDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DealerPerformanceDetailsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {

    this.dialogRef.close();
  }

}
