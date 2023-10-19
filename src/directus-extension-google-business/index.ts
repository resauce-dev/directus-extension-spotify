import { definePanel } from '@directus/extensions-sdk'
import PanelComponent from './panel.vue'

export default definePanel({
	id: 'directus-extension-google-business',
	name: 'Google Business',
	icon: 'Storefront',
	description: 'Manage your Google Business in the same place you manage your business.',
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
	minHeight: 8,
})