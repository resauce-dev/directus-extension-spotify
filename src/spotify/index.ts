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
			field: 'text',
			name: 'Text',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
			},
		},
	],
	minWidth: 12,
	minHeight: 10,
})