import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './core/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wallet-app';
  public isLoading : boolean = false;
  public subscriptions : any = []
  constructor(private dataService : DataService){

  }
  ngOnInit(): void {  
    this.subscriptions.push(this.dataService.$loading.subscribe(data => {
      this.isLoading = data
    }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub: { unsubscribe: () => any; }) => sub.unsubscribe())
  }
}
