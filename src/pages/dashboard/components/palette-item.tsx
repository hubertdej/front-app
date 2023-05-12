import React from 'react';
import Header from '@cloudscape-design/components/header';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Box from '@cloudscape-design/components/box';
import { EmptyState } from '../../../components/empty-state';
import { boardItemI18nStrings } from '../i18n-strings';

interface PaletteItemProps {
  title: string;
  description: string;
  showPreview: boolean;
}

export function PaletteItem({ title, description, showPreview }: PaletteItemProps) {
  return (
    <BoardItem header={<Header headingTagOverride="h3">{title}</Header>} i18nStrings={boardItemI18nStrings}>
      {showPreview ? (
        <EmptyState
          title={title}
          description={description}
          verticalCenter={true}
        />
      ) : (
        <Box variant="p">{description}</Box>
      )}
    </BoardItem>
  );
}
