import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = '/api/bills';
 
  constructor(private http: HttpClient) { }

  addBill(patientName: string, tests: any[], amountPaid: number, date: Date) {
    const url = `${this.apiUrl}/add`;
    console.log('URL:', url);
    console.log('Params:', { patientName, tests, amountPaid, date });
    return this.http.post(url, { patientName, tests, amountPaid, date }, { withCredentials: true });
  }
  

  getBills() {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getBillsByName(patientName: string) {
    return this.http.get(`${this.apiUrl}/name/${patientName}`, { withCredentials: true });
  }

  deleteBill(billId: string) {
    return this.http.delete(`/api/bills/${billId}`);
  }
}
