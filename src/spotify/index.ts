import { definePanel } from '@directus/extensions-sdk'
import PanelComponent from './panel.vue'

export default definePanel({
	id: 'directus-spotify',
	name: 'Google Spotify',
	icon: 'library_music',
	description: 'Control your spotify from within Directus, there\'s no need to leave the interface now!',
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