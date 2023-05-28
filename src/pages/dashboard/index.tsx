import React, { useState } from 'react';
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
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { WidgetPlacement } from './widgets/interfaces';

const splitPanelMaxSize = 360;

type Params = {
  dashboardId:string
};

export async function loader({ params } : LoaderFunctionArgs) {
  const dashboardId = params.dashboardId;
  return { dashboardId };
}

const defaultLayoutStore = new Map<string, ReadonlyArray<WidgetPlacement>>([
  ['1', getDefaultLayout()],
  ['2', getDefaultLayout()],
  ['3', getDefaultLayout()],
]);

function Dashboard() {
  const { dashboardId } = useLoaderData() as Params;
  const [layoutStore, setLayoutStore] = useState<Map<string, ReadonlyArray<WidgetPlacement>>>(defaultLayoutStore);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useState(splitPanelMaxSize);

  const updateLayoutStore = (id: string, layout: ReadonlyArray<WidgetPlacement>) => {
    setLayoutStore(new Map(layoutStore).set(dashboardId, layout));
  };

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
                            Dashboard {dashboardId}
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
                        items={getBoardWidgets(layoutStore.get(dashboardId) || getDefaultLayout())}
                        onItemsChange={({ detail }) => {
                          updateLayoutStore(dashboardId, exportLayout(detail.items));
                        }}
                        renderItem={(item, actions) => (
                          <ConfigurableWidget config={item.data} onRemove={actions.removeItem} />
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
                  <Palette items={getPaletteWidgets(layoutStore.get(dashboardId) || getDefaultLayout())} />
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
