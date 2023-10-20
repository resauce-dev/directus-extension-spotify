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
				note: 'When you want to cast from Spotify, what name should appear under the cast options?',
				interface: 'input',
				width: 'full',
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
				note: 'Should the media controls be displayed, or should it only show the media information.',
				interface: 'toggle',
				width: 'full',
			},
			schema: {
				default_value: true,
			},
		},
		{
			field: 'defaultVolume',
			name: 'Allow Controls',
			type: 'string',
			meta: {
				note: 'What volume (0-100) should be the default when this player is connected to?',
				interface: 'string',
				width: 'full',
			},
			schema: {
				default_value: 0,
			},
		},
	],
	minWidth: 20,
	minHeight: 22,
})