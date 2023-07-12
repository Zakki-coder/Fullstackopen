import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
    const anecdotesReducer = useSelector(store => store.anecdotes)
    const filterReducer = useSelector(store => store.filter)

  const handleChange = (event) => {
    dispatch(filter(event.target.value))
    // input-kentän arvo muuttujassa event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
