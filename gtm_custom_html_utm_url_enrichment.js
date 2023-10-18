<script>
try {
    (function() {
        var cookieName = 'utm_values';
        // List of allowed domains for which UTM parameters should be appended
        var allowedDomains = ['example.com', 'another-example.com']; // Replace with your desired domains and keep in quotes

        // Function to get cookie value by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
            return null;
        }

        // Function to check if the link is for an allowed domain
        function isAllowedDomain(link) {
            for (var i = 0; i < allowedDomains.length; i++) {
                if (link.href.indexOf(allowedDomains[i]) !== -1) {
                    return true;
                }
            }
            return false;
        }

        // Get UTM parameters from the cookie
        var cookieValue = getCookie(cookieName);
        var utmParams = "";

        if (cookieValue) {
            var utmObj = JSON.parse(cookieValue);
            for (var key in utmObj) {
                if (utmObj.hasOwnProperty(key)) {
                    utmParams += key + '=' + encodeURIComponent(utmObj[key]) + '&';
                }
            }
            // Remove the trailing '&'
            utmParams = utmParams.slice(0, -1);
        }

        if (!utmParams) {
            return; // if no UTM parameters found in the cookie, do nothing
        }

        // Attach UTM parameters to all allowed links on click
        document.body.addEventListener('click', function(event) {
            var target = event.target;
            while (target && target.tagName.toLowerCase() !== 'a') {
                target = target.parentElement;
            }
            if (target && target.tagName.toLowerCase() === 'a' && isAllowedDomain(target)) {
                target.href += (target.href.indexOf('?') > -1 ? '&' : '?') + utmParams;
            }
        }, false);
    })();
} catch (e) {
    console.error('Error occurred in the utm_url_enrichment tag:', e);
}
</script>
