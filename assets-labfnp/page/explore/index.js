$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append( $items );
  $items.imagesLoaded().progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.img ).parents( itemSelector );
    // un-hide item
    $item.show();
    // masonry does its thing
    msnry.appended( $item );
  });

  return this;
};

$(document).ready(function(){

  var scrollLoad = true;
  var $container = $('.grid-boxes');
  var gutter = 30;
  var min_width = 240;
  $container.imagesLoaded( function(){
    // $(function() {
    //   $("img.lazy").unveil(screen.height);
    // });
    $container.masonry({
      itemSelector : '.grid-boxes-in',
      gutterWidth: gutter,
      isAnimated: false,
      columnWidth: function( containerWidth ) {
        var box_width = (((containerWidth - 2 * gutter)/3) | 0) ;

        if (box_width < min_width) {
          box_width = (((containerWidth - gutter)/2) | 0);
        }

        if (box_width < min_width) {
          box_width = containerWidth;
        }

        $('.grid-boxes-in').width(box_width);
        $('.grid-boxes-in').show();
        $('.timeline-wrapper').hide();
        return box_width;
      }
    });
  });

  // var append = function(recipe, social, targets) {
  var append = function(result){

    var newRecipes = '';
    result.data.items.forEach(function(recipe, i) {
      temp = $('#recipeTmpl').tmpl({
        recipe:recipe,
        social:result.data.social.data[i],
        targets:result.data.social.targets
      }).html();
      newRecipes += temp;
    });

    $container.masonryImagesReveal( $(newRecipes) );
    // var newRecipe = $('#recipeTmpl').tmpl({
    //   recipe: recipe,
    //   social: social,
    //   targets: targets,
    // });

    // $container.append(newRecipe).masonry( 'appended', newRecipe)
    //
    // setTimeout(function(){
    //   $container.masonry();
    // },0);
  }

  var bindLike = function() {
    $(".recipeLikeContainer").unbind('click');
    $(".recipeLikeContainer").on("click", function(event){
      event.preventDefault()
      var id = $(this).data('id');
      var that = $(this);
      var isLike = that.data('like');
      var successCatch = function(result) {
        var like = that.data('like');
        that.data('like', !like);
        that.find("i").toggleClass("fa-heart");
        that.find("i").toggleClass("fa-heart-o");
      }
      var failCatch = function(error) {
        if (error.responseJSON.message === 'permission denied') {
          swal({
            title: '請先登入',
            text: '如果要使用收藏功能，請先進行登入。',
          	type: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#e6caa8",
            confirmButtonText: "登入",
            cancelButtonText: "註冊",
            closeOnConfirm: false,
            closeOnCancel: false,
          },function(isConform){
            if(isConform){
              open('/login', '_self');
            }else{
              open('/register', '_self');
            }
          });
          document.querySelector('.sweet-overlay').onclick = function(event) {
            swal.close();
          };
        }
      }
      if (isLike) {
        $.get('/api/labfnp/recipe/unlike/'+id).done(successCatch).fail(failCatch);
      } else {
        $.get('/api/labfnp/recipe/like/'+id).done(successCatch).fail(failCatch);
      }
    });
    $('.rrssb-buttons').each(function(index) {
      var url = $(this).data('url');
      var title = $(this).data('title');
      var description = $(this).data('description');
      var params = {
        url: url,
        title: title,
        description: description
      }
      $(this).rrssb(params);
    });
  }

  var getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getRecipe = function(config){
    start = config.start;
    length = config.length;
    var type = 'all';
    if(getParameterByName('type') === 'like')
      type = 'like';
    $.ajax({
      url: '/api/labfnp/recipe/findForLab?start='+ start +'&length='+ length + '&type=' + type,
      type: 'GET',
      dataType: 'json',
      success: ajaxSuccess,
      error: ajaxError,
    });

    function ajaxSuccess(result) {

      append(result);
      // result.data.items.forEach(function(recipe, i) {
      //   append(recipe, result.data.social.data[i], result.data.social.targets);
      // });

      // setTimeout(function(){
      //   $container.masonry();
      // },0);

      setTimeout(function(){
        scrollLoad = true;
      }, 1000);
      bindLike();
    }

    function ajaxError(result) {
      console.log(result);
    }
  }

  // getRecipe({start: 0, length: 10});

  $(document).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 1500) {
      if (scrollLoad) {
        scrollLoad = false;
        setTimeout(function(){
          scrollLoad = true;
        }, 1000);
        var recipeLength =  $('.grid-boxes').children().length
        getRecipe({start: recipeLength, length: 50});
      }
    }
  });

  bindLike();

});
