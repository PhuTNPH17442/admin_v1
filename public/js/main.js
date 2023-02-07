

$(document).ready(function(){
    pieChartData();
    userChartData();
    hobbiesChartData();
    educationChartData();
}) 

const pieChartData = async()=>{
    let countMaleData = 0
    let countFemaleData = 0
    $.ajax({
        url:'/pieChart',
        type:'GET',
        datatype:'json',
        success: (response)=>{
        if(response !==null){
            //  console.log(response)
            const {countMale,countFemale} = response
            const total = countMale + countFemale
             countFemaleData = parseFloat(((countFemale/total)*100).toFixed(2))
             countMaleData = parseFloat(((countMale/total)*100).toFixed(2))
             renderPieChart({countFemaleData,countMaleData})
        }
    },
    error:(err)=>{
        console.log(err)
    }
    })
}
    const renderPieChart = ({countFemaleData,countMaleData})=>{
    Highcharts.chart('pieChart', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Ratio of men and women using the app',
          align: 'left'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Data',
          colorByPoint: true,
          data: [{
            name: 'Male',
            y: countMaleData,
            sliced: true,
            color:'#33F4FF'
          }, {
            name: 'Female',
            y: countFemaleData,
            color:'#56FF33'
          }]
        }]
      });
}
const userChartData = async()=>{
   
  $.ajax({
    url:'/userChart',
    type:'GET',
    datatype:'json',
    success: (response)=>{}
    ,
    error:(err)=>{
        console.log(err)
    }
    })
  Highcharts.chart('userChart', {

    title: {
      text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
      align: 'left'
    },
  
    // subtitle: {
    //   text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
    //   align: 'left'
    // },
  
    // yAxis: {
    //   title: {
    //     text: 'Number of Employees'
    //   }
    // },
  
    xAxis: {
      
      categories:['Tháng 4/2022','Tháng 5/2022', 'Tháng 6/2022','Tháng 7/2022','Tháng 8/2023','Tháng 9/2023', 'Tháng 10/2023','Tháng 11/2022', 'Tháng 12/2022', 'Tháng 1/2023', 'Tháng 2/2023']
      
    },
  
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    // plotOptions: {
    //   series: {
    //     label: {
    //       connectorAllowed: false
    //     },
    //     pointStart: 2022
    //   }
    // },
  
    series: [{
      name: 'New User',
      data: [0, 0, 0, 0, 0, 14,
        17, 16, 15, 16, 15]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });
}
const hobbiesChartData = async()=>{
   
  $.ajax({
    url:'/userChart',
    type:'GET',
    datatype:'json',
    success: (response)=>{}
    ,
    error:(err)=>{
        console.log(err)
    }
    })
    Highcharts.chart('hobbiesChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region',
        align: 'left'
      },
      subtitle: {
        text: 'Source: <a ' +
          'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
          'target="_blank">Wikipedia.org</a>',
        align: 'left'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Year 1990',
        data: [631, 727, 3202, 721, 26]
      }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726, 31]
      }, {
        name: 'Year 2010',
        data: [1044, 944, 4170, 735, 40]
      }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746, 42]
      }]
    });
  }
  const educationChartData = async()=>{
    $.ajax({
      url:'/userChart',
      type:'GET',
      datatype:'json',
      success: (response)=>{}
      ,
      error:(err)=>{
          console.log(err)
      }
      })
      Highcharts.chart('educationChart', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'World\'s largest cities per 2021'
        },
        subtitle: {
          text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Population (millions)'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
        },
        series: [{
          name: 'Population',
          data: [
            ['Tokyo', 37.33],
            ['Delhi', 31.18],
            ['Shanghai', 27.79],
            ['Sao Paulo', 22.23],
            ['Mexico City', 21.91],
            ['Dhaka', 21.74],
            ['Cairo', 21.32],
            ['Beijing', 20.89],
            ['Mumbai', 20.67],
            ['Osaka', 19.11],
            ['Karachi', 16.45],
            ['Chongqing', 16.38],
            ['Istanbul', 15.41],
            ['Buenos Aires', 15.25],
            ['Kolkata', 14.974],
            ['Kinshasa', 14.970],
            ['Lagos', 14.86],
            ['Manila', 14.16],
            ['Tianjin', 13.79],
            ['Guangzhou', 13.64]
          ],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }]
      });
  }