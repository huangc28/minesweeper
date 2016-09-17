const gameoverEvent = (evt, status, timer) => {
  switch (status) {
    case 'win':
      timer.trigger('timer:stop')
      // this.gameStarting = false;
      timer.unbindAll()
      alert('you have won the game.')
      break;
    case 'lose':
    default:
      timer.trigger('timer:stop')
      // this.gameStarting = false;
      timer.unbindAll()
      alert('you have lost the game.')
  }
}

export default gameoverEvent
