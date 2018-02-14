import * as shape from 'd3-shape';
// Bar Chart

export let barChartView: any[] = [550, 400];

// options
export let barChartShowXAxis = true;
export let barChartShowYAxis = true;
export let barChartGradient = false;
export let barChartShowLegend = false;
export let barChartShowXAxisLabel = true;
export let barChartXAxisLabel = 'Country';
export let barChartShowYAxisLabel = true;
export let barChartYAxisLabel = 'Population';

export let barChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// Pie CHart

export let pieChartView: any[] = [550, 400];

// options
export let pieChartShowLegend = false;

export let pieChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// pie
export let pieChartShowLabels = true;
export let pieChartExplodeSlices = false;
export let pieChartDoughnut = true;
export let pieChartGradient = false;

export let pieChart1ExplodeSlices = true;
export let pieChart1Doughnut = false;

// Line Charts

export let lineChartView: any[] = [550, 400];

// options
export let lineChartShowXAxis = true;
export let lineChartShowYAxis = true;
export let lineChartGradient = false;
export let lineChartShowLegend = false;
export let lineChartShowXAxisLabel = true;
export let lineChartXAxisLabel = 'Country';
export let lineChartShowYAxisLabel = true;
export let lineChartYAxisLabel = 'Population';

export let lineChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// line, area
export let lineChartAutoScale = true;
export let lineChartLineInterpolation = shape.curveBasis;

// Area Charts
export let areaChartView: any[] = [550, 400];

// options
export let areaChartShowXAxis = true;
export let areaChartShowYAxis = true;
export let areaChartGradient = false;
export let areaChartShowLegend = false;
export let areaChartShowXAxisLabel = true;
export let areaChartXAxisLabel = 'Country';
export let areaChartShowYAxisLabel = true;
export let areaChartYAxisLabel = 'Population';

export let areaChartColorScheme = {
    domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA']
};

// line, area
export let areaChartAutoScale = true;
export let areaChartLineInterpolation = shape.curveBasis
