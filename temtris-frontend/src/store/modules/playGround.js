import { createAction, handleActions } from 'redux-actions';
import GameDataManager, { GAME_STATE } from 'utils/gameDataManager';
import shapeDataManager from 'utils/shapeDataManager';
import mapDataManager from 'utils/mapDataManager';

// actions types

const PLAYER_KEY_DOWN = 'gamePlay/PLAYER_KEY_DOWN';
const GAME_START = 'gamePlay/GAME_START';
const GAME_OVER = 'gamePlay/GAME_OVER';
const GAME_RESULT = 'gamePlay/RESULT';
const GAME_ITEM_USE = 'gamePlay/ITEM_USE';

// action creator
export const playerKeyDown = createAction(PLAYER_KEY_DOWN);
export const gameStart = createAction(GAME_START);
export const gameOver = createAction(GAME_OVER);
export const gameResult = createAction(GAME_RESULT);
export const gameItemUse = createAction(GAME_ITEM_USE);

const initialState = {
  gameGroundData: GameDataManager.defaultGameData(),
  playerBlocks: null,
  gameState: GAME_STATE.READY,
  downStop: false,
  gameResult: null,
  gameItems: 'a'.repeat(10).split('').map(item => 0),
}

const gameDataManager = new GameDataManager();

// reducer
export default handleActions({
  [PLAYER_KEY_DOWN]: (state, action) => {
    const { payload: keyCode } = action;
    const { gameGroundData, playerBlocks, downStop, gameState, nextBlocks, gameItems } = gameDataManager.handleKeyPress(keyCode, state);
    return {
      ...state,
      gameGroundData,
      playerBlocks,
      downStop: downStop || state.downStop,
      gameState: gameState || state.gameState,
      nextBlocks: nextBlocks || state.nextBlocks,
      gameItems: gameItems || state.gameItems
    }
  },
  [GAME_START]: (state, action) => {
    const blockGameState = [GAME_STATE.PLAY];
    if(blockGameState.includes(state.gameState)) return state;
    const { autoDown, mapData } = action.payload;
    const tempMap = mapDataManager.getTestMap();
    const gameGroundData = tempMap || GameDataManager.defaultGameData();
    const { playerBlocks, nextBlocks } = shapeDataManager.getNextBlocks();
    GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
    return {
      ...state,
      gameState: gameDataManager.gamePlay.play(autoDown, state.gameState),
      gameGroundData,
      playerBlocks,
      nextBlocks,
      gameResult: null
    }
  },

  [GAME_OVER]: (state, action) => {
    gameDataManager.gamePlay.stop();
    return {
      ...state,
      gameState: GAME_STATE.GAME_OVER
    }
  },
  [GAME_RESULT]: (state, action) => {
    const { payload: gameResult } = action;
    gameDataManager.gamePlay.stop();
    return {
      ...state,
      gameState: GAME_STATE.READY,
      gameResult
    }
  },
  [GAME_ITEM_USE]: (state, action) => {
    const { from, to  } = action.payload;
    let { gameGroundData, playerBlocks } = state;
    GameDataManager.clearPlayerBlocks(gameGroundData, playerBlocks);
    gameGroundData = gameDataManager.itemUse.up(gameGroundData, 3);
    playerBlocks.baseBlock.y = playerBlocks.baseBlock.y - 3 < 3 ? 3 : playerBlocks.baseBlock.y - 3;
    GameDataManager.mergePlayerBlocks(gameGroundData, playerBlocks);
    return {
      ...state,
      gameGroundData
    }
  }
}, initialState);