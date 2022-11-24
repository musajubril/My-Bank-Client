
    
    export default function Tabs({tabs, tab: currentTab, setTab}) {
        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
          }
    return (
      <div className="my-2">
        <div className="block">
          <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <div
                key={tabIdx}
                onClick={()=>setTab(tab)}
                className={classNames(
                  tab===currentTab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                  tabIdx === 0 ? 'rounded-l-lg' : '',
                  tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                  'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                )}
                aria-current={tab===currentTab ? 'page' : undefined}
              >
                <span>{tab}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab===currentTab ? 'bg-indigo-500' : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5'
                  )}
                />
              </div>
            ))}
          </nav>
        </div>
      </div>
    )
  }
  