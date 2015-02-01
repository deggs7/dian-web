'use strict';

/**
 * @ngdoc function
 * @name dianApp.controller: ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the dianApp
 */
angular.module('dianApp')

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('console.report', {
                controller: 'ReportCtrl',
                url: '/report',
                templateUrl: 'views/console_report.html'
            })
    }])

    .controller('ReportCtrl', ['$scope', '$http', function($scope, $http){
        // 每天取号数
        $http
            .post(config.api_url + '/restaurant/statistics/daily-registration/')
            .success(function(data, status, headers, config){
                var time_array = [], values_array = [];
                angular.forEach(data, function(item){
                    time_array.push(item.date);
                    values_array.push(item.reg_count);
                });
                var ret = {
                    "time": time_array,
                    "values": values_array
                };

                var report_config = {
                    title: {
                        text: "取号数量趋势图",
                        subtext: "按天计算"
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['取号数量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 20,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ret.time
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitArea : {show : true}
                        }
                    ],
                    series : [
                        {
                            name:'取号数量',
                            type:'bar',
                            data:ret.values
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('dailyRegistration'));
                myChart.setOption(report_config);

            })
            .error(function(error, status, headers, config){

            });

        // 每天平均等待时间
        $http
            .post(config.api_url + '/restaurant/statistics/avg-waiting-time/')
            .success(function(data, status, headers, config){
                var time_array = [], values_expired_array = [], values_passed_array = [];
                angular.forEach(data, function(item){
                    time_array.push(item.date);
                    values_expired_array.push(item.avg_expired_value);
                    values_passed_array.push(item.avg_passed_value);
                });
                var ret = {
                    "time": time_array,
                    "expired": values_expired_array,
                    "passed": values_passed_array
                };

                var report_config = {
                    title: {
                        text: "号码平均等待时间",
                        subtext: "按天计算"
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:["过号等待时间", "就餐等待时间"]
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 20,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ret.time
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitArea : {show : true},
                            axisLabel: {
                                formatter: function(value){
                                    return value + '秒';
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'过号等待时间',
                            type:'bar',
                            data:ret.passed
                        },
                        {
                            name: '就餐等待时间',
                            type: 'bar',
                            data:ret.expired
                        }
                    ]
                };
                console.log(report_config);
                var myChart = echarts.init(document.getElementById('avgWaitingTime'));
                myChart.setOption(report_config);

            })
            .error(function(error, status, headers, config){

            });

        // 每天过号和就餐数对比
        $http
            .post(config.api_url + '/restaurant/statistics/daily-type-registration/')
            .success(function(data, status, headers, config){
                var time_array = [], values_expired_array = [], values_passed_array = [];
                angular.forEach(data, function(item){
                    time_array.push(item.date);
                    values_expired_array.push(item.reg_expired_count);
                    values_passed_array.push(item.reg_passed_count);
                });
                var ret = {
                    "time": time_array,
                    "expired": values_expired_array,
                    "passed": values_passed_array
                };

                var option = {
                    title : {
                        text: '就餐和过号数量对比图',
                        subtext: '按天计算'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params){
                            return params[0].name + '<br/>'
                                + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                                + params[1].seriesName + ' : ' + (params[1].value + params[0].value);
                        }
                    },
                    legend: {
                        selectedMode:false,
                        data:['就餐数量', '过号数量']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ret.time
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            boundaryGap: [0, 0.1]
                        }
                    ],
                    series : [
                        {
                            name:'就餐数量',
                            type:'bar',
                            stack: 'sum',
                            barCategoryGap: '50%',
                            itemStyle: {
                                normal: {
                                    color: 'tomato',
                                    barBorderColor: 'tomato',
                                    barBorderWidth: 6,
                                    barBorderRadius:0,
                                    label : {
                                        show: true, position: 'insideTop'
                                    }
                                }
                            },
                            data:ret.expired
                        },
                        {
                            name:'过号数量',
                            type:'bar',
                            stack: 'sum',
                            itemStyle: {
                                normal: {
                                    color: '#fff',
                                    barBorderColor: 'tomato',
                                    barBorderWidth: 6,
                                    barBorderRadius:0,
                                    label : {
                                        show: true,
                                        position: 'top',
                                        formatter: function (a, b, c) {
                                            for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
                                                if (option.xAxis[0].data[i] == b) {
                                                    return option.series[0].data[i] + c;
                                                }
                                            }
                                        },
                                        textStyle: {
                                            color: 'tomato'
                                        }
                                    }
                                }
                            },
                            data:ret.passed
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('dailyTypeRegistration'));
                myChart.setOption(option);
            })
            .error(function(data, status, headers, config){

            })

    }]);

