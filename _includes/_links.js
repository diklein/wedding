<script>
  var eventsLink = document.querySelector("#events-link");
  var accomodationsLink = document.querySelector("#accomodations-link");
  var thingsLink = document.querySelector("#things-link");
  var registryLink = document.querySelector("#registry-link");
  var faqLink = document.querySelector("#faq-link");
  var title = "{{ page.title }}";
  var tag = "{{ page.tag }}";
  if (title == "Events" || tag == "events") {
    eventsLink.className = "blue no-underline mr3 f5 f4-ns";
  } else if (title == "Accomodations" || tag == "accomodations") {
    accomodationsLink.className = "blue no-underline mr3 f5 f4-ns";
  }
  else if (title == "Things to Do" || tag == "thingstodo") {
    thingsLink.className = "blue no-underline mr3 f5 f4-ns";
  }
  else if (title == "Registry" || tag == "registry") {
    registryLink.className = "blue no-underline mr3 f5 f4-ns";
  }
  else if (title == "FAQ" || tag == "faq") {
    faqLink.className = "blue no-underline f5 f4-ns";
  }
</script>
