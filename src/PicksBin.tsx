import { Avatar, Paper, Stack, Tooltip, Text } from '@mantine/core';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Check, Dots } from 'tabler-icons-react';
import { PICKS_PER_EVT } from './const';
import { Store } from './Store';
import { AthleticsEvent, DLMeet } from './types';

export const PicksBin = ({ meet, evt }: { meet: DLMeet; evt: AthleticsEvent }) => {
  const { myTeam } = useContext(Store);
  const myTeamPicks = myTeam[meet]?.[evt!] ?? [];

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ATHLETE',
    drop: () => ({ name: 'PicksBin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <Paper ref={drop} shadow="xl" radius="xl" p="xl" withBorder>
      <Stack align="center">
        {myTeamPicks.length ? (
          <Tooltip.Group openDelay={0} closeDelay={100}>
            <Avatar.Group spacing="xs">
              {myTeamPicks.map(({ id, lastName }, i) => {
                return (
                  <Tooltip
                    key={i}
                    withArrow
                    label={`${
                      i === 0 ? 'Event Captain' : i === 1 ? 'Secondary' : 'Backup'
                    }: ${lastName}`}
                    events={{ hover: true, focus: true, touch: true }}
                  >
                    <Avatar
                      size={i === 0 ? 'xl' : i === 1 ? 'lg' : 'md'}
                      src={`img/avatars/${id}_128x128.png`}
                      radius="xl"
                    />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </Tooltip.Group>
        ) : (
          <Text>Select an event captain, secondary pick, and backup pick below</Text>
        )}
        {myTeamPicks.length == PICKS_PER_EVT ? <Check size={30} /> : <Dots size={30} />}
      </Stack>
    </Paper>
  );
};
