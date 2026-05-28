import { Scroller, Tabs } from '@mantine/core'
import { DepositGradients, LocationGradients } from '../constants/locations'

export default function DepositTabs({ deposits, selectedDepositId, onSelectDeposit, locationId }) {
  return (
    <Tabs
      value={selectedDepositId}
      onChange={id => onSelectDeposit(deposits.find(d => d.id === id))}
    >
      <Tabs.List style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
        <Scroller>
          {deposits.map(dep => {
            const gradient = DepositGradients[dep.id] ?? LocationGradients[locationId]
            const isActive = dep.id === selectedDepositId
            return (
              <Tabs.Tab
                key={dep.id}
                value={dep.id}
                style={{
                  whiteSpace: 'nowrap',
                  borderImage: isActive && gradient ? `${gradient} 0 0 1 0` : undefined,
                }}
              >
                {dep.name}
              </Tabs.Tab>
            )
          })}
        </Scroller>
      </Tabs.List>
    </Tabs>
  )
}
