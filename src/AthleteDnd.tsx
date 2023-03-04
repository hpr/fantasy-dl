import {
  Avatar,
  createStyles,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useContext } from 'react';
import { Check, Dots } from 'tabler-icons-react';
import { AthleteCard } from './AthleteCard';
import { PICKS_PER_EVT } from './const';
import { Store } from './Store';
import { AthleticsEvent, DLMeet, Entries } from './types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PicksBin } from './PicksBin';
import { CustomDragLayer } from './CustomDragLayer';

export const AthleteDnd = ({
  entries,
  evt,
  meet,
}: {
  entries: Entries;
  evt: AthleticsEvent;
  meet: DLMeet;
}) => {
  const { myTeam } = useContext(Store);
  return (
    <DndProvider backend={HTML5Backend}>
      <PicksBin meet={meet} evt={evt} />
      <CustomDragLayer />
      <Title order={1}>{evt}</Title>
      {/* Event time:{' '}
{new Date(entries?.[meet]?.[evt!]?.date!).toLocaleTimeString().replace(':00 ', ' ')} */}
      <SimpleGrid
        cols={8}
        breakpoints={[
          { maxWidth: 'sm', cols: 2 },
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'lg', cols: 5 },
          { maxWidth: 'xl', cols: 7 },
        ]}
      >
        {entries?.[meet]?.[evt!]?.entrants.map((entrant, i) => {
          const { id, firstName, lastName, pb, sb, nat } = entrant;
          return (
            <AthleteCard
              key={id}
              avatar={`img/avatars/${id}_128x128.png`}
              meet={meet}
              event={evt!}
              entrant={entrant}
              name={`${firstName} ${lastName}`}
              job={nat}
              stats={[
                { label: 'PB', value: pb! },
                { label: 'SB', value: sb! },
              ].filter((x) => x.value)}
            />
          );
        })}
      </SimpleGrid>
    </DndProvider>
  );
};
