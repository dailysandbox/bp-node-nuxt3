import axios from 'axios';
import GlobalSpinner from '@/utils/global-spinner.js';

export default defineNuxtPlugin((NuxtApp) => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.apiUrl;

	axios.defaults.baseURL = apiUrl;
	axios.defaults.withCredentials = false;
	axios.defaults.proxyHeaders = false;

	// before a request is made start the nprogress
	axios.interceptors.request.use((config) => {
		GlobalSpinner.show();

		return config;
	});

	// before a response is returned stop nprogress
	axios.interceptors.response.use(
		(response) => {
			GlobalSpinner.hide();

			return response;
		},
		(error) => {
			GlobalSpinner.hide();

			return Promise.reject(error);
		}
	);

	if (process.client) {
		const token = window.sessionStorage.getItem('user')?.auth;

		if (token)
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	return {
		provide: {
			axios
		}
	};
});
