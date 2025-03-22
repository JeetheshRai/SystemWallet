import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public $user_data = new BehaviorSubject<any>(null);
  public $loading = new BehaviorSubject<any>(false);
  constructor() { }
  setWalletData(data:{}){
    localStorage.setItem('choco',JSON.stringify(data))
    this.$user_data.next(data);
  }

  getWalletData(){
    const data = localStorage.getItem('choco')
    if(!data) return false
    this.$user_data.next(JSON.parse(data));
    return JSON.parse(data)
  }
  
  setLoading(data:boolean){
    this.$loading.next(data);
  }
  
}
