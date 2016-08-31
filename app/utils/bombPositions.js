let bombPositions = {}

const positionMap = {
  save: (newPositions) => {
    bombPositions = newPositions
    return newPositions
  },
  load: () => bombPositions,
}

export default positionMap
