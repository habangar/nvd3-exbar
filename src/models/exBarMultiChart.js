nv.models.exBarMultiChart = function(options) {
  if (typeof options == "undefined") {
    options = {}
  }

  var mainChart = [nv.models.exBarChart(options)]
 
  contextChart = options.withContext ? nv.models.exBarContextChart(options) : null

  var width, 
  height = null,
  contextHeight = 50,
  margin = {top: 10, right: 30, bottom: 20, left: 60},
  contextMargin = {top: 10, right: 30, bottom: 5, left: 60},
  delayed

  function chart(selection) {
    selection.each(function(data) {	

      
      $.each(data, function(index, value) {

        mainChart[index].chartID(index)

        if(options.withContext) { 
          mainChart[index].contextChart(contextChart)
        }
        mainChart[index](selection)
      })

      if(options.withContext) { 
        contextChart.chartUnderControl(mainChart[0]) 
        contextChart(selection) 
      }
    });
  }


  function callFunctionOnCharts(functionName,params) {
      var args = Array.prototype.slice.call(params);
      if(args.length <= 1) {
        $.each(mainChart,function(index, chartInstance) {
          chartInstance[functionName].apply(undefined,args)
        })
      } else {
        console.log(functionName)
        var index = args[1]
        var args2= args.slice(0,1)
        mainChart[index][functionName].apply(undefined,args2)
      }
  }

  //============================================================


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  

  chart.update = function() {
  	callFunctionOnCharts("update",[])
  	if(options.withContext) { contextChart.update() }
	  return chart
  }


  chart.dispatch = mainChart.dispatch;
  chart.legend = mainChart.legend;
  chart.lines = mainChart.lines;
  chart.lines2 = mainChart.lines2;
  chart.bars = mainChart.bars;
  chart.xAxis = mainChart.xAxis;
  chart.y1Axis = mainChart.y1Axis;
  chart.y2Axis = mainChart.y2Axis;
  chart.mainChart = mainChart;
  chart.contextChart = contextChart;

  chart.x = function() {

    callFunctionOnCharts("x",arguments)  

    if(options.withContext) {
      contextChart.getX = arguments[0];
      contextChart.lines.x(arguments[0]);
      contextChart.bars.x(arguments[0]);
    }

    return chart;
  };

  chart.y = function() {

    callFunctionOnCharts("y",arguments)

    if(options.withContext) {
      contextChart.getY = arguments[0];
      contextChart.lines.y(arguments[0]);
      contextChart.bars.y(arguments[0]);
    }

    return chart;
  };

  chart.mainChartMargin = function(_) {
    if (!arguments.length) return margin;

    margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
    margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
    margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
    margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;

    callFunctionOnCharts("margin",[margin])

    return chart;
  };


  chart.contextChartMargin = function(_) {
    if (!arguments.length) return contextMargin;
    
    contextMargin.top    = typeof _.top    != 'undefined' ? _.top    : contextMargin.top;
    contextMargin.right  = typeof _.right  != 'undefined' ? _.right  : contextMargin.right;
    contextMargin.bottom = typeof _.bottom != 'undefined' ? _.bottom : contextMargin.bottom;
    contextMargin.left   = typeof _.left   != 'undefined' ? _.left   : contextMargin.left;
    
    if (options.withContext) { 
      contextChart.margin(contextMargin)
    }
    return chart;
  };
 

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function() {
    callFunctionOnCharts("color",arguments)

    if(options.withContext) { contextChart.color(arguments[0]); }
    return chart;
  };

  chart.tooltip = function() {
    callFunctionOnCharts("tooltip",arguments)
    
    return chart;
  };

  chart.tooltips = function(_) {
    if (!arguments.length) return mainChart.tooltips;
    mainChart.tooltips = _;
    return chart;
  };

  chart.tooltipContent = function(_) {
    if (!arguments.length) return mainChart.tooltip;
    mainChart.tooltip = _;
    return chart;
  };

  chart.noData = function(_) {
    if (!arguments.length) return mainChart.noData;
    mainChart.noData = _;
    if(options.withContext) { contextChart.noData = _; }
    return chart;
  };

  chart.brushExtent = function(_) {
    if (!arguments.length) return contextChart.brushExtent;
    contextChart.brushExtent = _;
    return chart;
  };

  chart.stacked = function() {
      
    callFunctionOnCharts("stacked",arguments)
    if(options.withContext) { contextChart.state.stacked = arguments[0]; }

    return chart;
  }

  chart.delayed = function() {

    callFunctionOnCharts("delayed",arguments)    
    if(options.withContext) { contextChart.delayed = arguments[0]; }

    return chart;
  }

  chart.delay = function() {
    callFunctionOnCharts("delay",arguments)
    if(options.withContext) { contextChart.delay = arguments[0]; }
    return chart;
  };

  chart.drawTime = function() {
    callFunctionOnCharts("drawTime",arguments)
    return chart;
  };

  chart.interval = function() {
    
    callFunctionOnCharts("interval",arguments)
    if(options.withContext) { contextChart.interval(arguments[0]); }

    return chart;
  };

  chart.extent = function(_) {
    if (!arguments.length) return contextChart.extent;
    contextChart.brush.extent(_);
    return chart;    
  }

  chart.cursorYValueFormat = function() {
    callFunctionOnCharts("cursorYValueFormat",arguments)
    if(options.withContext) { contextChart.cursorYValueFormat(arguments[0]); }
    return chart;
  }; 

  chart.xAxisTickFormat = function() {
    callFunctionOnCharts("xAxisTickFormat",arguments)
    if(options.withContext) { contextChart.xAxis.tickFormat(arguments[0]) }
    return chart;
  }

  chart.y1AxisTickFormat = function() {
    callFunctionOnCharts("y1AxisTickFormat",arguments)
    if(options.withContext) { contextChart.y1Axis.tickFormat(arguments[0]) }
    return chart;
  }

  chart.y2AxisTickFormat = function() {
    callFunctionOnCharts("y2AxisTickFormat",arguments)
    if(options.withContext) { contextChart.y1Axis.tickFormat(arguments[0]) }
    return chart;
  }

  //============================================================

  return chart; 

}