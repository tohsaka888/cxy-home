import { createContext, Dispatch, SetStateAction } from 'react'

type Props = {
  list: Competition.List[];
  setList: Dispatch<SetStateAction<Competition.List[]>>
}

export const ListContext = createContext<Props | null>(null)