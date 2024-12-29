const burgerMenu = document.querySelector('.burger__menu input');
const subredditsContainer = document.querySelector('.subreddits__container');

burgerMenu.addEventListener('change', () => {
  if (burgerMenu.checked) {
    subredditsContainer.style.transform = 'translateX(0)';
  } else {
    subredditsContainer.style.transform = 'translateX(-100%)';
  }
});
