import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { ActionIcon, Text } from '@mantine/core';

export default function DarkContainer(props) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 5, right: 5 }}>
        <ActionIcon
          variant="outline"
          color={checked ? 'teal' : 'teal'}
          onClick={() => setChecked(!checked)}
          title="Endre fargemodus"
        >
          {checked ? (
            <Text fw={750} fz={22} align="center">
              ☽
            </Text>
          ) : (
            <Text fw={750} fz={22} align="center">
              ☼
            </Text>
          )}
        </ActionIcon>
      </div>
      <MantineProvider
        theme={{ colorScheme: checked ? 'dark' : 'light' }}
        withGlobalStyles
        withNormalizeCSS
      >
        {props.prop}
      </MantineProvider>
    </div>
  );
}
