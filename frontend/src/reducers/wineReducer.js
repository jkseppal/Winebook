import wineService from '../services/wines'

const wineReducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT_WINES':
      return action.data
    case 'NEW_WINE':
      return [...state, action.data]
    default:
      return state
  }
}

export const createWine = content => {
  return async dispatch => {
    const newWine = await wineService.addWine(content)
    dispatch ({
      type: 'NEW_WINE',
      data: newWine
    })
  }
}

export const initializeWines = () => {
  return async dispatch => {
    const wines = await wineService.getWines()
    dispatch ({
      type: 'INIT_WINES',
      data: wines
    })
  }
}

export default wineReducer