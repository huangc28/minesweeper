const generateBoardDOM = width => {
  const el = document.createElement('div')
  el.className = 'board'
  el.style.display = 'inline-block'
  return el
}

export default generateBoardDOM
