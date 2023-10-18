<script>
  try {
    (function() {
      // Function to get a specific query parameter value
      function getQueryParam(name) {
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }

      // Get UTM parameters from the URL
      var utmValues = {
        utm_source: getQueryParam('utm_source'),
        utm_medium: getQueryParam('utm_medium'),
        utm_campaign: getQueryParam('utm_campaign'),
        utm_term: getQueryParam('utm_term'),
        utm_content: getQueryParam('utm_content')
      };

      // Convert the utmValues object to a JSON string
      var utmValuesString = JSON.stringify(utmValues);

      // Set the cookie to store the UTM values with session expiration
      document.cookie = 'utm_values=' + utmValuesString + '; path=/; samesite=strict;';

    })();
  } catch (error) {
    console.error('Error occurred in the utm_cookie tag:', error);
  }
</script>
