<script setup>
let map;
let myGeo;

function getPoint(city, address) {
  return new Promise((resolve, reject) => {
    let cityStr = '';
    if (typeof city === 'string') {
      cityStr = city;
    } else {
      cityStr = city.join('');
    }
    myGeo.getPoint(
      address,
      function (point) {
        if (point) {
          map.centerAndZoom(point, 16);
          const marker = new BMapGL.Marker(point);
          map.clearOverlays(); // 清除地图上所有覆盖物
          map.addOverlay(marker); // 将标注添加到地图中
          resolve(point);
        } else {
          reject('您选择的地址没有解析到结果！');
        }
      },
      cityStr,
    );
  });
}

function setCenter() {
  map.centerAndZoom(new BMapGL.Point(116.40396298757886, 39.91511908708907), 8);
}
onMounted(() => {
  map = new BMapGL.Map('map');
  setCenter();
  //创建地址解析器实例
  myGeo = new BMapGL.Geocoder();
  var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
  map.addControl(zoomCtrl);
});

defineExpose({
  getPoint,
  setCenter,
});
</script>
<template>
  <div class="map" id="map" ref="mapRef"></div>
</template>
