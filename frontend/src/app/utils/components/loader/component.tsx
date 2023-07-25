interface IProps {
  bg?: string
}

export const ComponentLoader = ({ bg = 'bg-[#0c3c61]' }: IProps) => (
  <div className="loader2">
    <div className="lds-ellipsis">
      <div className={bg} />
      <div className={bg} />
      <div className={bg} />
      <div className={bg} />
    </div>
  </div>
)
