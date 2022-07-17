const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
ws.onopen = () => {
  console.log("соединение установлено");
};
