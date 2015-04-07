(function (window) {
    'use strict';

    window.PhotoMosaic.LightboxBridge.photoswipe = function ($, $mosaic, $items) {
        var items_cache = null;
        var mosaic_index = $.inArray(
            $mosaic.get(0),
            $.map( PhotoMosaic.Mosaics, function (item, i) {
                return item.$el.children().get(0);
            })
        );

        $mosaic.parent().data('pswp-uid', mosaic_index + 1);

        $items.click(function (e) {
            e.preventDefault();

            var idx = $.inArray( this, $items );
            var pm_data = $.extend({}, $mosaic.parent().data('photoMosaic').opts);
            var pswp_element = document.querySelectorAll('.pswp')[0];
            var items = (items_cache) ? items_cache : $.map(pm_data.gallery, function (item, i) {
                return {
                    src : item.sizes[ pm_data.lightbox_rendition ],
                    msrc : item.sizes.thumbnail,
                    w : item.width.original,
                    h : item.height.original,
                    title : item.caption
                };
            });
            var options = {
                index : idx,
                galleryUID : $mosaic.data('pswp-uid'),
                loop : PhotoMosaic.LightboxBridge.photoswipe_options.loop_images,
                history : true,
                focus : true,
                showHideOpacity : false,
                showAnimationDuration : 150,
                hideAnimationDuration : 150,
                bgOpacity : 0.8,
                spacing : 0.12,
                allowPanToNext : true,
                maxSpreadZoom : 2,
                pinchToClose : true,
                closeOnScroll : true,
                closeOnVerticalDrag : true,
                escKey : true,
                arrowKeys : true,
                mainClass : 'awesome-photoswipe',
                getThumbBoundsFn : function(index) {
                    var thumbnail = $items[index];
                    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    var rect = thumbnail.getBoundingClientRect();

                    return {
                        x : rect.left,
                        y : rect.top + pageYScroll,
                        w : rect.width
                    };
                }
            };

            if ( !items_cache ) {
                items_cache = items;
            }

            var gallery = new PhotoSwipe( pswp_element, window.PhotoSwipeUI_Default, items, options);
            gallery.init();

            return false;
        });
    }
}(window));