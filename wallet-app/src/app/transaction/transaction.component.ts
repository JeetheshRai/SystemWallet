import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../config';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  standalone: true
})
export class TransactionComponent implements OnInit {
  public transactionForm: FormGroup;
  public transactions: any = []
  public subscriptions: any = []
  public userData: any = ''
  public transactionCount = 0
  public currentPage = 1;
  public itemsPerPage = 10;
  public sortPage: any = { date: -1 }

  constructor(private dataService: DataService, private router: Router, private transactionService: TransactionService, private walletService: WalletService, private toastr: ToastrService) {
    this.transactionForm = new FormGroup({
      balance: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        this.decimalPlacesValidator(4)
      ]),
      description: new FormControl(''),
      isCredit: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.dataService.$user_data.subscribe(data => {
      this.userData = data
    }))
    this.userData = this.dataService.getWalletData()
    if (!this.userData) {
      this.router.navigate(['/wallet-setup']);
      return
    }
    this.dataService.setLoading(true)
    this.loadTransacation()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: { unsubscribe: () => any; }) => sub.unsubscribe())
  }

  async loadTransacation() {
    let limit = this.itemsPerPage
    let skip = (this.currentPage * limit) - limit
    let getTransactionResponse = await lastValueFrom(this.transactionService.loadTransacation(this.userData._id, skip, limit, this.sortPage));
    this.dataService.setLoading(false)
    if (getTransactionResponse.status == 'success') {
      this.transactions = getTransactionResponse.data.transactionList
      this.transactionCount = getTransactionResponse.data.count
    } else {
      this.toastr.error(getTransactionResponse?.message || 'Something went wrong.', 'Error');
    }
  }

  get totalPages(): number {
    return Math.ceil(this.transactionCount / this.itemsPerPage);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dataService.setLoading(true)
      this.loadTransacation()
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dataService.setLoading(true)
      this.loadTransacation()
    }
  }

  onSortChange(event: any): void {
    if (event.target.value == 'new_date') {
      this.sortPage = { date: -1 }
    } else if (event.target.value == 'old_date') {
      this.sortPage = { date: 1 }
    } else if (event.target.value == 'asc') {
      this.sortPage = { amount: 1 }
    } else if (event.target.value == 'desc') {
      this.sortPage = { amount: -1 }
    }
    this.dataService.setLoading(true)
    this.loadTransacation()
  }


  async submitTransaction() {
    if (this.transactionForm.valid) {
      this.dataService.setLoading(true)
      const { isCredit, balance, description } = this.transactionForm.value;
      let transactionResponse: any = await lastValueFrom(this.transactionService.submitTransaction(this.userData._id, isCredit, balance, description));
      this.dataService.setLoading(false)
      if (transactionResponse.status == 'success') {
        this.userData.balance = transactionResponse?.data?.balance || this.userData.balance;
          this.dataService.setWalletData(this.userData)
          this.transactionForm.reset({
            balance: null,
            description: '',
            isCredit: ''
          });
        this.dataService.setLoading(true)
        this.loadTransacation()
      } else {
        this.toastr.error(transactionResponse?.message || 'Something went wrong.', 'Error');
      }
    } else{
      this.toastr.error('Please fill the field Balance and select Credit or Debit.', 'Error');
    }
  }


  decimalPlacesValidator(maxDecimalPlaces: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = new RegExp(`^\\d+(\\.\\d{1,${maxDecimalPlaces}})?$`);
      return regex.test(control.value) ? null : { invalidDecimalPlaces: true };
    };
  }

  get amountControl() {
    return this.transactionForm.get('balance');
  }

  get isCreditControl() {
    return this.transactionForm.get('isCredit');
  }

  async exportCSV() {
    const link = document.createElement('a');
    link.href = environment.server_api_endpoint + '/transaction/downloadCSV/' + this.userData._id;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async refreshData(){
    this.dataService.setLoading(true)
    let walletResponse: any = await lastValueFrom(this.walletService.getWallet(this.userData._id));
    this.dataService.setLoading(false)
    if (walletResponse.status == 'success') {
      this.dataService.setWalletData(walletResponse.data)
      this.toastr.success('Successfully refreshed Wallet ID: ' + walletResponse?.data?._id, 'Success');
    } else {
      this.toastr.error(walletResponse?.message || 'Something went wrong.', 'Error');
    }
  }
}
