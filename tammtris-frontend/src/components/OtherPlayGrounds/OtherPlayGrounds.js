import React, { Component } from 'react';
import styles from './OtherPlayGrounds.scss';
import classNames from 'classnames/bind';
import PlayGround from '../PlayGround';
import NextBlocksContainer from '../../containers/NextBlocksContainer';

const cx = classNames.bind(styles);

class OtherPlayGrounds extends Component {
  renderPlayGround = (allGroundData) => {
    return allGroundData.map((gameGroundData, idx) => (
      <div className={cx('other-play-grounds-item')} key={idx}>
        <PlayGround 
          key={idx} 
          userIndex={gameGroundData.number}
          gameGroundData={gameGroundData && gameGroundData.gameData} 
          userInfo={gameGroundData && gameGroundData} 
          gameState={gameGroundData && gameGroundData.gameState}
          gameItems={gameGroundData && gameGroundData.gameItems}
          view='view'/>
      </div>
      )
    )
  }

  render() {
    const { allGroundData, PlayGroundContainer } = this.props;
    return (
      <div className={cx('other-play-grounds')}> 
        { this.renderPlayGround(allGroundData) }
        <div className={cx('next-shapes')}>
          <NextBlocksContainer/>
        </div>
        <div className={cx('myplayground')}>
          <PlayGroundContainer/>
        </div>
      </div>
    );
  }
};

export default OtherPlayGrounds;