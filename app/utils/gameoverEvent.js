const gameover = (evt, status, timer) => {
  switch (state) {
    case 'win':
      timer.trigger('timer:stop')
      // this.gameStarting = false;
      timer.unbindAll()
      alert('you have won the game')
      break;
    default:
      timer.trigger('timer:stop')
      // this.gameStarting = false;
      timer.unbindAll()
  }
}

export default gameover
