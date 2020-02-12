if (navigator.userAgent.toLowerCase().indexOf('safari') !== -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1 && !navigator.userAgent.match(/(iPad)/g) && !navigator.userAgent.match(/iPhone/i)) { 
	$('html').addClass('safari');
}
var retina = false;
if(window.devicePixelRatio > 1) retina = true;

// ┌────────────────────────────────────────────────────────────────────┐
// | ROUTER |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var Router = Backbone.Router.extend({
	routes: {
		':slug' : 'getSlug',
		':category/:project' : 'getProject',
		'home' : 'getHome',
		'' : 'getHome'
	},
	initialize: function(data){
		this.parent = data.parent;
	},
	getSlug: function(slug) {

		if(_.indexOf(this.parent.model.get('categoryList'),slug) !== -1){
			this.parent.model.set('category',slug);
			this.parent.model.set('project',null);
		}else if(_.indexOf(this.parent.model.get('projectList'),slug) !== -1){
			var self = this;
			setTimeout(function(){
				self.parent.model.set('category',null);
				self.parent.model.set('project',slug);
			},1000)
		}else{
			this.getHome();
		}
	},
	getProject: function(category, project) {
		if(category !== 'home'){
			if(!this.parent.model.get('category') && !this.parent.model.get('project')){
				var self = this;
				setTimeout(function(){
					self.parent.model.set('category',category);
					self.parent.model.set('project',project);
				},1000)
			}else{
				this.parent.model.set('category',category);
				this.parent.model.set('project',project);
			}
		}else{
			this.getHome(project);
		}
	},
	getHome: function(project){
		if(!project) project = null;
		this.parent.model.set('category',null);
		this.parent.model.set('project', project);
		$('title').html(this.parent.model.get('pageTitle'));
	}
});

