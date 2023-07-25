import { ChangeEvent, useState } from 'react'

export const useCheckList = (list: Array<any>) => {
  const [checkList, setCheckList] = useState<Set<string>>(new Set())
  const [isCheckedAll, setIsChekedAll] = useState<boolean>(false)

  const handleChange = ({
    target: { checked, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (list && list.length - 1 === checkList.size) {
      setIsChekedAll(true)
    } else {
      setIsChekedAll(false)
    }

    if (checked === true) {
      setCheckList((prev) => new Set([...prev, value]))
    } else {
      setCheckList(
        (prev) => new Set([...prev].filter((item) => item !== value))
      )
    }
  }

  const resetCheckList = () => setCheckList(new Set())

  const resetCheckAll = () => setIsChekedAll(false)

  const handleChangeMain = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setIsChekedAll((prev) => !prev)

    if (checked && list) {
      const data = list.map((item) => JSON.stringify(item))
      setCheckList((prev) => new Set([...prev, ...data]))
    } else {
      setCheckList(new Set())
    }
  }

  return {
    handleChange,
    handleChangeMain,
    isCheckedAll,
    checkList,
    resetCheckList,
    resetCheckAll,
  }
}
