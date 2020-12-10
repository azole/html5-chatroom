$(function() {

  // form 
  var email = document.getElementById("email");

  email.addEventListener("input", function (event) {
    // TODO: 利用 setCustomValidity 設定自訂的 email 錯誤訊息
  });

  // 處理圖像
  var $avatarEditor = $('#avatarEditor');
  var $avatarInput = $('#avatarInput');
  var $fileSelect = $('#fileSelect');
  // 裁剪區塊
  var clipRange = document.getElementById('clipRange');

  var canvas = document.getElementById("avatarCanvas");
  // 透過此方法可以取得渲染環境及其繪圖函數
  var ctx = canvas.getContext('2d');

  // 點擊上傳圖片
  $fileSelect.on('click', e => {
    // TODO: 觸發 file input
    return false;
  });

  $avatarInput.change(event => {
    var file = $avatarInput[0].files[0];
    handleImage(file);
  });

  // 拖曳上傳
  var avatarEditor = document.getElementById("avatarEditor");
  avatarEditor.addEventListener("dragenter", e => {
    // TODO: 為了讓 drop 事件生效，這邊要做什麼事？
    e.stopPropagation();
    e.preventDefault();
  });
  avatarEditor.addEventListener("dragover", e => {
    // TODO: 為了讓 drop 事件生效，這邊要做什麼事？
  });
  avatarEditor.addEventListener("drop", dropImage);

  function dropImage(e) {
    e.stopPropagation();
    e.preventDefault();

    // TODO: 要怎麼取得 drop 的資料？
    // var data = ???
    // var file = data.files[0];
    // handleImage(file);
  }

  // 載入圖片
  function handleImage(file) {
    var reader = new FileReader;

    reader.onload = e => {
      // 建立一個新的 image 物件
      var img = new Image();
      // img.setAttribute('crossOrigin', 'anonymous');
      img.addEventListener("load", function() {
        canvas.style.display = "block";
        $('#avatorPlaceholder').hide();

        // TODO: 把圖片放進 canvas 中

        // 移除拖曳上傳的 drop 事件
        avatarEditor.removeEventListener('drop', dropImage);
        // 顯示剪裁功能
        $('#clipBtn').css('display', 'inline-block');
        clipRange.style.display = "block";
      }, false);
      img.src = e.target.result;
      img.width = 600;
      img.height = 600;
    };
    // TODO: 要怎麼讀取圖檔？
    // reader.????
  }

  var initialX, initialY, xOffset = 0, yOffset = 0;
  clipRange.addEventListener('dragstart', e => {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    console.log('initial', initialX, initialY);
  });
  clipRange.addEventListener('dragend', e => {
    xOffset = e.clientX - initialX;
    yOffset = e.clientY - initialY;
    e.target.style.transform = "translate3d(" + xOffset + "px, " + yOffset + "px, 0)"
  });

   // 開始裁剪
   $('#clipBtn').on('click', event => {
    var newImg = new Image;
    newImg.src = canvas.toDataURL("image/png");
    var rangeRect = clipRange.getBoundingClientRect();
    var canvasRect = canvas.getBoundingClientRect();

    // TODO: 利用 canvas 剪裁圖片

    // 停止剪裁
    $('#clipBtn').hide();
    clipRange.style.display = "none";

    // 顯示繪圖工具
    $('.painting').css('display', 'inline-block');
  });

  var isDrawing = false, startX = 0; startY = 0;
  canvas.addEventListener('mousedown', event => {
    // TODO: 設定顏色與線寬
    startX = event.offsetX;
    startY = event.offsetY;
    isDrawing = true;
  });

  canvas.addEventListener('mouseup', event => {
    startX = 0;
    startY = 0;
    isDrawing = false;
  });

  canvas.addEventListener('mousemove', event => {
    if(!isDrawing) {
      return;
    }

    // TODO: 開始繪圖


    startX = event.offsetX;
    startY = event.offsetY;
  });

  // 儲存圖片
  document.getElementById("saveBtn").addEventListener('click', event => {
    // TODO: 儲存圖片
  });

  // 傳送資料到後端
  document.getElementById('createFrm').addEventListener('submit', event => {
    event.preventDefault();
    canvas.toBlob(blob => {
      // TODO: 建立 FormData

      // TODO: 把 FormData 中的 avatar 改為編輯過後的
      
      // TODO: 利用 fetch 上傳資料到後端
      // TODO: 把後端回傳的資料存到 localStorage 中
      
      
      return false;
    });
  });  
});

