import { setUsersFilterChat } from '@redux/actions/chat'
import { Redux } from '@redux/interfaces/redux'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const SearchUsersChat = () => {
  const [valueForm, setValue] = useState({
    search: '',
  })

  const dispatch = useDispatch()

  const { users } = useSelector((i: Redux) => i.chat)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    const search = value.toLocaleLowerCase()

    const newUsers = users?.filter(
      (user) =>
        user.person.name.trim().toLowerCase().includes(search) ||
        user.person.lastName.trim().toLowerCase().includes(search)
    )

    dispatch(setUsersFilterChat(newUsers as any))

    setValue((val) => ({
      ...val,
      [name]: value,
    }))
  }

  return (
    <div className="w-full px-2">
      <div className="w-full my-4 flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Ingrese nombre"
          className="w-full input input-sm input-bordered"
          value={valueForm.search}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