// ┌────────────────────────────────────────────────────────────────────┐
// | NAV ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var Nav = Backbone.View.extend({
	initialize : function(d){
		_.bindAll(this,'openCategory','toHome','toCat','searchReset','search','searchAction','searchClear','placeholerOn');
		this.data = d.obj.data;
		this.parent = d.parent;
		this.template = Handlebars.compile(d.obj.template);
		d.parent.model.bind('change:category', this.openCategory);
		this.render();
		this.searchForm = $('#search_field');
		this.searchField = $('#search_input');
	},
	events: {
		'click h1 a' : 'toHome',
		'click .menu_category a' : 'toCat',
		'click #search_arrow' : 'search',
		'submit #search_field' : 'search',
		'keyup #search_input' : 'searchAction',
		'keydown #search_input' : 'searchDo',
		'focus #search_input' : 'placeholerOff',
		'blur #search_input' : 'placeholerOn'
	},
	placeholerOff: function(e){
		$(e.currentTarget).attr('placeholder' , '');
	},
	placeholerOn: function(e){
		if(!$(e.currentTarget).val()){
			$(e.currentTarget).attr('placeholder' , $(e.currentTarget).attr('originalValue'));
		}
	},
	searchAction: function(e){
		if($(e.currentTarget).val()){
			this.searchForm.removeClass('notext');
			if(!app.model.get('searchDone')){
				$('#search_arrow').html('&rarr;');
			}
			app.model.set('searchDone' , false);
		}else{
			this.searchForm.addClass('notext');
			
			app.model.set('searchDone' , false);
			$('#search_arrow').html('');
			$('#search_input').attr('placeholder' , 'Search');
			$('#search_input').val('');
			this.searchReset();
			$.scrollTo.window().queue([]).stop();
			app.model.set('autoscrolling', true);
			if(!app.model.iOS){
				$(window).scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{
				$('#wrapper').scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}
		}
	},
	searchClear: function(){
		this.parent.model.set('searchDone' , false);
		$('#search_arrow').html('');
		$('#search_input').attr('placeholder' , 'Search');
		$('#search_input').val('');
	},
	search: function(e){
		var _this = this;
		this.searchField.blur();
		if(!app.model.get('searchDone')){
			$('#search_arrow').html('&times;');
			app.model.set('searchDone' , true);
			if($('#search_input').val() !== ""){
				$.ajax({
					type: "POST",
					data:{ query:$('#search_input').val()},
					dataType: 'json',
					url: 'main/search',
					success: function(data){
						//console.log(data)
						_this.searchReset();
						if(data.post_count > 0){
							//console.log('search results found')
							if(app.model.get('category') !== null){
								var inCategory = false;
								$.each(data.posts, function(i,j){
									if(app.model.get('projectRelation')[j.post_name]){
										$.each(app.model.get('projectRelation')[j.post_name].split(' '), function(k,l){
											if(l == app.model.get('category')){
												inCategory = true;
											}
										})
									}
								})
								if(!inCategory){
									$('#no_projects').html(_app_.about.data.not_found).appendTo('body').show();
									$.each(app.projects, function(i,j){
										j.model.set('filtered', false);
									});
									return;
								}
							}
							$.each(app.projects, function(i,j){
								var inCat = false;
								$.each(j.model.get('categories'), function(k,l){
									if(l == app.model.get('category') || !app.model.get('category')){
										inCat = true;
									}
								})
								j.model.set('filtered', false);
								$.each(data.posts, function(k,l){
									if(j.$el.attr('id') == l.post_name && inCat){
										j.model.set('filtered', true);
									}
								})
							});
							$('article:visible:last').addClass('last');
							$.each(app.projects, function(i,j){
								if(j.model.get('filtered')){
									app.model.set('autoscrolling', true);
									if(!app.model.iOS){
										$(window).scrollTo(j.$el.offset().top,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
									}else{
										$('#wrapper').scrollTo(j.$el.offset().top,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
									}
									return false;
								}
							});
							app.model.set('scrollOffset', null);
							app.model.set('scrollOffset', $(window).scrollTop());
						}else{
							$('#no_projects').html(_app_.about.data.not_found).appendTo('body').show();
							$.each(app.projects, function(i,j){
								j.model.set('filtered', false);
							})
						}
					}
				});
			}
		}else{
			app.model.set('searchDone' , false);
			$('#search_arrow').html('');
			$('#search_input').attr('placeholder' , 'Search');
			$('#search_input').val('');
			this.searchReset();
			$.scrollTo.window().queue([]).stop();
			app.model.set('autoscrolling', true);
			if(!app.model.iOS){
				$(window).scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{				
				$('#wrapper').scrollTo(0,1500, { onAfter : function(){ 
					app.model.set('autoscrolling', false); 
				} }, {'axis':'y' });
			}
		}
	},
	searchReset: function(){
		$('article.last').removeClass('last');
		$('#no_projects').hide();
		$.each(this.parent.projects, function(i,j){
			j.model.set('filtered', null);
		})
		$('.filterHide').removeClass('filterHide');
		$('article:visible:last').addClass('last');
	},
	render: function(){
		this.$el.html(this.template(this.data))
	},
	openCategory: function(e){
		this.searchReset();
		var category = e.get('category');
		$('.menu_category.active').removeClass('active');
		$('#menu-'+category).addClass('active');
	},
	toHome: function(){
		this.searchReset();
		if(!app.model.get('category')){
			$.scrollTo.window().queue([]).stop();
			app.model.set('autoscrolling', true);
			if(!app.model.iOS){
				$(window).scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{
				$('#wrapper').scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}
		}
	},
	toCat: function(e){
		this.searchReset();
		var t = $(e.currentTarget).attr('t');
		if(app.model.get('category') == t){
			$.scrollTo.window().queue([]).stop();
			app.model.set('autoscrolling', true);
			if(!app.model.iOS){
				$(window).scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{
				$('#wrapper').scrollTo(0,1500, { onAfter : function(){ app.model.set('autoscrolling', false); } }, {'axis':'y' });
			}
		}
	}
})

// ┌────────────────────────────────────────────────────────────────────┐
// | USER OPTIONS ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var Useroptions = Backbone.View.extend({
	initialize : function(d){
		this.data = d.obj.data;
		this.template = Handlebars.compile(d.obj.template);
		d.parent.model.bind('change:category', this.openCategory);
		this.render();
	},

    render:function() {
        var html, $oldel=this.$el, $newel;

        html = this.template(this.data);
        $newel=$(html);

        // rebind and replace the element in the view
        this.setElement($newel);

        // reinject the element in the DOM
        $oldel.replaceWith($newel);

        return this;
    }
})

// ┌────────────────────────────────────────────────────────────────────┐
// | ABOUT ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var About = Backbone.View.extend({
	initialize : function(d){
		this.data = d.obj.data;
		this.template = Handlebars.compile(d.obj.template);
		d.parent.model.bind('change:category', this.openCategory);
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.data))
	}
})

