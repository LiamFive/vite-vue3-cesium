import * as Cesium from 'cesium';
import ImageryLayerManager from './imagery-layer-manager';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYzM5Mzk1OS1mZGI5LTRkN2UtOGZmYi02NTVhZDEwMTc2ZmMiLCJpZCI6MTIzNjIsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NjA5MjkwMzh9.Y1NW0xAW0H95oTcn8HFyjLyKvakX2lG1WvKRI-KEOGE';

export default class CesiumSourceManager {
  constructor() {
    this._cesiumViewer = null;
  }

  get initMap() {
    return this._initMap;
  }

  get cesiumViewer() {
    return this._cesiumViewer;
  }

  /**
   * 初始化地球
   * @param {String || Element} target
   * @return {Cesium.Viewer} mapViewer
   */
  _initMap(target) {
    const options = this._getInitOptions();
    const cesiumViewer = initViewer(target, options);
    // cesiumViewer.scene.screenSpaceCameraController.enableCollisionDetection = false
    // cesiumViewer.imageryLayers.removeAll();
    this._cesiumViewer = cesiumViewer;

    this._imageryLayerManager = new ImageryLayerManager(cesiumViewer);

    return cesiumViewer;
  }

  /**
   * 获取地球初始化参数
   * @returns {Object}
   */
  _getInitOptions() {
    return {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      shadows: true,
      infoBox: false,
      CreditsDisplay: false,
      shouldAnimate: true,
      selectionIndicator: false,
      orderIndependentTranslucency: false,
      contextOptions: {
        webgl: {
          alpha: true,
        },
      },
    };
  }
}

const initViewer = (target, options) => {
  const cesiumViewer = new Cesium.Viewer(target, options);
  cesiumViewer._cesiumWidget._creditContainer.style.display = 'none'; //隐藏版本信息
  cesiumViewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0); //在没有可用图像时获取或设置地球的颜色。
  // cesiumViewer.scene.debugShowFramesPerSecond = true //显示帧率,帧率与显示流畅度有关，或说与显卡有关
  cesiumViewer.scene.skyBox.show = true; //是否显示星空
  cesiumViewer.scene.sun.show = false; //是否显示太阳
  cesiumViewer.scene.moon.show = false; //是否显示有月亮
  cesiumViewer.scene.skyAtmosphere.show = false; //是否隐藏大气圈
  cesiumViewer.scene.globe.show = true; //是否显示地球
  cesiumViewer.scene.globe.depthTestAgainstTerrain = true; //是否开启深度检测
  cesiumViewer.scene.postProcessStages.fxaa.enabled = true;
  cesiumViewer._cesiumWidget._supportsImageRenderingPixelated =
    Cesium.FeatureDetection.supportsImageRenderingPixelated();
  cesiumViewer._cesiumWidget._forceResize = true;
  // cesiumViewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    let vtxfDpr = window.devicePixelRatio;
    // 适度降低分辨率
    while (vtxfDpr >= 2.0) {
      vtxfDpr /= 2.0;
    }
    cesiumViewer.resolutionScale = vtxfDpr;
  }

  return cesiumViewer;
};
