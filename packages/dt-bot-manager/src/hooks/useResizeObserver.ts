import { useEffect } from 'react';
import _ from 'loadsh';

const useResizeObserver = (
	autoTrigger: boolean,
	autoTriggerWidth: number,
	maximizeCallback: () => void,
	minimizeCallback: () => void
) => {
	useEffect(() => {
		// 开启自动伸缩功能
		const el = document.body;
		const resizeObserver = new ResizeObserver(
			_.debounce((arg) => {
				if (autoTrigger) {
					arg.forEach((entry: any) => {
						const {
							contentRect: { width }
						} = entry;
						if (width < autoTriggerWidth) {
							minimizeCallback();
						} else {
							maximizeCallback();
						}
					});
				}
			}, 500)
		);
		resizeObserver.observe(el as HTMLElement);
		return () => {
			resizeObserver.disconnect();
		};
	}, []);
};

export default useResizeObserver;
