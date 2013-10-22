var abh_loadbox_loaded = false;

(function($) {

    /**
     * Get the Cookie value
     *
     * @param nombre string cookie name
     * @return string cookie value
     */
    $._getCookie = function(nombre) {
        var dcookie = document.cookie;
        var cname = nombre + "=";
        var longitud = dcookie.length;
        var inicio = 0;

        while (inicio < longitud)
        {
            var vbegin = inicio + cname.length;
            if (dcookie.substring(inicio, vbegin) === cname)
            {
                var vend = dcookie.indexOf(";", vbegin);
                if (vend === -1)
                    vend = longitud;
                return unescape(dcookie.substring(vbegin, vend));
            }
            inicio = dcookie.indexOf(" ", inicio) + 1;
            if (inicio === 0)
                break;
        }
        return null;
    };
    /**
     * Set the Cookie
     *
     * @param name string cookie name
     * @param value string cookie value
     * @return void
     */
    $._setCookie = function(name, value) {
        document.cookie = name + "=" + value + "; expires=" + (60 * 24) + "; path=/";
    };


})(jQuery);

function abh_loadbox() {
    abh_loadbox_loaded = true;
    // On tab click
    jQuery(".abh_tabs li").click(function(event) {
        event.preventDefault();
        //First remove class "active" from currently active tab
        jQuery(this).parents('.abh_box').find(".abh_tabs li").removeClass('abh_active');

        //Now add class "active" to the selected/clicked tab
        jQuery(this).addClass("abh_active");

        //Hide all tab content
        jQuery(this).parents('.abh_box').find(".abh_tab").hide();

        //Here we get the href value of the selected tab
        var selected_tab = jQuery(this).find("a").attr("href");

        //Show the selected tab content
        jQuery(this).parents('.abh_box').find(selected_tab.replace('#', '.') + '_tab').fadeIn();
        jQuery(this).parents('.abh_box').find(selected_tab.replace('#', '.') + '_tab').parents('.abh_box').find(selected_tab.replace('#', '.')).addClass("abh_active");
        jQuery._setCookie('abh_tab', selected_tab);

        //At the end, we add return false so that the click on the link is not executed
        return false;
    });

    //Show the saved cookie tab content
    if (jQuery._getCookie('abh_tab') !== null) {
        jQuery(".abh_tab").hide();
        jQuery(".abh_tabs li").removeClass('abh_active');

        //Get the tab from cookie
        var selected_tab = jQuery._getCookie('abh_tab');
        jQuery(selected_tab.replace('#', '.') + '_tab').fadeIn();
        jQuery(selected_tab.replace('#', '.')).addClass("abh_active");
    }
}

jQuery(document).ready(function() {
    if (abh_loadbox_loaded === false)
        abh_loadbox();
});

var abh_timeout_loadbox = setTimeout(function() {
    if (abh_loadbox_loaded === false)
        abh_loadbox();
    else
        clearTimeout(abh_timeout_loadbox);
}, 1000);

