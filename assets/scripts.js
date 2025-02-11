document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos com data-bs-toggle="dropdown"
  document.querySelectorAll("[data-bs-toggle='dropdown']").forEach((toggle) => {
    const parent = toggle.parentElement; // Elemento pai (dropdown ou btn-group)
    const menu = parent.querySelector(".dropdown-menu");

    // Função para mostrar o dropdown
    const showDropdown = () => {
      // Verifica se a tela é maior que 992px
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;

      if (isDesktop) {
        toggle.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
        menu.classList.add("show");
        menu.setAttribute("data-bs-popper", "static");
      }
    };

    // Função para ocultar o dropdown
    const hideDropdown = () => {
      // Verifica se a tela é maior que 992px
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;

      if (isDesktop) {
        setTimeout(() => {
          if (!menu.matches(":hover") && !toggle.matches(":hover")) {
            toggle.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
            menu.classList.remove("show");
            menu.removeAttribute("data-bs-popper");
          }
        }, 100); // Pequeno delay para permitir transição suave
      }
    };

    // Eventos para o elemento pai (dropdown ou btn-group)
    parent.addEventListener("mouseenter", showDropdown);
    parent.addEventListener("mouseleave", hideDropdown);

    // Eventos para o submenu (.dropdown-menu)
    menu.addEventListener("mouseenter", showDropdown);
    menu.addEventListener("mouseleave", hideDropdown);
  });
});



// CSS VAR
cssVar = function (name, value) {
  if (name[0] != '-') name = '--' + name // --
  if (value) document.documentElement.style.setProperty(name, value)
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};


/**
 * Função genérica para monitorar a altura de um elemento e atualizar uma variável CSS.
 * @param {string} selector - O seletor do elemento a ser monitorado.
 * @param {string} cssVariable - O nome da variável CSS a ser atualizada.
 */
function observeElementHeight(selector, cssVariable) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Elemento com seletor "${selector}" não encontrado.`);
    return;
  }

  /**
   * Atualiza a variável CSS com a altura do elemento.
   */
  function updateHeight() {
    const height = `${element.offsetHeight}px`;
    cssVar(cssVariable, height);
  }

  // Inicializa o ResizeObserver para monitorar mudanças no tamanho do elemento
  const resizeObserver = new ResizeObserver(() => {
    updateHeight();
  });

  // Começa a observar o elemento
  resizeObserver.observe(element);

  // Atualiza a altura inicial imediatamente
  updateHeight();
}

// Exemplo de uso:
document.addEventListener('DOMContentLoaded', () => {
  // Monitora o header e atualiza a variável --header-height
  observeElementHeight('#header', 'header-height');

  // Você pode monitorar outros elementos também, por exemplo:
  // observeElementHeight('.sidebar', 'sidebar-height');
});