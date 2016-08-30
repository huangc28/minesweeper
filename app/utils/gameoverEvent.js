const gameover = (evt, status, timer) => {
  switch (state) {
    case 'win':
      timer.trigger('timer:stop')
      // this.gameStarting = false;
      timer.unbindAll()
      alert('you have won the game')
      break;
    default:
      this._timer.trigger('timer:stop')
      // this.gameStarting = false;
      this._timer.unbindAll()
  }
}

export default gameover
