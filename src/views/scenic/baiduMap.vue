<script setup>
let map;
let myGeo;
const longitude = ref('');
const latitude = ref('');

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
        console.log(point);
        if (point) {
          const { lng, lat } = point;
          map.centerAndZoom(point, 16);
          map.addOverlay(
            new BMapGL.Marker(point, { title: '北京市海淀区上地10街' }),
          );
          resolve(point);
        } else {
          reject('您选择的地址没有解析到结果！');
        }
      },
      cityStr,
    );
  });
}
onMounted(() => {
  map = new BMapGL.Map('map');
  map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 5);
  //创建地址解析器实例
  myGeo = new BMapGL.Geocoder();
  var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
  map.addControl(zoomCtrl);
});

defineExpose({
  getPoint,
});
</script>
<template>
  <div class="map" id="map" ref="mapRef"></div>
</template>