// ┌────────────────────────────────────────────────────────────────────┐
// | PROJECT ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var ProjectModel = Backbone.DeepModel.extend({
	filtered: null
});
var Project = Backbone.View.extend({
	initialize : function(d){
		_.bindAll(this,'buildImages','share');
		this.data = d.obj;
		this.parent = d.parent;
		this.template = Handlebars.compile(_app_.project.template);
		this.render();
		this.images = [];
		this.model.bind('change:filtered', this.filter, this);
		$.each(this.data.project_img, this.buildImages);
		this.shareLink = this.$el.find('.share_url');
		this.shareUrl = this.$el.find('.share_link');
	},
	events:{
		'click .share_link': 'share'
	},
	filter: function(){
		if(!this.model.get('filtered')){
			this.$el.addClass('filterHide');
		}else{
			this.$el.removeClass('filterHide');
		}
	},
	share: function(e){
		$(e.target).hide();
		this.shareLink.show();
		var strongs = this.shareLink;
		var s = window.getSelection();
		s.removeAllRanges();
		var range = document.createRange();
		range.selectNode(strongs[0]);
		s.addRange(range);
	},
	unshare: function(){
		this.shareUrl.show();
		this.shareLink.hide();
	},
	render: function(){
		this.$el.html(this.template(this.data));
	},
	buildImages: function(i,j){
		this.images[i] = new Img({
			el : $('<div class="img_container" />').appendTo(this.$el),
			obj : j,
			parent : this,
			model : new ImgModel(j),
			isLoaded : false
		});
		if(j.p_l) this.images[i].$el.addClass('wLegend');
	},
	loadImages: function(){
		$.each(this.images, function(i,j){
			j.loadProjectImages();
		})
	}
})

