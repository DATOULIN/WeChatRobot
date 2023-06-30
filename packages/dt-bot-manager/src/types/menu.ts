export type MenuItem = {
	label: string;
	icon: React.ReactNode;
	key: string;
	children: MenuItem[];
};
