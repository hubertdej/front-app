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
      onSelect={({ detail }) => navigate(`/stock/${detail.value}`)}
      onLoadItems={async ({ detail }) => {
        const resultsByCategories = await fetchTickers(detail.filteringText);
        setOptions(
          Object.entries(resultsByCategories).map<AutosuggestProps.OptionGroup>(([category, results]) => ({
            label: category,
            options: results.map<AutosuggestProps.Option>(({ symbol, name }) => ({
              label: name,
              value: symbol,
              tags: [symbol],
            })),
          })),
        );
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
