let flagCount = 0
const flag = {
  reduct: () => { if (flagCount > 0) flagCount-- },
  increase: () => flagCount++,
  getFlagCount: () => flagCount,
}

export default flag
