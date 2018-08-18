import React, { Component } from 'react'
import styles from './WaitingRoom.scss';
import classnames from 'classnames/bind';
import GameRoom from '../GameRoom';

const cx = classnames.bind(styles);

export default class WaitingRoom extends Component {
	renderRoom({ title, players}, number) {
		return (
			<div className={cx('waiting-area-room')}>
				<GameRoom title={title} players={players} number={number}/>
			</div>
		)
	}

  render() {
		const { renderRoom } = this;
		const { waitingRoomData } = this.props;
    return (
			<div className={cx('waiting-room-area')}>
				{waitingRoomData.roomList.map((room, index) => renderRoom(room, index + 1))}
			</div>
    );
  }
}
