import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayGround from '../components/PlayGround';
import OtherPlayGrounds from '../components/OtherPlayGrounds';
import Chat from '../components/Chat';
import Actions from '../store/modules'
import gameAPI from '../api/gamePlay';
import SocketClient from '../lib/SocketClient';

class PlayGroundContainer extends Component {

  constructor(props) {
    super(props);
    this.broadcastActions = this.props.BroadCastActions();
    this.playGroundActions = this.props.PlayGroundActions();
    SocketClient.addEventOn = SocketClient.addEventOn.bind(this);
    
    SocketClient.addEventOn('gameData', (response) => {
      this.broadcastActions.allGroundData(response)
  });
  }

  handlePlayerKeyDown = (keyCode) => {
    this.playGroundActions.playerKeyDown(keyCode);
    this.playGroundActions.gameStart(() => this.playGroundActions.playerKeyDown('ArrowDown'));
  }

  handleGameStart = () => {
    this.playGroundActions.gameStart();
  }

  componentDidMount() {
    gameAPI.join().then((response) => {
      this.playGroundActions.userInfo(response.data);
    }).catch(err => {
        console.error(err);
    })
  }

  componentWillUpdate(nextProps) {
    if(nextProps.downStop) {
      console.dir(nextProps);
      SocketClient.sendMessage('gameData', {
        userId: nextProps.userInfo.id,
        gameData: nextProps.gameGroundData
      });
    }
  }

  render() {
    const { handlePlayerKeyDown, handleGameStart, broadcastActions } = this;
    const { gameGroundData, playerBlocks, userInfo, chattingMessages, allGroundData} = this.props;

    return (
      <div>
        <PlayGround
          gameGroundData={gameGroundData}
          playerBlocks={playerBlocks}
          userInfo={userInfo}
          onPlayerKeyDown = {handlePlayerKeyDown}
          onGameStart = {handleGameStart}
        />
        <Chat userInfo={userInfo} chattingMessages={chattingMessages} broadcastActions={broadcastActions}/>
        <OtherPlayGrounds allGroundData={allGroundData}/>
      </div>
      
    );
  }
}

export default connect(
  (state) => ({ 
    gameGroundData: state.playGround.gameGroundData,
    playerBlocks: state.playGround.playerBlocks,
    userInfo: state.playGround.userInfo,
    downStop: state.playGround.downStop,
    chattingMessages: state.broadcast.chattingMessages,
    allGroundData: state.broadcast.allGroundData
  }),
  (dispatch) => ({
    PlayGroundActions: () => bindActionCreators(Actions.playGround, dispatch),
    BroadCastActions: () => bindActionCreators(Actions.broadcast, dispatch)
  })
)(PlayGroundContainer);