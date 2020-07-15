(function (containerId) {
  const prefix = "hlm";
  const circleLinkSelector = `.${prefix}-visualmap a`;
  const highlightSelector = `.${prefix}-highlights .${prefix}-highlight`;
  const buttonSelector = `.${prefix}-controls .${prefix}-`;

  const container = document.getElementById(containerId);
  const circleLinksArray = [...container.querySelectorAll(circleLinkSelector)];
  const highlightsArray = [...container.querySelectorAll(highlightSelector)];
  const selector = `.${prefix}-controls ${prefix}-next`;

  const buttonNext = container.querySelector(buttonSelector + "next");
  const buttonPrev = container.querySelector(buttonSelector + "prev");

  buttonNext.addEventListener("click", (e) => {
    incrementHighlight(1);
  });

  buttonPrev.addEventListener("click", (e) => {
    incrementHighlight(-1);
  });

  circleLinksArray.forEach((link) => {
    const highlight = document.querySelector(link.href.baseVal);

    link.addEventListener("click", (e) => {
      event.preventDefault();

      changeHighlight(link.href.baseVal);
    });
  });

  function changeHighlight(highlightId) {
    const highlight = container.querySelector(`#${highlightId}`);
    if (highlight === null) return;

    //Update which highlight is selected
    highlightsArray.forEach((highlight) => {
      if (highlightId !== highlight.id) highlight.classList.remove("selected");
    });
    highlight.classList.add("selected");

    //TODO: Update which circles are selected
    circleLinksArray.forEach((circleLink) => {
      const circle = circleLink.children[0];
      if (circleLink.href.baseVal === highlightId) {
        circle.classList.add("selected");
      } else {
        circle.classList.remove("selected");
      }
    });
  }

  function incrementHighlight(increment) {
    const index = highlightsArray.findIndex((highlight) => {
      return highlight.classList.contains("selected");
    });

    let nextIndex = index + increment;

    if (nextIndex >= highlightsArray.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = highlightsArray.length - 1;
    }

    changeHighlight(highlightsArray[nextIndex].id);
  }
})("hybrid-classroom-widget");
