import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
	const path = 'xxasd/';
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	useEffect(() => {
		const iframe = iframeRef.current;

		const handleIframeLoad = () => {
			// iframe 加载完毕后执行的代码
			console.log('iframe loaded');
		};
		iframe.addEventListener('load', handleIframeLoad);
		return () => {
			iframe.removeEventListener('load', handleIframeLoad);
		};
	}, []);

	// 发送给iframe数据
	iframeRef.current?.contentWindow.postMessage(path, '*');

	return <iframe title="document" src="http://localhost:8000/static/test.html" ref={iframeRef} />;
};

export default About;
