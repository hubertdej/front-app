import { Autosuggest, AutosuggestProps } from '@cloudscape-design/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTickers } from '../../api/fetch-tickers';
import { useDebounce } from '../../hooks/use-debounce';

function TickerSearchbar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [options, setOptions] = useState<AutosuggestProps.Options>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickers(debouncedQuery).then(resultsByCategories => {
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
    });
  }, [debouncedQuery]);

  return (
    <Autosuggest
      onChange={({ detail }) => setQuery(detail.value)}
      onSelect={({ detail }) => navigate(`/stock/${detail.value}`)}
      value={query}
      options={options}
      enteredTextLabel={value => `Use: ${value}`}
      placeholder='Search for a name or ticker'
      empty='No matches found'
    />
  );
}

export default TickerSearchbar;
