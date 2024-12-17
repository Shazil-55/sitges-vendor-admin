/**
 * The module for importing CSS files.
 */
declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

/**
 * The type definition for the Node.js process object with additional properties.
 */
type ProcessType = NodeJS.Process & {
	browser: boolean;
	env: {
		[key: string]: string | undefined;
	};
};

interface Window {
	initMap: () => void;
}

declare namespace google {
	export class maps {
		static Map: any;
		static LatLngBounds: any;
		static places: {
			SearchBox: any;
		};
		static Marker: any;
		LatLng: any;
	}
}

/**
 * The global process object.
 */
declare let process: ProcessType;

/**
 * The type definition for the Hot Module object.
 */
interface HotModule {
	hot?: {
		status: () => string;
	};
}

declare const module: HotModule;
