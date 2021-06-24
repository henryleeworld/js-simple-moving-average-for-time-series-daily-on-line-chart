window.chartColors = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blue: '#5A99D3',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkgrey: '#A9A9A9',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategrey: '#2F4F4F',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    goldenrod: '#DAA520',
    gold: '#FFD700',
    green: '#0AA443',
    greenyellow: '#ADFF2F',
    grey: '#A3A3A3',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: "#ADD8E6",
    lightcoral: '#F08080',
    lightcyan: "#E0FFFF",
    lightgoldenrodyellow: '#FAFAD2',
    lightgreen: "#90EE90",
    lightgrey: "#D3D3D3",
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: "#20B2AA",
    lightskyblue: "#87CEFA",
    lightslategrey: "#778899",
    lightsteelblue: "#B0C4DE",
    lightyellow: '#FFFFE0',
    lime: "#00FF00",
    limegreen: "#32CD32",
    linen: "#FAF0E6",
    magenta: '#FF00FF',
    maroon: "#800000",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: "#3CB371",
    mediumslateblue: '#7B68EE',
    mediumspringgreen: "#00FA9A",
    mediumturquoise: "#48D1CC",
    mediumvioletred: '#C71585',
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: '#FFE4B5',
    navajowhite: "#FFDEAD",
    navy: "#000080",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    orange: '#E97C30',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palevioletred: '#DB7093',
    palegreen: "#98FB98",
    paleturquoise: "#AFEEEE",
    palevioletred: "#DB7093",
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: "#CD853F",
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: "#B0E0E6",
    purple: '#6C18F3',
    rebeccapurple: '#663399',
    red: '#CF3F05',
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: '#FA8072',
    sandybrown: "#f4a460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    silver: "#C0C0C0",
    skyblue: "#87CEEB",
    slateblue: '#6A5ACD',
    slategrey: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    teal: "#008080",
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: "#40E0D0",
    violet: '#EE82EE',
    wheat: "#F5DEB3",
    white: "#FFFFFF",
    whitesmoke: "#F5F5F5",
    yellow: '#FBBD00',
    yellowgreen: "#9ACD32"
};
var config = {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0,
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        animation: {
            duration: 0,
            // onComplete: done
        },
        hover: {
            animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
    }
}
var canvas = document.getElementById("chart-area");

window.onload = function() {
    $.LoadingOverlay("show");

    axios.get('data/results.json')
        .then(R.prop('data'))
        .then(R.prop('Time Series (Daily)'))
        .then(R.pluck('4. close'))
        .then(keysAndValues)
        .catch(console.log);
};

function keysAndValues(obj) {
    var keys = R.compose(R.reverse, R.keys)(obj);
    var values = R.compose(R.reverse, R.values)(obj);
    var movingAvg20 = nDayAverage(20, keys, values);
    var movingAvg100 = nDayAverage(100, keys, values);
    var movingAvg200 = nDayAverage(200, keys, values);
    var movingAvg500 = nDayAverage(500, keys, values);
    var movingAvg1000 = nDayAverage(1000, keys, values);
    window.lineChart = createChart(keys, values, movingAvg20, movingAvg100, movingAvg200, movingAvg500, movingAvg1000);
    done(window.lineChart);
    $.LoadingOverlay("hide");
}

function nDayAverage(n, keys, values) {
    var movingAvg = [];
    while (values.length > n) {
        avg = R.pipe(R.take(n), R.sum)(values) / n;
        values = values.slice(1);
        movingAvg.push(avg.toFixed(4));
    }
    keys = R.take(keys.length - n)(keys);
    var mappedIndex = R.addIndex(R.map);
    return mappedIndex((val, i) => {
        return {
            x: keys[i],
            y: val
        }
    })(movingAvg);
}

function createChart(keys, values, movingAvg20, movingAvg100, movingAvg200, movingAvg500, movingAvg1000) {
    config.data.labels = keys;
    config.data.datasets = [{
            label: '標準普爾 500 指數',
            data: values,
            pointRadius: 0,
            borderWidth: 0.1
        },
        {
            label: '20 日簡單移動平均線',
            data: movingAvg20,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: window.chartColors.red,
            fill: false
        },
        {
            label: '100 日簡單移動平均線',
            data: movingAvg100,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: window.chartColors.blue,
            hidden: true,
            fill: false
        },
        {
            label: '200 日簡單移動平均線',
            data: movingAvg200,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: window.chartColors.purple,
            hidden: true,
            fill: false
        },
        {
            label: '500 日簡單移動平均線',
            data: movingAvg500,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: window.chartColors.green,
            fill: false
        },
        {
            label: '1000 日簡單移動平均線',
            data: movingAvg1000,
            pointRadius: 0,
            borderWidth: 1,
            borderColor: window.chartColors.black,
            hidden: true,
            fill: false
        }
    ];
    return new Chart(canvas, config);
}

function done(chart) {
    var url = chart.toBase64Image();
    document.getElementById("chart-url").src = url;
}