import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { ActionIcon, Text } from '@mantine/core';

export default function DarkMode(props) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ zIndex: 999, position: 'fixed', top: 10, right: 12 }}>
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
