import React, { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import axios from 'axios';


function Dashboard({ item = []}) {
    console.log(item);
  useLayoutEffect(() => {
    
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      }) 
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    
    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "product_sku"
      })
    );
    xAxis.data.setAll(item);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Stok",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "product_quantityStock",
        categoryXField: "product_sku"
      })
    );
    series1.data.setAll(item);
    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [item]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "100%" }}><h1 className='text-start fw-bold ms-4'>Stok Produk</h1></div>
  );
}
export default Dashboard;