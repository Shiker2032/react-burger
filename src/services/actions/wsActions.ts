export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";

interface IWsConnectionStartAction {
  type: typeof WS_CONNECTION_START;
  payload: string;
}

export const wsConnectionStart = (url: string): IWsConnectionStartAction => ({
  type: WS_CONNECTION_START,
  payload: url,
});

interface IWsConnectionCloseAction {
  type: typeof WS_CONNECTION_CLOSED;
}

export const wsConnectionClose = (): IWsConnectionCloseAction => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onClose: WS_CONNECTION_CLOSED,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
