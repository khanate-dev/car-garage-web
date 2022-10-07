import {
	Icon,
	GraphIcon,
	MegaphoneIcon,
	PlugIcon,
	RocketIcon,
	TrophyIcon,
	ZapIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	PlusIcon,
	ChevronLeftIcon,
	SignOutIcon,
	MoonIcon,
	SunIcon,
	ImageIcon,
	StarIcon,
	StarFillIcon,
	CodeReviewIcon,
	IconProps,
	PencilIcon,
} from '@primer/octicons-react';

export const icons = {
	overview: GraphIcon,
	products: MegaphoneIcon,
	bodyTypes: PlugIcon,
	makeTypes: RocketIcon,
	models: TrophyIcon,
	submit: ZapIcon,
	back: ArrowLeftIcon,
	next: ArrowRightIcon,
	add: PlusIcon,
	minimize: ChevronLeftIcon,
	logout: SignOutIcon,
	darkMode: MoonIcon,
	lightMode: SunIcon,
	image: ImageIcon,
	star: StarIcon,
	starFilled: StarFillIcon,
	review: CodeReviewIcon,
	edit: PencilIcon,
};

export interface AppIconProps extends IconProps {
	icon?: keyof typeof icons | Icon,
}

export const AppIcon = ({
	icon,
	...iconProps
}: AppIconProps) => {
	if (!icon) return null;
	const Icon = (
		typeof icon === 'string'
			? icons[icon]
			: icon
	);
	return <Icon {...iconProps} />;
};
