import { Autosuggest, AutosuggestProps } from '@cloudscape-design/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTickers } from '../../api/fetch-tickers';

function TickerSearchbar() {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<AutosuggestProps.Options>([]);
  const navigate = useNavigate();

  return (
    <Autosuggest
      onChange={({ detail }) => setQuery(detail.value)}
      onSelect={({ detail }) => navigate(`/${detail.selectedOption?.labelTag == 'Financials' ? 'financials' : 'stock'}/${detail.value}`)}
      onLoadItems={async ({ detail }) => {
        const resultsByCategories = await fetchTickers(detail.filteringText);
        const resultOptions = Object.entries(resultsByCategories).map<AutosuggestProps.OptionGroup>(([category, results]) => {
          if (category === 'Equities') {
            return {
              label: category,
              options: results.flatMap<AutosuggestProps.Option>(({ symbol, name }) => [
                {
                  label: `${name}`,
                  labelTag: 'Overview',
                  value: symbol,
                  tags: [symbol],
                },
                {
                  label: `${name}`,
                  labelTag: 'Financials',
                  value: symbol,
                  tags: [symbol],
                },
              ]),
            };
          } else {
            return {
              label: category,
              options: results.map<AutosuggestProps.Option>(({ symbol, name }) => ({
                label: name,
                value: symbol,
                tags: [symbol],
              })),
            };
          }
        });
        setOptions(resultOptions);
      }}
      value={query}
      options={options}
      enteredTextLabel={value => `Use: ${value}`}
      placeholder='Search for a name or ticker'
      empty='No matches found'
    />
  );
}

export default TickerSearchbar;
