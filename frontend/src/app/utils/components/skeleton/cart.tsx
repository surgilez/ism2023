export const SkeletonCart = () => (
  <div className="flex flex-col gap-8">
    {new Array(4).fill({}).map((_, i) => (
      <div
        key={i}
        className="w-full flex flex-col md:flex-row gap-4 bg-base-100 p-4 rounded-xl"
      >
        <div className="skeleton-box rounded-xl h-[240px] w-full md:w-[350px] lg:w-[450px]" />
        <div className="flex flex-col gap-2 w-full">
          <div className="skeleton-box w-full md:h-[40px] md:w-1/2 rounded-lg" />
          <div className="skeleton-box w-1/2 md:w-1/3 md:h-[20px] rounded-lg" />
          <div className="skeleton-box w-1/3 rounded-lg" />
        </div>
        <div className="skeleton-box w-[80%] md:w-1/3 rounded-xl h-[100px]" />
      </div>
    ))}
  </div>
)
