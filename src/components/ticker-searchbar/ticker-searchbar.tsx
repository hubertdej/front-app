import { useState } from 'react';
import Autosuggest from '@cloudscape-design/components/autosuggest';
import { useNavigate } from 'react-router-dom';
import data from './sp500-companies.json';


function TickerSearchbar() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  return (
    <Autosuggest
      onChange={({ detail }) => setValue(detail.value)}
      onSelect={({ detail }) => navigate(`/stock/${detail.value}`)}
      value={value}
      options={data.map(obj => ({ value: obj.Name, description: obj.Symbol }))}
      enteredTextLabel={val => `Use: "${val}"`}
      ariaLabel="Search for a name or ticker"
      placeholder="Search for a name or ticker"
      empty="No matches found"
    />
  );
}

export default TickerSearchbar;
