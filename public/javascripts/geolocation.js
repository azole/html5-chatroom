$(function() {
  // geolocation
  console.log("start to request geolocation");
  let $geo = $('#geolocation');
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      // TODO: 利用 google map api 查詢國家
    }, error => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          $geo.html("使用者拒絕請求地理資訊");
          break;
        case error.POSITION_UNAVAILABLE:
          $geo.html("地理資訊不可用");
          break;
        case error.TIMEOUT:
          $geo.html("地理資訊請求逾時");
          break;
        case error.UNKNOWN_ERROR:
          $geo.html("請求地理資訊時發生錯誤");
          break;
      }
    });
  } else {
    $geo.html("不支援 geolocation");
  }
});

