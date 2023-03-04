import { Avatar } from '@mantine/core';
import type { CSSProperties, FC } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDragLayer } from 'react-dnd';
import { Entrant } from './types';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export interface CustomDragLayerProps {}

export const CustomDragLayer: FC<CustomDragLayerProps> = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer<{
    item: { name: string; entrant: Entrant; avatar: string };
    itemType: string | symbol | null;
    isDragging: boolean;
    initialOffset: XYCoord | null;
    currentOffset: XYCoord | null;
  }>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    switch (itemType) {
      case 'ATHLETE':
        return <Avatar size={128} radius={128} bg="gray" src={item.avatar} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>{renderItem()}</div>
    </div>
  );
};
