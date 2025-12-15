
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/auth" | "/camera" | "/gallery" | "/learn" | "/premium";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/auth": Record<string, never>;
			"/camera": Record<string, never>;
			"/gallery": Record<string, never>;
			"/learn": Record<string, never>;
			"/premium": Record<string, never>
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/camera" | "/camera/" | "/gallery" | "/gallery/" | "/learn" | "/learn/" | "/premium" | "/premium/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/app-icon.png" | "/favicon-512.png" | "/favicon.ico" | "/og-image.png" | "/placeholder.svg" | "/robots.txt" | "/sitemap.xml" | string & {};
	}
}