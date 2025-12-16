export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["app-icon.png","favicon-512.png","favicon.ico","og-image.png","placeholder.svg","robots.txt","sitemap.xml"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BcetGKP7.js",app:"_app/immutable/entry/app.D7g8k66V.js",imports:["_app/immutable/entry/start.BcetGKP7.js","_app/immutable/chunks/BY3oBhWb.js","_app/immutable/chunks/euoDS5HO.js","_app/immutable/chunks/CIreAhhO.js","_app/immutable/entry/app.D7g8k66V.js","_app/immutable/chunks/Dr2Ar8L_.js","_app/immutable/chunks/euoDS5HO.js","_app/immutable/chunks/BF_fzraS.js","_app/immutable/chunks/2cE01D9o.js","_app/immutable/chunks/COZmPO8V.js","_app/immutable/chunks/DDsV6d7y.js","_app/immutable/chunks/CIreAhhO.js","_app/immutable/chunks/BL5PtrY-.js","_app/immutable/chunks/BdRBxdY1.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/camera",
				pattern: /^\/camera\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/learn",
				pattern: /^\/learn\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
