import countryList from 'react-select-country-list'

interface ICountry {
  value: string
  label: string
}

export const CountryByCode = (countryCode: string): string => {
  const countries = countryList().getData() as ICountry[]
  const country = countries.find(({ value }) => value === countryCode)

  return country?.label || ''
}
