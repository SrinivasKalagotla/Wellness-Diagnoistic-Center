import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  patientName: string = '';
  searchPatientName: string = '';
  searchTestName: string = '';
  bills: any[] = [];

  displayedColumns: string[] = ['billNumber', 'patientName', 'testName', 'paidAmount', 'balance', 'date', 'delete'];

  constructor(private billService: BillService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const patientName = this.route.snapshot.paramMap.get('patientName');
    const transformBills = (bills: any[]) => {
      return bills.map((bill: any) => ({
        ...bill,
        testName: bill.tests.map((test: any) => test.name).join(', '),
        paidAmount: bill.amountPaid
      }));
    };
  
    if (patientName) {
      this.billService.getBillsByName(patientName).subscribe((bills: Object) => {
        this.bills = transformBills(bills as any[]);
      });
    } else {
      this.billService.getBills().subscribe((bills: Object) => {
        this.bills = transformBills(bills as any[]);
      });
    }
  }
  
deleteBill(billId: string) {
  this.billService.deleteBill(billId).subscribe(() => {
    this.bills = this.bills.filter(bill => bill._id !== billId);
  });
}

viewBillsByName() {
  if (this.searchPatientName.trim() !== '') {
    this.router.navigate(['/view-bills', this.searchPatientName]);
  } else {
    alert('Please enter a patient name to search for.');
  }
}

navViewBills(){
  this.router.navigate(['/view-bills'])
}

}
