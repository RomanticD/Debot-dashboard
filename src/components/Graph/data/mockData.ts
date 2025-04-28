class MockDataService {
    bar = {
        basic: {
            salesComparison: {
                xAxisData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                series: [{ name: '销量', data: [5, 20, 36, 10, 10, 20] }]
            },
            regionSales: {
                xAxisData: ['华北', '华东', '华南', '华中', '西北'],
                series: [{ name: '销售额', data: [45, 60, 55, 40, 35] }]
            }
        },
        
        multiSeries: {
            annualComparison: {
                xAxisData: ['一月', '二月', '三月', '四月', '五月', '六月'],
                series: [
                    { name: '2023年', data: [15, 20, 25, 30, 35, 40] },
                    { name: '2024年', data: [20, 25, 30, 35, 40, 45] }
                ]
            },
            productCategory: {
                xAxisData: ['电子产品', '服装', '食品', '家居'],
                series: [
                    { name: '线上', data: [65, 40, 55, 30] },
                    { name: '线下', data: [35, 60, 45, 70] }
                ]
            }
        },
        horizontal: {
            populationRanking: {
                yAxisData: ['巴西', '印尼', '美国', '印度', '中国', '世界人口'],
                series: [{ name: '人口', data: [18, 20, 32, 41, 52, 78] }]
            },
            satisfactionRate: {
                yAxisData: ['服务态度', '产品质量', '物流速度', '售后服务'],
                series: [{ name: '满意度', data: [85, 90, 78, 82] }]
            }
        }
    };

    line = {
        basic: {
            websiteTraffic: {
                xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                series: [{ name: '访问量', data: [150, 230, 224, 218, 135, 147, 260] }]
            }
        },
        multiSeries: {
            weatherTrend: {
                xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                series: [
                    { name: '降水量', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] },
                    { name: '温度', data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2] }
                ]
            }
        }
    };

    pie = {
        basic: {
            trafficSources: {
                series: [{
                    data: [
                        {value: 235, name: '视频广告'},
                        {value: 274, name: '联盟广告'},
                        {value: 310, name: '邮件营销'},
                        {value: 335, name: '直接访问'},
                        {value: 400, name: '搜索引擎'}
                    ]
                }]
            }
        },
        rose: {
            drinkPreferences: {
                series: [{
                    roseType: 'area',
                    data: [
                        {value: 40, name: '可乐'},
                        {value: 38, name: '雪碧'},
                        {value: 32, name: '橙汁'},
                        {value: 30, name: '绿茶'},
                        {value: 28, name: '奶茶'},
                        {value: 26, name: '咖啡'}
                    ]
                }]
            }
        },
        doughnut: {
            paymentMethods: {
                series: [{
                    radius: ['40%', '70%'],
                    data: [
                        {value: 1048, name: '支付宝'},
                        {value: 735, name: '微信'},
                        {value: 580, name: '银联'},
                        {value: 484, name: '现金'},
                        {value: 300, name: '其它'}
                    ]
                }]
            }
        }
    };

    // 其他图表类型保持相同模式...
}

const MockData = new MockDataService();

export default MockData; 