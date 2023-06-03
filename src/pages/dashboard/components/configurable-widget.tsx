import React from 'react';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import BoardItem from '@cloudscape-design/board-components/board-item';
import { WidgetDataType } from '../widgets/interfaces';
import { boardItemI18nStrings } from '../i18n-strings';

interface ConfigurableWidgetProps {
  config: WidgetDataType;
  onRemove: () => void;
  actions?: ReadonlyArray<{ text: string; onClick: () => void }>;
}

export function ConfigurableWidget({ config, onRemove }: ConfigurableWidgetProps) {
  const Wrapper = config.provider ?? React.Fragment;
  return (
    <Wrapper>
      <BoardItem
        header={<config.header />}
        i18nStrings={boardItemI18nStrings}
        settings={
          <ButtonDropdown
            items={[
              { id: 'remove', text: 'Remove' },
            ]}
            ariaLabel="Widget settings"
            variant="icon"
            onItemClick={({ detail }) => {
              if (detail.id === 'remove') {
                onRemove();
              }
            }}
          />
        }
        footer={config.footer && <config.footer />}
      >
        <config.content />
      </BoardItem>
    </Wrapper>
  );
}