// ┌────────────────────────────────────────────────────────────────────┐
// | IMAGE ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var ImgModel = Backbone.DeepModel.extend();
var Img = Backbone.View.extend({
	initialize : function(d){
		this.template = Handlebars.compile(_app_.image.template);
		this.data = d.obj;
		if(d.obj.p_f){
			if(_.indexOf(d.obj.p_f, "shadow") !== -1){
				this.$el.addClass('shadow')
			}
		}
		this.parent = d.parent;
		// console.log(this.data)
		this.render();
// 		this.parent.parent.model.on('change:orientation', this.imgSmall, this);
		_.bindAll(this,'loadImage','setImage','getZoom','loadProjectImages', 'imgSmall');
		d.parent.parent.model.on('change:scrollOffset', this.checkInWindow, this);
		//d.parent.parent.model.on('change:mobile', this.mobileResize);
		$(window).bind("resize", _.bind(this.checkInWindow, this));
		this.inWindow = false;
		this.imgSmall();
		
		if(this.$el.find('.imageholder').attr('href') == '[empty]') this.$el.find('.imageholder').attr('href', 'javascript:void(0);').addClass('emptylink');
	},
	render: function(){
		this.$el.html(this.template(this.data));
		this.resize();
	},
	events: {
		'click .im_zoom' : 'getZoom'
	},
	imgSmall: function(){
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			var w = this.model.get('p_i.s.t_w');
			var h = this.model.get('p_i.s.t_h');
			var ar = h/w;
			var width = "100%";
			//console.log($(this.parent.$el).width())
			var css = {
				width : width,
				height : width * ar
			}
			this.$el.css(css);
		}
	},
	resize: function(){
		var pr_size = this.model.get('p_s');
		var css = {
			width:0,
			height:0
		};
		var w = this.model.get('p_i.s.t_w');
		var h = this.model.get('p_i.s.t_h');
		if(!pr_size){
			css = {
				width : w,
				height : h
			}
		}
		if(pr_size){
			var dims = this.model.get('p_d');
			if(dims.w && dims.h){
				css = {
					width : dims.w,
					height : dims.h
				}
				this.$el.find('a').css(css);
			}else{
				var ar = h/w;
				if(!dims.h && dims.w){
					css = {
						width : dims.w,
						height : dims.w * ar
					}
				}
				if(!dims.w && dims.h){
					css = {
						width : dims.h / ar,
						height : dims.h
					}
				}
				if(!dims.w && !dims.h){
					css = {
						width : w,
						height : h
					}
				}
			}
		}
		this.$el.css(css);
	},
	checkInWindow: function(){
		if(!this.parent.parent.model.get('autoscrolling')){
			var tol = 400;
			var elTop = this.$el.offset().top;
			var elHeight = this.$el.height();
			var scroll = this.parent.parent.model.get('scrollOffset');
			var winHeight = $(window).height();
			if(this.parent.$el.is(":visible") && (elTop > scroll - tol && elTop < parseInt(scroll) + parseInt(winHeight) + parseInt(tol))){
				if(!this.inWindow){
					this.checkTimer = setTimeout(this.loadImage,600);
					this.inWindow = true;
				}
			}
		}
	},
	getZoom: function(e){
		var _this = this;
		if(!(navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPod/i))) {
			setTimeout(function(){
				app.zoom = new Zoom({
					el: $('<div id="zoom" />').appendTo('body'),
					obj: _this.model.get('p_i.s')
				});
			},1)
		}
	},
	loadProjectImages: function(){
		this.parent.parent.model.off('change:scrollOffset', this.checkInWindow, this);
		var pr_size = this.model.get('p_s');
		var img;
		if(pr_size !== "cus"){
			img = this.model.get('p_i.s.t_p')
		}
		if(!this.model.get('isLoaded')){
			$.preload([ img ], {
				onFinish: this.setImage
			});
			this.model.set('isLoaded', true);
		}
	},
	loadImage: function(){
		var tol = 400;
		var elTop = this.$el.offset().top;
		var elHeight = this.$el.height();
		var scroll = this.parent.parent.model.get('scrollOffset');
		var winHeight = $(window).height();
		if(this.parent.$el.is(":visible") && (elTop > scroll - tol && elTop < parseInt(scroll) + parseInt(winHeight) + parseInt(tol))){
			app.model.off('change:scrollOffset', this.checkInWindow, this);
			var pr_size = this.model.get('p_s');
			var img;
			if(pr_size !== "cus"){
				img = this.model.get('p_i.s.t_p')
			}
			if(!this.model.get('isLoaded')){
				$.preload([ _app_.uploadDir + img ], {
					onFinish: this.setImage
				});
				this.model.set('isLoaded', true);
			}
		}else{
			this.inWindow = false;
		}
	},
	setImage: function(e){
		var _this = this;
		var i = $('<img />', {
			src: e.image
		})
		.appendTo(this.$el.find('.imageholder'));
		var pr_size = this.model.get('p_s');
		if(i.attr('src').indexOf('.gif') !== -1) this.$el.addClass('angif');
		if(pr_size){
			var dims = this.model.get('p_d');
			if(dims.w && dims.h){
				this.$el.find('img').attr({
					'width' : this.model.get('p_i.s.t_w'),
					'height' : this.model.get('p_i.s.t_h')
				});
			}
			this.$el.find('img').fitToBox();
		}else{
			this.$el.find('img').attr({
				'width' : '100%',
				'height' : '100%'
			});
		}
		setTimeout(function(){
			_this.$el.addClass('loaded');
		},1)
	},
	mobileResize: function(e){
		if(app.model.iPOS){
			$('#wrapper').css({
				'width' : $(window).width() - 48
			});
			$('article').each(function(){
				$(this).width($(window).width() - 48);
			});
			$('about').width($(window).width() - 48);
		}
	}
})

// ┌────────────────────────────────────────────────────────────────────┐
// | ZOOM |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var Zoom = Backbone.View.extend({
	initialize: function(d){
		_.bindAll(this,'render');
		this.template = Handlebars.compile(_app_.zoom.template);
		this.data = d.obj;
		//console.log(this.data)
		this.$el.addClass('loading');
		this.data.z_path = _app_.uploadDir + this.data.z_p;
		if(this.data.t_r !== "" && retina) this.data.z_path = _app_.uploadDir + this.data.t_r;
		this.data.zoom_image_path = _app_.uploadDir + '/' + this.data.zoom_image;
		$.preload([this.data.z_path], {
			onFinish: this.render
		});
	},
	removeZoom: function(){
		this.remove();
	},
	render: function(){
		var _this = this;
		this.$el.html(this.template(this.data));
		setTimeout(function(){
			_this.$el.removeClass('loading')
		},100);
		this.$el.css({
			'margin-left': -this.data['z_w']/2,
			'margin-top': -this.data['z_h']/2
		});
	}
})

