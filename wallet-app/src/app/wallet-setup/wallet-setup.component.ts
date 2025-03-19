import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../core/data.service';
@Component({
  selector: 'app-wallet-setup',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.css'],
  standalone: true
})
export class WalletSetupComponent implements OnInit {
  public walletForm: FormGroup;
  public subscriptions : any = []
  public userData : any = ''
  constructor(private walletService: WalletService, private router: Router,private toastr: ToastrService,private dataService:DataService) {
    this.walletForm = new FormGroup({
      name: new FormControl('', Validators.required),
      balance: new FormControl(null, [
        Validators.min(0),
        this.decimalPlacesValidator(4)
      ])  
    });
  }

  ngOnInit(): void {  
    this.subscriptions.push(this.dataService.$user_data.subscribe(data => {
      this.userData = data
    }))
    this.dataService.getWalletData()
  }

  decimalPlacesValidator(maxDecimalPlaces: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = new RegExp(`^\\d+(\\.\\d{1,${maxDecimalPlaces}})?$`);
      return regex.test(control.value) ? null : { invalidDecimalPlaces: true };
    };
  }

  async submitForm() {
    if (this.walletForm.valid) {
      const { name, balance } = this.walletForm.value;
      let walletData = await lastValueFrom(this.walletService.initWallet(name, balance ?? 0));
      if(walletData.status=='success'){
        this.dataService.setWalletData(walletData.data)
        this.router.navigate(['/transactions']);
      }else{
        this.toastr.error(walletData?.message || 'Something went wrong.', 'Error');
      }
    }
  }
}