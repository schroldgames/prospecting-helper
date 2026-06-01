import { useEffect, useRef } from 'react'
import { Tabs } from '@mantine/core'
import { DepositGradients, LocationGradients } from '../../constants/locations'
import type { Deposit } from '../../types'

interface DepositTabsProps {
  deposits: Deposit[]
  selectedDepositId: string | undefined
  onSelectDeposit: (deposit: Deposit) => void
  locationId: string | undefined
}

export default function DepositTabs({ deposits, selectedDepositId, onSelectDeposit, locationId }: DepositTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !selectedDepositId) return
    const tab = container.querySelector(`[data-deposit-id="${selectedDepositId}"]`)
    if (!tab) return
    const cRect = container.getBoundingClientRect()
    const tRect = tab.getBoundingClientRect()
    if (tRect.left < cRect.left) {
      container.scrollBy({ left: tRect.left - cRect.left - 8, behavior: 'smooth' })
    } else if (tRect.right > cRect.right) {
      container.scrollBy({ left: tRect.right - cRect.right + 8, behavior: 'smooth' })
    }
  }, [selectedDepositId])

  return (
    <Tabs
      value={selectedDepositId}
      onChange={id => {
        const deposit = deposits.find(d => d.id === id)
        if (deposit) onSelectDeposit(deposit)
      }}
    >
      <div ref={scrollRef} className="scrollbar-none" style={{ overflowX: 'auto' }}>
        <Tabs.List style={{ flexWrap: 'nowrap' }}>
          {deposits.map(dep => {
            const gradient = DepositGradients[dep.id] ?? (locationId ? LocationGradients[locationId] : undefined)
            const isActive = dep.id === selectedDepositId
            return (
              <Tabs.Tab
                key={dep.id}
                value={dep.id}
                data-deposit-id={dep.id}
                style={{
                  whiteSpace: 'nowrap',
                  borderImage: isActive && gradient ? `${gradient} 0 0 1 0` : undefined,
                }}
              >
                {dep.name}
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
      </div>
    </Tabs>
  )
}
