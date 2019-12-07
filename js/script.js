(function () {
  //privacy policy flag
  try {
    var pkey = "privacypolicy";
    var privacy = localStorage.getItem(pkey) || sessionStorage.getItem(pkey);
    if (!privacy) {
      var privacyDiv = document.getElementById("privacy-accept"),
        footerDiv = document.getElementById("footer-info");
      privacyDiv.style.display = "block";
      if (screen.width < 480) footerDiv.style.marginBottom = "50px";
      document.getElementById("btn-policy-accept").addEventListener("click", function () {
        try {
          localStorage.setItem(pkey, 1);
          sessionStorage.setItem(pkey, 1);
        } catch (e) { }

        privacyDiv.style.display = "none";
        if (screen.width < 480) footerDiv.style.marginBottom = "0";
      });
    }
  } catch (e) { }

  //action buttons events
  if (window.ga) {
    [].forEach.call(document.querySelectorAll("[data-event]"),
      /** @param {HTMLElement} btn */
      function (btn) {
        btn.addEventListener("click", function () {
          btn.getAttribute("data-event");
          ga('send', 'event', btn.getAttribute("data-event"), btn.getAttribute("data-event-arg1"), btn.getAttribute("data-event-arg2"));
        }, true);
      });
  }

  // Share box
  var links = document.querySelectorAll(".article-share-link");
  if (links && links.length > 0) {
    var boxClassName = "article-share-box";
    document.body.addEventListener("click", function () {
      var boxes = document.querySelectorAll("." + boxClassName);
      [].forEach.call(boxes,
        /** @param {HTMLElement} x */
        function (x) {
          x.classList.remove("on");
          x.style.display = "none";          
        });
    });

    /** @param {Event} e */
    function onLinkBoxClick(e) {
      e.stopPropagation();

      /** @type {HTMLElement} */
      var t = this;

      var url = t.getAttribute("data-url"),
        encodedUrl = encodeURIComponent(url),
        id = boxClassName + "-" + t.getAttribute("data-id"),
        offset = t.getBoundingClientRect(),
        box = document.getElementById(id);

      if (box) {
        if (box.classList.contains("on")) {
          box.classList.remove("on");
          return;
        }
      } else {
        var html = [
          '<div class="article-share-links">',
          '<a href="https://twitter.com//intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
          '<a href="https://www.facebook.com//sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
          '<a href="http://pinterest.com//pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
          '<a href="https://plus.google.com//share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        ].join('');

        box = document.createElement("div");
        box.id = id;
        box.className = boxClassName;
        box.innerHTML = html;

        document.body.appendChild(box);
      }

      //hide previous
      var boxOn = document.querySelector("." + boxClassName + ".on");
      if (boxOn) {
        boxOn.style.display = "none";
      }

      box.style.top = (offset.top - 35 + window.scrollY ) + "px";
      box.style.left = (offset.left + 10 + window.scrollX) + "px";
      box.style.display = "block";
      box.classList.add("on");
      box.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    [].forEach.call(links,
      /** @type {HTMLElement} */
      function (box) {
        box.addEventListener("click", onLinkBoxClick.bind(box));
      });
  }
})();