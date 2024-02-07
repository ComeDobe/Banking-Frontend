import { Component, OnInit } from '@angular/core';
import { LightInfoInput } from '../../components/light-info/light-info.component';
import { StatisticsService } from '../../services/services/statistics.service';
import { HelperService } from '../../services/helper/helper.service';
import { lastValueFrom } from 'rxjs';
import { ChartDataset, ChartType } from 'chart.js';
import { DatepickerOptions } from 'ng2-datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  accountInfoList: Array<LightInfoInput> = [];
  private accountBalance = 0;
  private highestTransfer = 0;
  private highestDeposit = 0;
  chartType: ChartType = 'line';
  dataset: ChartDataset[] = [];
  labels: string[] = [];
  chartOptions: any = {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 16,
        usePointStyle: true
      }
    }
  };


dateOptions: DatepickerOptions = {
    format: 'yyyy-MM-dd'
  };
  startDate: Date = new Date();
  endDate: Date = new Date();


  constructor(
    private statisticsService: StatisticsService,
    private helperService: HelperService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.initializeAccountInfo();
  }

  filterStatistics() {
    this.statisticsService.findSumTractionsByDate({
      'user-id': this.helperService.userId,
      'start-date': this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string,
      'end-date': this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string
    }).subscribe({
      next: (values) => {
        console.log(values);
        this.dataset = [];
        this.labels  = [];
        const chartDataSet: ChartDataset = {
          data: [],
          label: 'Sum transactions by day'
        };
        const dataValues: Array<number> = [];
        for(let record of values) {
          this.labels.push(record.transactionDate as string);
          dataValues.push(record.amount as number);
        }
        chartDataSet.data = dataValues;
        this.dataset.push(chartDataSet);
      }
    });
  }


  private async initializeAccountInfo() {
    this.accountBalance = await lastValueFrom(
      this.statisticsService.getAccountBalance({'user-id': this.helperService.userId})
    );
    this.highestTransfer = await lastValueFrom(
      this.statisticsService.highestTransfer({
        'user-id': this.helperService.userId
      })
    );
    this.highestDeposit = await lastValueFrom(
      this.statisticsService.highestDeposit({
        'user-id': this.helperService.userId
      })
    );
    this.accountInfoList = [
      {
        title: 'Account balance',
        amount: this.accountBalance,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest transfer',
        amount: this.highestTransfer,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest deposit',
        amount: this.highestDeposit,
        infoStyle: 'bg-success'
      }
    ];
  }

}






//
// import { Component, OnInit } from '@angular/core';
// import { LightInfoInput } from '../../components/light-info/light-info.component';
// import { StatisticsService } from '../../services/services/statistics.service';
// import { HelperService } from '../../services/helper/helper.service';
// import { lastValueFrom } from 'rxjs';
// import { ChartDataset, ChartType } from 'chart.js'; // Correction ici
// import { DatepickerOptions } from 'ng2-datepicker';
// import { DatePipe } from '@angular/common';
//
// @Component({
//   selector: 'app-user-dashboard',
//   templateUrl: './user-dashboard.component.html',
//   styleUrls: ['./user-dashboard.component.scss']
// })
// export class UserDashboardComponent implements OnInit {
//   accountInfoList: Array<LightInfoInput> = [];
//   private accountBalance = 0;
//   private highestTransfer = 0;
//   private highestDeposit = 0;
//   chartType: ChartType = 'line';
//   dataset: ChartDataset[] = []; // Correction ici
//   labels: string[] = []; // Correction ici
//   chartOptions: any = {
//     scales: {
//       y: { // Correction pour adapter aux changements dans chart.js v3
//         beginAtZero: true
//       }
//     },
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           fontSize: 16,
//           usePointStyle: true
//         }
//       }
//     }
//   };
//   dateOptions: DatepickerOptions = {
//     format: 'yyyy-MM-dd'
//   };
//   startDate: Date = new Date();
//   endDate: Date = new Date();
//
//   constructor(
//     private statisticsService: StatisticsService,
//     private helperService: HelperService,
//     private datePipe: DatePipe
//   ) {}
//
//   ngOnInit(): void {
//     this.initializeAccountInfo();
//   }
//
//   filterStatistics() {
//     this.statisticsService.findSumTractionsByDate({
//       'user-id': this.helperService.userId,
//       'start-date': this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string,
//       'end-date': this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string
//     }).subscribe({
//       next: (values) => {
//         console.log(values);
//         this.dataset = [];
//         this.labels  = [];
//         const chartDataSet: ChartDataset = { data: [], label: 'Sum transactions by day' };
//         const dataValues: number[] = [];
//         for (let record of values) {
//           const transactionDate = record.transactionDate ?? 'Unknown Date';
//           const amount = record.amount ?? 0;
//
//           this.labels.push(transactionDate);
//           dataValues.push(amount);
//         }
//         chartDataSet.data = dataValues;
//         this.dataset.push(chartDataSet);
//       }
//     });
//   }
//
//
//   private async initializeAccountInfo() {
//     this.accountBalance = await lastValueFrom(
//       this.statisticsService.getAccountBalance({'user-id': this.helperService.userId})
//     );
//     this.highestTransfer = await lastValueFrom(
//       this.statisticsService.highestTransfer({
//         'user-id': this.helperService.userId
//       })
//     );
//     this.highestDeposit = await lastValueFrom(
//       this.statisticsService.highestDeposit({
//         'user-id': this.helperService.userId
//       })
//     );
//     this.accountInfoList = [
//       {
//         title: 'Account balance',
//         amount: this.accountBalance,
//         infoStyle: 'bg-primary'
//       },
//       {
//         title: 'Highest transfer',
//         amount: this.highestTransfer,
//         infoStyle: 'bg-warning'
//       },
//       {
//         title: 'Highest deposit',
//         amount: this.highestDeposit,
//         infoStyle: 'bg-success'
//       }
//     ];
//   }
// }
