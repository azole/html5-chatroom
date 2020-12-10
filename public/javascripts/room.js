$(function() {
  let currentSocket;
  let nickname = '';
  $('#joinBtn').on('click', event => {
    nickname = $('#nickname').val()
    $('#name').html(nickname);
    currentSocket = connect(nickname);
  });

  $('#closeBtn').on('click', event => {
    if(currentSocket) {
      currentSocket.close();
    }
    currentSocket = null;
    nickname = '';
    $('#name').html(nickname);
  });

  $('#sendBtn').on('click', event => {
    let msg = $('#message').val();
    console.log(msg);
    if(currentSocket && msg.length > 0) {
      currentSocket.send(JSON.stringify({action: 'send', data: msg }));
      $('#message').val('');
    }
  });

  function connect(nickname) {

    // TODO: 建立 WebSocket 連接
    let socket = null;

    let isConnected = false;
    
    socket.onopen = event => {
      // TODO: 建立連接後傳送以下資料給後端
      // {action: 'add', roomId: room.id, nickname: nickname}
      isConnected = true;
      $('#connect').hide();
      $('#disconnect').show();
    };
    socket.onmessage = event => {
      console.log('onmessage', event.data);
      // TODO: 處理收到的訊息
      
    };
    socket.onclose = event => {
      console.log('onclose', event);
      isConnected = false;
      $('#disconnect').hide();
      $('#connect').show();
    };
    socket.onerror = event => {
      console.log('onerror', event);
      isConnected = false;
      socket.close();
    };
    return socket;
  }
});