

define({
	template: 'mustache',
	errorNotify: true,
	errorLog: false,
	mainContainer: '#mainContainer',
	pagesViewsPath: '/pages/',
	pageError: "modules/pages/views/error.html",
	api: "t2api",
	siteName: "TEP Hydrology",
	tumblrBlogLink: "http://esa-official.tumblr.com/",
	tumblrApiKey: "fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",
    recaptchaPublicKey: '6LcFLy4UAAAAAIEzSm_HdSGf1Q29yJ0zOLHm7Qsq',
	
	menuUrl: "/config/menu.json",
	
	enableLoginPolling: true,
	enableAccounting: true,
	
	baseControl: {
		siteName: 'TEP Hydrology',
		contactUsUrl: 'mailto:hydrology-tep@esa.int',
		supportUrl: 'mailto:support@terradue.com',
		errorImageUrl: '/styles/img/error.png'
	},

	modules: {
		
		pages: {
			discourseBlogEnabled: true,
			discourseCategory: 8
		},
		
		blog: {
			discourseBlogEnabled: true,
			discourseCategory: 8
		},
		
		login: {
			siteName: 'TEP Hydrology',
            hasSupport: false,
            contactLink: '/#!contact',
            contactAddress: 'hydrology-tep@esa.int',
			docsUrl: 'http://hydrology-tep.github.io/documentation/',
			loginPollingTime: 60*1000, // 1 minute
			signinUrl: '/umsso',
			signinType: 'umsso'
		},
		
		settings: {
			siteName: 'TEP Hydrology',
			subContainer: "#subContainer",
			showPagination: false,
			stepScoreUsage: 50,
			nbStarsUsage: 5,
			messagesUsage: ["Newbie","Rookie","Beginner","Intermediate","Advanced","Expert"],
			urfUrl: 'https://docs.google.com/document/d/1JR_Bg2rkMVEDdofJL3Dy5ou_Lmg8fb-Ys9LzImKkJTA/'
		}
	},

    baseMaps: [
     {
          name: 'Default',
          type: 'mapbox',
          id: 'tepgeohazards.l6mdm2gn',
          isDefault: true,
      },
      {
          name: 'Light map',
          type: 'mapbox',
          id: 'tepgeohazards.l6md4p2l',
      },
      {
          name: 'Natural Earth',
          type: 'mapbox',
          id: 'tepgeohazards.l6md2364',
      },
      {
          name: 'Dark map',
          type: 'mapbox',
         id: 'tepgeohazards.l6mdoh89',
      },
      {
          name: 'Google Road map',
          type: 'google',
          id: 'ROADMAP',
      }
      ]
	
});