// import { useCallback } from 'react';

// const useAddAlert = () => {
// 	const notistack = useSnackbar();
// 	if (!notistack) {
// 		throw new Error('useAddAlert must be used within a SnackbarProvider');
// 	}
// 	return useCallback(
// 		(message: any, variant: VariantType = 'error') => {
// 			let string = message.message ?? message;
// 			if (typeof string !== 'string') {
// 				console.error('Invalid Message For Alert: ', message);
// 				string = 'Invalid Message For Alert. Check Console For Details';
// 			}
// 			notistack.enqueueSnackbar(
// 				string,
// 				{ variant }
// 			);
// 		},
// 		[notistack]
// 	);
// };

// const useRemoveAlert = () => {
// 	const notistack = useSnackbar();
// 	if (!notistack) {
// 		throw new Error('useRemoveAlert must be used within a SnackbarProvider');
// 	}
// 	return useCallback(
// 		(key: SnackbarKey) => {
// 			notistack.closeSnackbar(key);
// 		},
// 		[notistack]
// 	);
// };

// export {
// 	useAddAlert,
// 	useRemoveAlert,
// };
export { };