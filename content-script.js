(function () {
  function clickSkipButton(player) {
    const skipButton = player.querySelector(
      ".ytp-ad-skip-button-modern.ytp-button"
    );
    if (skipButton) {
      skipButton.click();
    }
  }

  function adjustVideoPlayback(player, isAdPlaying) {
    const video = player.querySelector("video");
    if (video) {
      if (isAdPlaying) {
        video.playbackRate = 16; // Speed up the video
        video.muted = true; // Mute the video
      }
    }
  }

  function observerCallback(mutations, observer) {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const player = mutation.target;
        const isAdPlaying =
          player.classList.contains("ad-showing") ||
          player.classList.contains("ad-interrupting");
        adjustVideoPlayback(player, isAdPlaying);
      }

      if (mutation.type === "childList" && mutation.addedNodes.length) {
        clickSkipButton(mutation.target);
      }
    }
  }

  function setupObserver() {
    const player = document.querySelector("#movie_player");
    if (player) {
      const observer = new MutationObserver(observerCallback);
      observer.observe(player, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      // Initial checks
      const isAdPlaying =
        player.classList.contains("ad-showing") ||
        player.classList.contains("ad-interrupting");
      adjustVideoPlayback(player, isAdPlaying);
      clickSkipButton(player);
    } else {
      setTimeout(setupObserver, 50);
    }
  }

  setupObserver();
})();
