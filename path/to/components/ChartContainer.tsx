import React from 'react'
import { ChartComponent } from './ChartComponent'
import type { IChartComponentProps } from './ChartComponent'

interface IChartContainerProps {
  config: Omit<IChartComponentProps, 'chartData'>
  dataApi: string
}

export const ChartContainer: React.FC<IChartContainerProps> = ({ config, dataApi }) => {
  const [data, setData] = React.useState<any>(null)
  React.useEffect(() => {
    fetch(dataApi)
      .then(res => res.json())
      .then(json => setData(json))
  }, [dataApi])

  if (!data) return <div>Loading…</div>
  return <ChartComponent {...config} chartData={data} />
} 