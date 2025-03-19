import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private apiService: ApiService) { }

  loadTransacation(walletId:string, skip: number, limit: number , sort : {}){
    return this.apiService.get<any>(`/transaction/transactions?walletId=${walletId}&skip=${skip}&limit=${limit}&sort=${JSON.stringify(sort)}`);
  }

  submitTransaction(walletId:string,isCredit:boolean, amount:number, description:string){
    return this.apiService.post<any>(`/transaction/transact/${walletId}`,{isCredit,amount,description});
  }
}
