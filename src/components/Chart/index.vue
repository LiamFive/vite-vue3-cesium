<script>
export default {
  name: 'ChartComponent',
};
</script>

<script setup>
import ResizeListener from 'element-resize-detector';
import 'echarts-liquidfill';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

import { onMounted, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  seriesData: {
    type: Array,
    required: true,
    default: () => [],
  },
  defaultOption: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['on-chart-click']);

const myChart = ref(null);
let chart;

//监听数据变化根据图表数据
watch(
  () => props.seriesData,
  () => {
    updateChartView();
  },
  { deep: true },
);

onMounted(() => {
  chart = echarts.init(myChart.value);
  updateChartView();
  window.addEventListener('resize', handleWindowResize);
  addChartResizeListener();

  chart.on('click', (param) => emit('on-chart-click', param));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize);
});

/**
 * 更新echart视图
 */
const updateChartView = () => {
  if (!chart) return;

  const options = mergeDataToOption();
  chart.setOption(options, true);
};

/**
 * 当窗口缩放时，echart动态调整自身大小
 */
const handleWindowResize = () => {
  chart && chart.resize();
};

/**
 * 将业务数据加入到基础样式配置中
 * @returns {Object} 完整的echart配置
 */
const mergeDataToOption = () => Object.assign(props.defaultOption, { series: props.seriesData });

/**
 * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
 */
const addChartResizeListener = () => {
  const instance = ResizeListener({
    strategy: 'scroll',
    callOnAdd: true,
  });

  instance.listenTo(myChart.value, () => {
    chart && chart.resize();
  });
};
</script>

<template>
  <div ref="myChart" class="chart"></div>
</template>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
