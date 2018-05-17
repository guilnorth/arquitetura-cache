import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type:string = 'bar';
  public chart2Type:string = 'pie';
  public chart3Type:string = 'line';
  public chart4Type:string = 'radar';
  public chart5Type:string = 'doughnut';


  public chartType = 'line';



  @Input() miss;
  @Input() hits;

  public chartDatasets: Array<any>;

  /*public chartDatasets: Array<any> = [
    {data: [0, 3, 16, 5, 1], label: 'Hits'},
    {data: [64, 61, 48, 59, 63], label: 'Miss'},

  ];*/

  public chartLabels: Array<any> = ['Programa 1', 'Programa 2', 'Programa 3', 'Programa 4', 'Programa 5'];

  public chartColors:Array<any> = [
    {
      backgroundColor:  "#5AD3D1",
      hoverBackgroundColor:  "#5AD3D1"
    },
    {
      backgroundColor: "#FF5A5E",
      hoverBackgroundColor: "#FF5A5E"
    }
  ];

  public dateOptionsSelect: any[];
  public bulkOptionsSelect: any[];
  public showOnlyOptionsSelect: any[];
  public filterOptionsSelect: any[];

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }]
    }
  };

  constructor() {
  
  }

  ngOnInit() {
    this.chartDatasets = [
      {data: this.hits, label: 'Hits'},
      {data: this.miss, label: 'Miss'},

    ]
  }

}
