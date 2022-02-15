/**
 * 影像服务管理功具
 */
export default class ImageryLayerManager {
  constructor(cesiumViewer) {
    this._cesiumViewer = cesiumViewer;
    this._layers = [];
  }

  get add() {
    return this._add;
  }

  get remove() {
    return this._remove;
  }

  get removeAll() {
    return this._removeAll;
  }

  get getById() {
    return this._getById;
  }

  /**
   * 添加切片服务
   * @param {String} imageryProvider
   * @param {Object} options
   */
  _add(imageryProvider, options = {}) {
    if (!imageryProvider) return;
    const layer = this._cesiumViewer.imageryLayers.addImageryProvider(imageryProvider);

    layer.id = options.id;
    layer.show = options.show;

    this._layers.push(layer);
    return layer;
  }

  /**
   * 移除图层
   * @param {ImageryLayer} layer 需要移除的图层对象
   */
  _remove(layer) {
    const index = this._layers.findIndex(layer);
    this._layers.splice(index, 1);
    this._cesiumViewer.imageryLayers.remove(layer);
  }

  /**
   * 移除所有图层
   */
  _removeAll() {
    for (let i = 0; i < this._layers.length; i++) {
      let layer = this._layers.pop();
      this._cesiumViewer.imageryLayers.remove(layer);
    }
  }

  /**
   * 根据图层id获取图层
   * @param {String} layerId 图层id
   * @return {ImageryLayer|undefined} 返回获取到的图层，若没获取到则返回undefined
   */
  _getById(layerId) {
    const layer = this._layers.find((l) => l.id == layerId);
    return layer;
  }
}
