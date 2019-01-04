<template>
  <div class="m-map" :style="{height:mapHeight+'px'}">
    <div class="search" v-if="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button type="button" @click="handleSearch">搜索</button>
      <div id="js-result" v-show="searchKey" class="result"></div>
    </div>
    <div id="js-container" class="map">正在加载数据 ...</div>
  </div>
</template>

<script>
import remoteLoad from "@/utils/remoteLoad.js";
import { MapKey } from "@/config/config";
export default {
  props: ["lat", "lng"],
  data() {
    return {
      linesearch: null,
      mapHeight: 0,
      searchKey: "",
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      map:null
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey === "") {
        this.placeSearch.clear();
      }
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        let mapConfig = {
          zoom: 16,
          cityName: "南昌"
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        let map = new AMap.Map("js-container", mapConfig);
        this.map = map;
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: "南昌",
            map: map,
            panel: "js-result"
          });
        });
        // 启用工具条
        AMap.plugin(["AMap.ToolBar"], function() {
          map.addControl(
            new AMap.ToolBar({
              position: "RB"
            })
          );
        });
      });
    },
    lineSearch() {
      //var busLineName = document.getElementById('BusLineName').value;
      let busLineName = "216";
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      if (!busLineName) return;
      //实例化公交线路查询类，只取回一条路线
      let linesearch;
      if (!linesearch) {
        linesearch = new AMap.LineSearch({
          pageIndex: 1,
          city: "南昌",
          pageSize: 1,
          extensions: "all"
        });
      }
      this.linesearch = linesearch;
      //搜索“536”相关公交线路
      this.linesearch.search(busLineName, (status, result) => {
        this.map.clearMap();
        if (status === "complete" && result.info === "OK") {
          this.lineSearch_Callback(result);
        } else {
          alert(result);
        }
      });
    },
    /*公交路线查询服务返回数据解析概况*/
    lineSearch_Callback(data) {
      var lineArr = data.lineInfo;
      var lineNum = data.lineInfo.length;
      if (lineNum == 0) {
      } else {
        for (var i = 0; i < lineNum; i++) {
          var pathArr = lineArr[i].path;
          var stops = lineArr[i].via_stops;
          var startPot = stops[0].location;
          var endPot = stops[stops.length - 1].location;
          if (i == 0)
            //作为示例，只绘制一条线路
            this.drawbusLine(startPot, endPot, pathArr);
        }
      }
    },
    /*绘制路线*/
    drawbusLine(startPot, endPot, BusArr) {
      console.log(BusArr)
      //绘制起点，终点
      new AMap.Marker({
        map: this.map,
        position: startPot, //基点位置
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
        zIndex: 10
      });
      new AMap.Marker({
        map: this.map,
        position: endPot, //基点位置
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
        zIndex: 10
      });
      //绘制乘车的路线
      let busPolyline = new AMap.Polyline({
        map: this.map,
        path: BusArr,
        strokeColor: "#09f", //线颜色
        strokeOpacity: 0.8, //线透明度
        isOutline: true,
        outlineColor: "white",
        strokeWeight: 6 //线宽
      });
      this.map.setFitView();
    }
  },
  async created() {
    let screen = window.screen.height;
    this.mapHeight = screen;
    if (window.AMap && window.AMapUI) {
      this.initMap();
      this.lineSearch();
    } else {
      await remoteLoad(
        `http://webapi.amap.com/maps?v=1.4.4&key=${MapKey}&plugin=AMap.LineSearch`
      );
      await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
      this.initMap();
      this.lineSearch();
    }
  }
};
</script>

<style scoped>
.m-map {
  position: relative;
}
.m-map .map {
  width: 100%;
  height: 100%;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .search button {
  line-height: 27px;
  margin-left: 2px;
  background: #fff;
  border: 1px solid #ccc;
  width: 50px;
  text-align: center;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
</style>