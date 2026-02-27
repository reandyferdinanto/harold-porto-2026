// Waits until jQuery + all plugins are loaded, then initializes everything
(function waitForJQuery() {
  if (typeof window.jQuery === 'undefined' || typeof window.jQuery.fn.isotope === 'undefined' || typeof window.AOS === 'undefined') {
    return setTimeout(waitForJQuery, 50);
  }
  var $ = window.jQuery;
  $(document).ready(function () {

    // AOS
    AOS.init({ once: true });

    // Stellar parallax (desktop only)
    if ($(window).width() >= 768) {
      $(".bg-fixed").attr("data-stellar-background-ratio", "0.8");
      if (typeof $.fn.stellar !== 'undefined') {
        $.stellar({ horizontalScrolling: false, responsive: true, parallaxBackgrounds: true, scrollProperty: "scroll" });
      }
    }

    // Isotope portfolio grid
    var $grid = $(".grid-portfolio").isotope({
      itemSelector: ".grid-item",
      masonry: { gutter: ".gutter-sizer", columnWidth: ".grid-sizer" },
      percentPosition: true
    });

    // Filter buttons
    $(".filter-button-group").on("click", "a", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
      $(".btn-filter a").removeClass("active");
      $(this).addClass("active");
    });

    // Lightcase — defer slightly so all images are in the DOM
    if (typeof $.fn.lightcase !== 'undefined') {
      setTimeout(function () {
        $("a[data-rel^=lightcase]").lightcase();
      }, 300);
    }

    // Side Nav open/close
    $("#side-nav-open").click(function () {
      $("#side-nav").css("width", "300px");
      setTimeout(function () { $("body").addClass("sidenav-open"); }, 200);
      setTimeout(function () { $("body").addClass("in"); }, 400);
    });
    $("#side-nav-close, #canvas-overlay").click(function () {
      setTimeout(function () { $("body").removeClass("in"); }, 200);
      setTimeout(function () {
        $("body").removeClass("sidenav-open");
        $("#side-nav").css("width", "0");
      }, 400);
    });

    // Side Search open/close
    $("#side-search-open").click(function () {
      $("#side-search").css("width", "300px");
      setTimeout(function () { $("body").addClass("sidesearch-open"); }, 200);
      setTimeout(function () { $("body").addClass("in"); }, 300);
    });
    $("#side-search-close, #canvas-overlay").click(function () {
      setTimeout(function () { $("body").removeClass("in"); }, 200);
      setTimeout(function () {
        $("body").removeClass("sidesearch-open");
        $("#side-search").css("width", "0");
      }, 300);
    });

    // Select2
    if (typeof $.fn.select2 !== 'undefined') {
      $("select").select2();
    }

    // Navbar scroll behaviour
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 150) {
        $("#header-navbar").removeClass("navbar-transparent");
        $("body").addClass("not-on-top");
      } else {
        $("body").removeClass("not-on-top");
        $("#header-navbar").addClass("navbar-transparent");
      }
    });

  });
})();
