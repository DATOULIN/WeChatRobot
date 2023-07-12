import React from 'react';
import useTheme from '@/store/theme';
import SvgIcon from '@/components/SvgIcon';
import styles from './index.less';

interface PropsType {}
const DTLogo: React.FC<PropsType> = () => {
	const [themeColor] = useTheme();
	return (
		<SvgIcon color={themeColor} type="icon-emoticons-color_robot" className={styles['logo']} />
	);
};

export default DTLogo;
