import React from 'react';
import { Box, Header } from '@cloudscape-design/components';
import { WidgetConfig } from './interfaces';

export const sampleWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 1 },
  data: {
    title: 'Sample title',
    description: 'Sample description',
    header: () => <Header>Sample header</Header>,
    content: () => <Box>Sample content</Box>,
    footer: () => <Box>Sample footer</Box>,
  },
};
