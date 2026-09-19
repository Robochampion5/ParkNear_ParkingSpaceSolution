import { MotionDiv } from '@/components/motion-div';
import { useState } from 'react';

type FlaggedItem = {
  id: string;
  title: string;
  detail: string;
  resolved: boolean;
};

const mockFlaggedItems: FlaggedItem[] = [
  {
    id: '1',
    title: 'Host Reliability Concern',
    detail: 'Facility: MG Road Complex • Issue: Schedule discrepancy',
    resolved: false,
  },
  {
    id: '2',
    title: 'Overstay Dispute',
    detail: 'User: John D. • Facility: UB City Lot',
    resolved: false,
  },
  {
    id: '3',
    title: 'Payment Dispute',
    detail: 'User: Jane Smith • Facility: Koramangala Office Complex',
    resolved: false,
  },
];

export function FlaggedQueue() {
  const [items, setItems] = useState(mockFlaggedItems);

  const toggleResolved = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  return (
    <MotionDiv
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/50 rounded-xl p-5 border border-border/50">
        <h3 className="font-semibold mb-4">Flagged for Review</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Items requiring attention from hosts or renters
        </p>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`
                bg-card/70 rounded-lg p-4 border border-border/50
                flex flex-col items-start
                ${item.resolved ? 'border-fresh-teal/50' : 'border-warm-amber/50'}
              `}
            >
              <div className="flex w-full justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-deep-navy">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <button
                  onClick={() => toggleResolved(item.id)}
                  className={`
                    px-3 py-1 text-xs rounded-full
                    ${item.resolved
                      ? 'bg-fresh-teal/20 text-fresh-teal border border-fresh-teal/30'
                      : 'bg-warm-amber/20 text-warm-amber border border-warm-amber/30'}
                    transition-colors hover:opacity-90
                  `}
                >
                  {item.resolved ? 'Resolved' : 'Review'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionDiv>
  );
}