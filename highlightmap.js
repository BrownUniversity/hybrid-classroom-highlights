(function (containerId) {
  const prefix = "hlm";
  const linksSelector = `.${prefix}-visualmap a`;
  const highlightSelector = `.${prefix}-highlights .${prefix}-highlight`;
  const buttonSelector = `.${prefix}-controls .${prefix}-`;

  const container = document.getElementById(containerId);
  const linksArray = [...container.querySelectorAll(linksSelector)];
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

  linksArray.forEach((link) => {
    const highlight = document.querySelector(link.href.baseVal);

    link.addEventListener("click", (e) => {
      event.preventDefault();

      const child = link.children[0];
      console.log(child.cx.baseVal.value + " x " + child.cy.baseVal.value);

      const highlightId = link.href.baseVal;
      const highlight = container.querySelector(`#${highlightId}`);
      if (highlight === null) return;
      highlightsArray.forEach((highlight) => {
        if (highlightId !== highlight.id)
          highlight.classList.remove("selected");
      });

      highlight.classList.add("selected");
    });
  });

  function incrementHighlight(incrment) {
    const index = highlightsArray.findIndex((highlight) => {
      return highlight.classList.contains("selected");
    });
    const nextIndex =
      index !== 0
        ? (index + incrment) % highlightsArray.length
        : highlightsArray.length - 1;

    highlightsArray[index].classList.remove("selected");
    highlightsArray[nextIndex].classList.add("selected");
  }
})("hybrid-classroom-widget");
