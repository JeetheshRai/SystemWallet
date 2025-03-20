import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private apiService: ApiService) { }

  initWallet(name: string, balance: number) {
    const wallet = { name, balance };
    return this.apiService.post<any>('/wallet/setup', wallet);
  }
  

  getWallet(walletId:string){
    return this.apiService.get<any>(`/wallet/wallet/${walletId}`);
  }

}
