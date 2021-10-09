import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, StateType} from '../types/common-types'

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()