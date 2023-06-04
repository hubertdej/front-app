import { ReactNode } from 'react';
import { Box, SpaceBetween } from '@cloudscape-design/components';
import styles from './styles.module.scss';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  verticalCenter?: boolean;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action, verticalCenter }: EmptyStateProps) {
  return (
    <div className={verticalCenter ? styles.verticalCenter : ''}>
      <Box margin={{ vertical: 'xs' }} textAlign="center" color="text-body-secondary">
        <SpaceBetween size="xxs">
          <div>
            <Box variant="strong" color="inherit">
              {title}
            </Box>
            <Box variant="p" color="inherit">
              {description}
            </Box>
          </div>
          {action}
        </SpaceBetween>
      </Box>
    </div>
  );
}
