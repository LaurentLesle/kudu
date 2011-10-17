(function ($) {
    /// <param name="$" type="jQuery" />
    "use strict"

    $.utils.diffClass = function (type) {
        if (type == 1) {
            return ' diff-add';
        }
        else if (type == 2) {
            return ' diff-remove';
        }
        return '';
    };

    $.utils.diffFileClass = function (diffFile) {
        if (diffFile.Status == 1) {
            return 'icon-file-added';
        }
        else if (diffFile.Status == 2) {
            return 'icon-file-deleted';
        }
        else if (diffFile.Status == 3) {
            return 'icon-file-modified';
        }
        else if (diffFile.Binary) {
            return 'icon-binary';
        }
        return 'icon-default';
    };

    $.fn.diffViewer = function (options) {
        /// <summary>Creates a new file explorer with the given options</summary>
        /// <returns type="diffViewer" />
        var config = {
            readonly: true
        };

        $.extend(config, options);

        var $this = $(this),
            templates = config.templates,
            readonly = config.readonly,
            that = null;

        $this.addClass('diffViewer');

        $this.delegate('.toggle', 'click', function (ev) {
            var $source = $(this).parent().next('.source');
            if ($source.is(':hidden')) {
                $(this).removeClass('icon-expand-down');
                $(this).addClass('icon-collapse-up');

                $source.slideDown();
            }
            else {
                $(this).addClass('icon-expand-down');
                $(this).removeClass('icon-collapse-up');
                $source.slideUp();
            }

            ev.preventDefault();
            return false;
        });

        that = {
            refresh: function (diff) {
                diff.readonly = readonly;
                $this.html($.render(templates.diff, diff));
            },
            selectedFiles: function () {
                if (readonly) {
                    return [];
                }
                return $this.find('.include')
                            .filter(':checked')
                            .closest('.file')
                            .map(function (index, e) {
                                return $(e).data('path');
                            });
            }
        };

        return that;

    };

})(jQuery);