import { createFromIconfontCN } from '@ant-design/icons';
import settingConfig from '@/configs/setting';

const SvgIcon = createFromIconfontCN({
	scriptUrl: settingConfig.iconPath
});

export default SvgIcon;
