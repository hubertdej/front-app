import { BoardProps } from '@cloudscape-design/board-components/board';
import { SplitPanelProps } from '@cloudscape-design/components';
import { BoardItemProps, ItemsPaletteProps } from '@cloudscape-design/board-components';

export const boardItemI18nStrings: BoardItemProps.I18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription: 'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: 'Resize handle',
  resizeHandleAriaDescription: 'Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.',
};

interface WithTitle {
  title: string
}

function createAnnouncement(
  operationAnnouncement: string,
  conflicts: ReadonlyArray<BoardProps.Item<WithTitle>>,
  disturbed: ReadonlyArray<BoardProps.Item<WithTitle>>,
) {
  const conflictsAnnouncement = conflicts.length > 0
    ? `Conflicts with ${conflicts.map(c => c.data.title).join(', ')}.`
    : '';
  const disturbedAnnouncement = disturbed.length > 0
    ? `Disturbed ${disturbed.length} items.`
    : '';
  return [operationAnnouncement, conflictsAnnouncement, disturbedAnnouncement]
    .filter(Boolean)
    .join(' ');
}

export const boardI18nStrings: BoardProps.I18nStrings<WithTitle> = {
  liveAnnouncementDndStarted: operationType => {
    return operationType === 'resize' ? 'Resizing' : 'Dragging';
  },
  liveAnnouncementDndItemReordered: operation => {
    const column = `column ${operation.placement.x + 1}`;
    const row = `row ${operation.placement.y + 1}`;
    return createAnnouncement(
      `Item moved to ${operation.direction === 'horizontal' ? column : row}.`,
      operation.conflicts,
      operation.disturbed,
    );
  },
  liveAnnouncementDndItemResized: operation => {
    const columnsConstraint = operation.isMinimalColumnsReached ? ' (minimal)' : '';
    const rowsConstraint = operation.isMinimalRowsReached ? ' (minimal)' : '';
    const sizeAnnouncement = operation.direction === 'horizontal'
      ? `columns ${operation.placement.width}${columnsConstraint}`
      : `rows ${operation.placement.height}${rowsConstraint}`;
    return createAnnouncement(
      `Item resized to ${sizeAnnouncement}.`,
      operation.conflicts,
      operation.disturbed,
    );
  },
  liveAnnouncementDndItemInserted: operation => {
    const column = `column ${operation.placement.x + 1}`;
    const row = `row ${operation.placement.y + 1}`;
    return createAnnouncement(
      `Item inserted to ${column}, ${row}.`,
      operation.conflicts,
      operation.disturbed,
    );
  },
  liveAnnouncementDndCommitted: operationType => {
    return `${operationType} committed`;
  },
  liveAnnouncementDndDiscarded: operationType => {
    return `${operationType} discarded`;
  },
  liveAnnouncementItemRemoved: operation => {
    return createAnnouncement(
      `Removed item ${operation.item.data.title}.`,
      [],
      operation.disturbed,
    );
  },
  navigationAriaLabel: 'Board navigation',
  navigationAriaDescription: 'Click on non-empty item to move focus over',
  navigationItemAriaLabel: item => {
    return item ? item.data.title : 'Empty';
  },
};

export const splitPanelI18nStrings: SplitPanelProps.I18nStrings = {
  preferencesTitle: 'Split panel preferences',
  preferencesPositionLabel: 'Split panel position',
  preferencesPositionDescription: 'Choose the default split panel position for the service.',
  preferencesPositionSide: 'Side',
  preferencesPositionBottom: 'Bottom',
  preferencesConfirm: 'Confirm',
  preferencesCancel: 'Cancel',
  closeButtonAriaLabel: 'Close panel',
  openButtonAriaLabel: 'Open panel',
  resizeHandleAriaLabel: 'Resize split panel',
};

export const paletteI18nStrings: ItemsPaletteProps.I18nStrings<WithTitle> = {
  navigationAriaLabel: 'Items palette navigation',
  navigationAriaDescription: 'Click on an item to move focus over',
  navigationItemAriaLabel: item => item.data.title,
  liveAnnouncementDndStarted: 'Dragging',
  liveAnnouncementDndDiscarded: 'Insertion discarded',
};

export function getTextFilterCounterText(count: number) {
  return `${count} ${count === 1 ? 'match' : 'matches'}`;
}
