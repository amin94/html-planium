$(document).ready(function() {


  var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  var projectID = getUrlParameter('pid');

  $('.nav a[name=projectDetailLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/dashboard.html?pid='+projectID);
  $('.nav a[name=mapLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/maps.html?pid='+projectID);
  $('.nav a[name=documentsLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/documents.html?pid='+projectID);
  $('.nav a[name=issuesLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/issues.html?pid='+projectID);
  $('.nav a[name=teamLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/team.html?pid='+projectID);
  $('.nav a[name=settingsLink]').attr('href', 'http://amins-macbook-pro.local:5757/html-planium/settings.html?pid='+projectID);


  if (thisPage=='dashboard') {
    $('#projectDetailLink').addClass('active');
  } else if (thisPage=='maps') {
    $('#mapsLink').addClass('active');
  } else if (thisPage=='documents') {
    $('#documentsLink').addClass('active');
  } else if (thisPage=='issues') {
    $('#issuesLink').addClass('active');
  } else if (thisPage=='team') {
    $('#teamLink').addClass('active');
  } else if (thisPage=='settings') {
    $('#settingsLink').addClass('active');
  }


  });
