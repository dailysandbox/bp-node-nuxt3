import NProgress from 'nprogress';

const GlobalSpinner = {
	show: () => {
		NProgress.start();
	},
	hide: () => {
		NProgress.done();
	}
};

export default GlobalSpinner;
