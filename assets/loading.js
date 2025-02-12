// Loading
const Loading = {
  on() {
    document.body.classList.add('loading');
  },
  off() {
    document.body.classList.remove('loading');
  }
};
Loading.off();