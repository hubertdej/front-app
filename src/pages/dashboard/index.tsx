import React, { createContext, useState } from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  ContentLayout,
  Header,
  SpaceBetween,
  SplitPanel,
} from '@cloudscape-design/components';
import { Board } from '@cloudscape-design/board-components';
import { EmptyState } from '../../components/empty-state';
import { boardI18nStrings, splitPanelI18nStrings } from './i18n-strings';
import Palette from './components/palette';
import { ConfigurableWidget } from './components/configurable-widget';
import { exportLayout, getBoardWidgets, getDefaultLayout, getPaletteWidgets } from './widgets';

const splitPanelMaxSize = 360;

type TickerSelection = {
  getSelectedTickers: () => string[];
  updateSelectedTickers: (id: string, tickers: string[]) => void;
};

export const TickerSelectionContext = createContext<TickerSelection | undefined>(undefined);

function Dashboard() {
  const [selectedKeysById, setSelectedKeysById] = useState<Map<string, string[]>>(new Map());

  const getSelectedTickers = () => {
    let allKeys: string[] = [];
    selectedKeysById.forEach((keys) => {
      allKeys = allKeys.concat(keys);
    });
    return Array.from(new Set(allKeys));
  };

  const updateSelectedTickers = (id: string, tickers: string[]) => {
    setSelectedKeysById((prev) => {
      const next = new Map(prev);
      next.set(id, tickers);
      return next;
    });
  };

  const [layout, setLayout] = useState(getDefaultLayout);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useState(splitPanelMaxSize);

  return (
        <AppLayout
            contentType="dashboard"
            breadcrumbs={<BreadcrumbGroup
                items={[
                  { text: 'App', href: '#' },
                  { text: 'Dashboard', href: '#/' },
                ]}
                expandAriaLabel="Show path"
                ariaLabel="Breadcrumbs"
            />}
            navigationHide={true}
            toolsHide={true}
            content={
                <ContentLayout
                    header={
                        <Header
                            variant="h1"
                            actions={
                                <SpaceBetween size="xs" direction="horizontal">
                                    <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
                                        Add widget
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                            Dashboard
                        </Header>
                    }>
                    <Board
                        empty={
                            <EmptyState
                                title="No widgets"
                                description="There are no widgets on the dashboard."
                                verticalCenter={true}
                                action={
                                    <Button iconName="add-plus" onClick={() => setSplitPanelOpen(true)}>
                                        Add widget
                                    </Button>
                                }
                            />
                        }
                        i18nStrings={boardI18nStrings}
                        items={getBoardWidgets(layout)}
                        onItemsChange={({ detail }) => {
                          setLayout(exportLayout(detail.items));
                        }}
                        renderItem={(item, actions) => (
                          <TickerSelectionContext.Provider value={{ getSelectedTickers, updateSelectedTickers }}>
                            <ConfigurableWidget config={item.data} onRemove={actions.removeItem} />
                          </TickerSelectionContext.Provider>
                        )}
                    />
                </ContentLayout>
            }
            splitPanel={
                <SplitPanel
                    header="Add widgets"
                    closeBehavior="hide"
                    hidePreferencesButton={true}
                    i18nStrings={splitPanelI18nStrings}>
                  <Palette items={getPaletteWidgets(layout)} />
                </SplitPanel>
            }
            splitPanelPreferences={{ position: 'side' }}
            splitPanelOpen={splitPanelOpen}
            onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
            splitPanelSize={splitPanelSize}
            onSplitPanelResize={event => setSplitPanelSize(Math.min(event.detail.size, splitPanelMaxSize))}
        />
  );
}

export default Dashboard;
