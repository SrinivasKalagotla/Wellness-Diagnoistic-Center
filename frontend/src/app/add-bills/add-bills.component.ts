import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css']
})
export class AddBillsComponent implements OnInit {
  billNumber: number = 0;
  amount: number = 0;
  amountPaid: number = 0;
  selectedTests: any[] = [];
  patientName: string = '';
  date: Date = new Date();
  balance: number = 0;
  isFormSubmitted: boolean = false;
  availableTests: any[] = [];

  constructor(private billService: BillService, private router: Router) { }

  subjects = [
    {
      name: 'Heart',
      tests: [
        { name: 'X-Ray', price: 100 },
        { name: 'ECG', price: 50 },
        { name: 'EEG', price: 150 },
        { name: 'MRI', price: 300 },
      ],
    },
    {
      name: 'Blood',
      tests: [
        { name: 'Complete Blood Count', price: 250 },
        { name: 'Thyroid Panel', price: 350 },
      ],
    },
    {
      name: 'Urine',
      tests: [
        { name: 'Urine Test', price: 200 },
      ],
    },
    {
      name: 'Imaging',
      tests: [
        { name: 'ULTRASONOGRAPHY', price: 200 },
        { name: 'CT Scan', price: 400 },
        { name: 'PET Scan', price: 800 },
      ],
    },
  ];

  selectedSubject: any;
  selectedTest: any;

  ngOnInit(): void {
  }

  addBill() {
    const tests = this.selectedTests.map(test => ({ name: test.name, price: test.price }));
    this.isFormSubmitted = true;
    this.billService.addBill(this.patientName, tests, this.amountPaid, this.date).subscribe({
      next: (response: any) => {
        this.isFormSubmitted = true;
        this.billNumber = response.billNumber;
        this.balance = response.balance;
      },
      error: (error: any) => {
        console.log(error);
        alert('Failed to add bill. Please try again later.');
      }
    });
  }
  

  searchPatientName: string = '';

  viewBillsByName() {
    if (this.searchPatientName.trim() !== '') {
      this.router.navigate(['/view-bills', this.searchPatientName]);
    } else {
      alert('Please enter a patient name to search for.');
    }
  }

  onChangeSubject() {
    if (this.selectedSubject) {
      this.availableTests = this.selectedSubject.tests;
    } else {
      this.availableTests = [];
    }
  }
}
