import { definePanel } from '@directus/extensions-sdk'
import PanelComponent from './panel.vue'

export default definePanel({
  id: 'directus-spotify',
  name: 'Spotify',
  icon: 'library_music',
  description: 'Control your Spotify music from within Directus!',
  component: PanelComponent,
  options: [
    {
      field: 'apiToken',
      name: 'API Token',
      type: 'text',
      meta: {
        note: 'Retrieve your 1H token from https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started',
        interface: 'input',
        width: 'full',
      },
    },
    {
      field: 'streamName',
      name: 'Friendly Stream Name',
      type: 'string',
      meta: {
        note: 'What name should appear under the cast options in Spotify?',
        interface: 'input',
        width: 'half',
      },
      schema: {
        default_value: 'Directus',
      },
    },
    {
      field: 'allowControls',
      name: 'Allow Controls',
      type: 'boolean',
      meta: {
        note: 'Should the interactive media controls be displayed?',
        width: 'half',
        interface: 'toggle',
        required: true,
      },
      schema: {
        default_value: true,
      },
    },
    {
      field: 'defaultVolume',
      name: 'Default Volume',
      type: 'string',
      meta: {
        note: 'What volume (0-100) should be the default when this player connects?',
        interface: 'slider',
        width: 'full',
      },
      schema: {
        default_value: 50,
      },
    },
  ],
  minWidth: 20,
  minHeight: 6,
})