// ┌────────────────────────────────────────────────────────────────────┐
// | APP ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var AppModel = Backbone.DeepModel.extend({
	defaults: {
		pageTitle: null,
		category: '',
		categoryTitle: null,
		project: null,
		projectTitle: null,
		categoryList: [],
		projectList: [],
		categoryTitles: {},
		projectTitles: [],
		projects : _app_.projects,
		projectRelation : _app_.projectRelation,
		scrollOffset: 0,
		scrollRequest: null,
		autoscrolling: false,
		mobile: false,
		// orientation: null,
		iOS : null,
		iPOS : null
	},
	initialize: function(){
		_.bindAll(this,'orient');
		this.bind('change:autoscrolling', this.endScroll, this);
		if(navigator.userAgent.match(/(iPad)/g)){
			this.iOS = true;
			$('html').addClass('iOS');
		}else{
			this.iOS = false;
		}
		if(navigator.userAgent.match(/(iPhone)/g)){
			this.iPOS = true;
			$('html').addClass('iPOS');
		}else{
			this.iPOS = false;
		}
	},
	endScroll: function(){
		if(!this.get('autoscrolling')){
			this.trigger('change:scrollOffset');
		}
	},
	orient: function(){
/*
		if ( window.orientation === 90 || window.orientation === -90 ) this.set( 'orientation', 1 )
		else this.set( 'orientation', 0 );
*/
	}
});
var App = Backbone.View.extend({
	el : 'body',
	model : new AppModel(),
	initialize : function(){
		var _this = this;
		_.bindAll(this,'openCategory','buildProject','mousewheel','resize');
		this.model.set('pageTitle' , $('title').html());
		$(window).bind("scroll", _.bind(this.scroll, this));
		$(window).bind("resize", _.bind(this.resize, this));
		// $(window).bind('orientationchange', _.bind(this.model.orient, this));
		// this.model.orient();
		this.model.bind('change:category', this.openCategory);
		this.model.bind('change:project', this.openProject,this);
		$.each(_app_.nav.data.menu, function(i,j){
			_this.model.set('categoryList.' + i , j.category_slug);
			_this.model.set('categoryTitles.' + j.category_slug, j.category_title);
		});
		$.each(_app_.projects, function(i,j){
			_this.model.set('projectList.' + i , j.project_slug);
			_this.model.set('projectTitles.' + j.project_slug, j.project_title);
		});
		this.nav = new Nav({
			obj : _app_.nav,
			el : $('<nav />').appendTo('body'),
			parent : this
		});
		this.useroptions = new Useroptions({
			obj : _app_.useroptions,
			el : $('<meta />').appendTo('head'),
			parent : this
		});
		this.about = new About({
			obj : _app_.about,
			el : $('<about />').appendTo('body'),
			parent : this
		});
		this.projects = [];
		$.each(this.model.get('projects'), this.buildProject);
		this.router = new Router({
			parent:this
		});
		Backbone.history.start();
		if(this.model.iOS){
			$('<div id="wrapper" />').appendTo('body');
			$('article').each(function(){
				$(this).appendTo('#wrapper');
			});
			$('about').prependTo("#wrapper");
		}
		if(this.model.iPOS){
			$('<div id="wrapper" />')
			.css({
				'width' : $(window).width() - 48
			})
			.appendTo('body');
			$('nav').each(function(){
				$(this).appendTo('#wrapper');
			});
			$('article').each(function(){
				$(this).width($(window).width() - 48);
				$(this).appendTo('#wrapper');
			});
			$('about').prependTo("#wrapper");
			$('about').width($(window).width() - 48);
		}
	},
	events: {
		'mousewheel' : 'mousewheel',
		'click *' : 'check',
		'click #arrow' : 'scrollTop'
	},
	check: function(e){
		var target = $(e.target);
		if(!target.hasClass('zoomed')){
			if(app.zoom) app.zoom.removeZoom();
		}
	},
	buildProject: function(i,j){
		var p_slug = this.model.get('projects.' + i + '.project_slug');
		var p_cat = this.model.get('projectRelation.' + p_slug );
		this.model.set('projects.' + i + '.project_category', p_cat);
		j.project_category = p_cat;
		this.projects[i] = new Project({
			obj : j,
			el : $('<article class="project clearfix ' + p_cat + '" id="'+p_slug+'" />').appendTo(this.$el),
			parent : this,
			model : new ProjectModel({
				visible : null,
				categories : p_cat.split(" ")
			}),
		});
	},
	openCategory: function(e){
		var _this = this;
		$('article.last').removeClass('last');
		if(e.get('category')){
			var category = e.get('category');
			this.$el.attr('class' , 'category ' + category);
			$('title').html(this.model.get('pageTitle') + ' &#8212; ' + this.model.get('categoryTitles.' + category));
			$('article.'+category+':last').addClass('last');
			$.each(this.projects, function(i,j){
				if(_.indexOf(j.model.get('categories'),category) !== -1){
					$.each(j.images, function(k,l){
						l.checkInWindow()
					})
				}
			})
		}else{
			this.$el.attr('class' , '');
			$('article:last').addClass('last');
			$.each(this.projects, function(i,j){
				$.each(j.images, function(k,l){
					l.checkInWindow()
				})
			})
		}
		$.each(this.projects, function(i,j){
			j.unshare();
		})
		$.scrollTo.window().queue([]).stop();
		this.model.set('autoscrolling', true);
		if(!this.model.iOS && !this.model.iPOS){
			$(window).scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
		}else{
			$('#wrapper').scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
		}
		this.nav.searchClear();
		//$(window).scrollTo(0,1500);
	},
	mousewheel: function(){
		$.scrollTo.window().queue([]).stop();
		this.model.set('autoscrolling', false);
	},
	openProject: function(e){
		var _this = this;
		$.scrollTo.window().queue([]).stop();
		if(!this.model.get('project')){
			//$(window).scrollTo(0,1500);
			this.model.set('autoscrolling', true);
			if(!this.model.iOS && !this.model.iPOS){
				$(window).scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{
				$('#wrapper').scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
			}
			$('title').html(this.model.get('pageTitle'));
		}else{
			this.model.set('autoscrolling', true);
			if(!this.model.iOS && !this.model.iPOS){
				$(window).scrollTo($('#' + this.model.get('project')),1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
			}else{
				$('#wrapper').scrollTo($('#' + this.model.get('project')),1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
			}
			$('title').html(this.model.get('pageTitle') + ' &#8212; ' + this.model.get('projectTitles.' + this.model.get('project')));
		}
		$.each(this.projects, function(i,j){
			j.unshare();
		})
	},
	scroll: function(e){
		var _this = this;
		(this.zoom) && (this.zoom.removeZoom());
	},
	scrollTop: function(){
		var _this = this;
		$.scrollTo.window().queue([]).stop();
		this.model.set('autoscrolling', true);
		if(!this.model.iOS && !this.model.iPOS){
			$(window).scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
		}else{
			$('#wrapper').scrollTo(0,1500, { onAfter : function(){ _this.model.set('autoscrolling', false); } }, {'axis':'y' });
		}
	},
	resize: function(e){
		if($(window).width() < 480){
			$('body').addClass('mobile');
			this.model.set('mobile', true);
		}else{
			$('body').removeClass('mobile');
			this.model.set('mobile', false);
		}
	}
});

// ┌────────────────────────────────────────────────────────────────────┐
// | ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// └────────────────────────────────────────────────────────────────────┘
var app = new App();

$(window).scroll(
	$.debounce( 150, function(){
		app.model.set('scrollOffset', $(window).scrollTop());
	})
);
$('#wrapper').scroll(
	$.debounce( 250, function(){
		app.model.set('scrollOffset', $('#wrapper').scrollTop());
		app.model.set('scrollOffset', $(window).scrollTop());
		app.model.set('autoscrolling', false);
	})
);
$('body').bind({
	touchmove: function(e) {
		(app.zoom) && (app.zoom.removeZoom());
	}
});


/* AJAX form submission for email list, from https://gist.github.com/jdennes/1155479 */
$(function () {
	$('#subForm').submit(function (e) {
		e.preventDefault();
		$.getJSON(
		this.action + "?callback=?",
		$(this).serialize(),
		function (data) {
			if (data.Status === 400) {
				$("#about_form").append("<p>Error: " + data.Message + "</p>");
			} else { // 200
				$("#submit_but").remove();
				$("#about_form").append("<p>" + data.Message + "</p>");
			}
		});
	});
});