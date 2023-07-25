/* eslint-disable no-plusplus */
import { setPageAction } from '@redux/actions/admin/utils'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'

interface IProps {
  totalReg: number
  numPageByReg?: number
  step?: number
}

export const Pagination = ({
  totalReg,
  numPageByReg = 10,
  step = 3,
}: IProps) => {
  const { page } = useSelector((i: Redux) => i.utils)
  const dispatch = useDispatch()
  const [numPag, setNumPag] = useState(1)
  const [arr, setArr] = useState<number[]>([])
  const [action, setAction] = useState<'increment' | 'decrement' | null>(null)
  const [pageSize, setPageSize] = useState((page || 1) - 1)

  useEffect(() => {
    setNumPag(Math.ceil(totalReg / numPageByReg))
  }, [totalReg, numPageByReg, setNumPag])

  useEffect(() => {
    const aux = []
    for (let i = 1; i <= numPag; i++) {
      aux.push(i)
    }
    setArr(aux)
  }, [setArr, numPag])

  useEffect(() => {
    if (page && page !== 1) {
      if ((page - 1) % 3 === 0) {
        setPageSize(page - 1)
      } else if (page % 3 === 0) {
        setPageSize(page - 3)
      }
    }
  }, [action, page, setPageSize])

  return (
    <div className="btn-group">
      <button
        title="Primero"
        type="button"
        className="btn"
        onClick={() => {
          dispatch(setPageAction(1))
          setPageSize(0)
        }}
      >
        <i className="fa-solid fa-angles-left" />
      </button>
      <button
        title="Anterior"
        type="button"
        className="btn"
        onClick={() => {
          if (page && page > 1) {
            setAction('decrement')
            dispatch(setPageAction(page - 1))
          }
        }}
      >
        <i className="fa-solid fa-angle-left" />
      </button>
      {arr.slice(pageSize, pageSize + step).map((item, i) => (
        <button
          title={`Página ${item}`}
          key={i}
          type="button"
          className={`btn ${page === item && 'btn_active_pag'}`}
          onClick={() => dispatch(setPageAction(item))}
        >
          {item}
        </button>
      ))}
      <button
        title="Siguiente"
        type="button"
        className="btn"
        onClick={() => {
          if (page && page < numPag) {
            dispatch(setPageAction(page + 1))
          }
        }}
      >
        <i className="fa-solid fa-angle-right" />
      </button>
      <button
        title="Último"
        type="button"
        className="btn"
        onClick={() => {
          dispatch(setPageAction(numPag))

          if (page && page > step) {
            setPageSize(numPag - step)
          } else {
            setPageSize(numPag - 2)
          }
        }}
      >
        <i className="fa-solid fa-angles-right" />
      </button>
    </div>
  )
}
