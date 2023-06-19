import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFinancialStatement } from '../api/fetchFinancialStatement';
import { FinancialStatement } from '../api/types';
import { AppLayout, BreadcrumbGroup, Container, ContentLayout, Table, Tabs } from '@cloudscape-design/components';


const BALANCE_SHEET = 'balance-sheet';
const INCOME_STATEMENT = 'financials';
const CASH_FLOW = 'cash-flow';

export async function loader({ params }: LoaderFunctionArgs) {
  const ticker = params.ticker;
  return { ticker };
}

function StatementTableContent(props: { statement: FinancialStatement }) {
  const statement = props.statement;
  const indexes = Object.keys(statement);
  if (indexes.length == 0) {
    return <></>;
  }
  const periods = Object.keys(statement[indexes[0]]);
  const columnNames = ['Item', ...periods];
  const columnDefinitions = columnNames.map(name => ({
    id: name,
    header: name,
    cell: (item: any) => (name == 'Item' ? item.index : item[name]),
    isRowHeader: name == 'Item',
  }));
  const items = indexes.map(index => ({ ...statement[index], index: index }) );

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={items}
      stickyColumns={{ first: 1, last: 0 }}
    />
  );
}

function StatementTable(props: { ticker: string, statementName: string }) {
  const [statement, setStatement] = useState<FinancialStatement>({});
  useEffect(() => {
    fetchFinancialStatement(props.ticker, props.statementName).then(setStatement);
  }
  , [props.ticker, props.statementName]);

  return (
    <StatementTableContent statement={statement} />
  );
}

function FinancialsContent( props: { ticker: string } ) {

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'App', href: '/' },
            { text: 'Financials', href: '/financials' },
          ]}
        />
      }
      navigationHide={true}
      toolsHide={true}
      content={
        <ContentLayout>
          <Container>
            <Tabs tabs={[
              {
                label: 'Income Statement',
                id: 'income-statement',
                content: <StatementTable ticker={props.ticker} statementName={INCOME_STATEMENT} />,
              },
              {
                label: 'Balance Sheet',
                id: 'balance-sheet',
                content: <StatementTable ticker={props.ticker} statementName={BALANCE_SHEET} />,
              },
              {
                label: 'Cash Flow',
                id: 'cash-flow',
                content: <StatementTable ticker={props.ticker} statementName={CASH_FLOW} />,
              },
            ]}
            />
          </Container>
        </ContentLayout>
      }
    />
  );
}

function Financials() {
  const { ticker } = useLoaderData() as { ticker: string };
  return (
    <div key={ticker}>
      <FinancialsContent ticker={ticker}/>
    </div>
  );
}

export default Financials;
