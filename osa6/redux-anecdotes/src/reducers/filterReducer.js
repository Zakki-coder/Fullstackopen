const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.payload.word
    default:
      return state
  }
}

export const filter = ( word ) => {
  return {
    type: 'FILTER',
    payload: {
      word
    }
  }
}

export default filterReducer
