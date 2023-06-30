import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';
import settingConfig from '@/configs/setting';
import { getTheme } from '@/utils/cache';

export const themeAtom = atomWithStorage<string>(settingConfig.themeKey, getTheme() || '#00b96b');
const useTheme = (): [string, any] => {
	const [themeColor, setThemeColor] = useAtom(themeAtom);
	return [themeColor, setThemeColor];
};

export default useTheme;
