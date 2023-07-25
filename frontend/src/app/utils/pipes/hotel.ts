import { TMeal } from '@api/ratehawk/interface/utils'

export const pipeMeal = (meal: TMeal): string => {
  let val: string = meal
  switch (meal) {
    case 'breakfast':
      val = 'desayuno'
      break
    case 'lunch':
      val = 'almuerzo'
      break
    case 'dinner':
      val = 'cena'
      break
    case 'all-inclusive':
      val = 'todo'
      break
    case 'unspecified':
      val = 'comida no especificada'
      break
    default:
  }

  return val
}
