export default defineNuxtConfig({
	app: {
		rootId: 'app1'
	},
	css: ['@/assets/less/base.less'],
	vite: {
		css: {
			preprocessorOptions: {
				less: {
					// Injects into every LESS file processed by Vite
					additionalData: `@import "@/assets/less/base.less";`
				}
			}
		}
	},
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@primevue/nuxt-module'
	],
	devServer: {
		host: '0.0.0.0',
		port: 3500
	},
	runtimeConfig: {
		public: {}
	},
	ssr: false,
	hooks: {
	    'vite:extendConfig': (config) => {
	      if (typeof config.server!.hmr === 'object') {
	        config.server!.hmr.protocol = 'wss';
	      }
	    },
	},
	routeRules: {
		
	},
	compatibilityDate: '2024-07-12'
});

