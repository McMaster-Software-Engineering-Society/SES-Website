export type ImageItem = {
	src: string;
	alt?: string;
};

export type DomeGalleryProps = {
	images?: ImageItem[];
	/**
	 * Roughly how many items should fit across the arc (affects item size).
	 * Larger fit -> smaller images. Defaults to 6.
	 */
	fit?: number;
	/**
	 * What dimension to base radius calculations on.
	 * - auto: use min(width, height)
	 * - min/max: use min or max of container dims
	 * - width/height: force that basis
	 */
	fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
	/** Minimum radius (px) for the dome arc */
	minRadius?: number;
	/** Maximum radius (px) for the dome arc */
	maxRadius?: number;
	/** Padding factor (0-1) applied to radius to leave headroom */
	padFactor?: number;
	/** Additional className for container */
	className?: string;
	/** Optional aria label for the gallery region */
	ariaLabel?: string;
};

