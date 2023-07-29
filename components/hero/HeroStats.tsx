import { FC, ReactNode } from 'react'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import { formatNumber } from 'lib/numbers'
import FormatCrypto from 'components/FormatCrypto'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'

const API_BASE =
  process.env.NEXT_PUBLIC_RESERVOIR_API_BASE || 'https://api.reservoir.tools'

type Currency = NonNullable<
  NonNullable<
    NonNullable<ReturnType<typeof useCollections>['data']>[0]['topBid']
  >['price']
>['currency']

type Props = {
  count: number
  topOffer: number | undefined
  topOfferCurrency: Currency
  topOfferSource: string | undefined
  floor: number | undefined
  allTime: number | undefined
  volumeChange: number | undefined
  floorChange: number | undefined
}

const HeroStats: FC<{ stats: Props }> = ({ stats }) => {
  const offerSourceLogo = `${API_BASE}/redirect/sources/${stats.topOfferSource}/logo/v2`

  return (
    <div className="flex min-w-full items-center  space-x-8   ">
      <div className="flex">
        <h4>items</h4>
        <h3 className="reservoir-h6  ml-2 dark:text-white">
          {formatNumber(stats.count)}
        </h3>
      </div>
      <div className="flex  ">
        <h4 >Vol</h4>
        <h3 className="reservoir-h6 flex items-center justify-center gap-1 dark:text-white">
          <FormatNativeCrypto
            amount={stats.allTime}
            maximumFractionDigits={2}
          />
        </h3>
      </div>
      <div className="flex">
        <h4 >floor</h4>
        <h3 className="reservoir-h6 flex items-center justify-center gap-1 dark:text-white">
          <FormatNativeCrypto amount={stats.floor} maximumFractionDigits={2} />
          <PercentageChange value={stats.floorChange} />
        </h3>
      </div>
      <div className="flex">
        <h4>top offer</h4>
        <h3 className="reservoir-h6 ml-2 flex items-center dark:text-white">
          {`${stats.topOffer?.toFixed(2)} ETH`}
          <img
            src={offerSourceLogo}
            className="ml-2 h-[18px] w-[20px]"
            alt="offerSourceLogo"
          />
        </h3>
      </div>
    </div>
  )
}

const Stat: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <div className="flex h-20 flex-col items-center justify-center bg-white dark:bg-black md:h-auto">
    {children}
    <p className="mt-1 text-[#A3A3A3]">{name}</p>
  </div>
)

export const PercentageChange: FC<{ value: number | undefined | null }> = ({
  value,
}) => {
  if (value === undefined || value === null) return null

  const percentage = (value - 1) * 100

  if (percentage > 100 || value === 0) {
    return <div className="text-sm text-[#06C270] ">+0.1%</div>
  }

  if (value < 1) {
    return (
      <div className="text-sm text-[#FF3B3B]">{formatNumber(percentage)}%</div>
    )
  }

  if (value > 1) {
    return (
      <div className="text-sm text-[#06C270]">+{formatNumber(percentage)}%</div>
    )
  }

  return null
}

export default HeroStats
