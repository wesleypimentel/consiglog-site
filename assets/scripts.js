document.addEventListener("DOMContentLoaded", () => {
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


document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os elementos com o atributo data-bg-image
  const elements = document.querySelectorAll("[data-bg-image]");

  // Itera sobre cada elemento encontrado
  elements.forEach((element) => {
    const bgImage = element.getAttribute("data-bg-image"); // Pega o valor do atributo
    if (bgImage) {
      element.style.backgroundImage = `url('${bgImage}')`; // Aplica como background-image
    }
  });
});



// CSS VAR
const cssVar = (name, value) => {
  if (name[0] != '-') name = '--' + name // --
  if (value) document.documentElement.style.setProperty(name, value)
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};


/**
 * Monitorar a altura de um elemento e atualizar uma variável CSS.
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
    document.documentElement.style.setProperty(`--${cssVariable}`, height);
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

document.addEventListener('DOMContentLoaded', () => {
  // Monitora o header e atualiza a variável --header-height
  observeElementHeight('#header', 'header-height');

  // Você pode monitorar outros elementos também, por exemplo:
  // observeElementHeight('.sidebar', 'sidebar-height');
});




// Função para rolar a página de forma suave
const scrollToViewportHeight = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

const scrollByViewportHeight = () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

// Seleciona todos os elementos com href="#down" e id="scroll-down"
const downLinks = document.querySelectorAll('a[href="#down"]');
const scrollDownButtons = document.querySelectorAll('#scroll-down');

// Adiciona o evento de clique para os links com href="#down"
downLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link
    scrollToViewportHeight(); // Rola 1x a altura da viewport
  });
});

// Adiciona o evento de clique para os elementos com id="scroll-down"
scrollDownButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link
    scrollByViewportHeight(); // Rola a altura da viewport a partir da posição atual
  });
});


let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const htmlElement = document.documentElement;

  // Verifica se está no topo da página
  if (currentScrollY === 0) {
    htmlElement.classList.add('on-top');
    htmlElement.classList.remove('top-offset');
  } else {
    htmlElement.classList.remove('on-top');
    htmlElement.classList.add('top-offset');
  }

  // Verifica a direção do scroll (para cima ou para baixo)
  if (currentScrollY > lastScrollY) {
    // Scroll para baixo
    htmlElement.classList.add('scroll-down');
    htmlElement.classList.remove('scroll-up');
  } else if (currentScrollY < lastScrollY) {
    // Scroll para cima
    htmlElement.classList.add('scroll-up');
    htmlElement.classList.remove('scroll-down');
  }

  // Verifica se o scroll ultrapassou a altura do header
  const headerHeight = parseInt(cssVar('--header-height'), 10);
  if (currentScrollY > headerHeight) {
    htmlElement.classList.add('header-offset');
  } else {
    htmlElement.classList.remove('header-offset');
  }

  lastScrollY = currentScrollY;
};

window.addEventListener('scroll', handleScroll, { passive: true });

// Executa uma vez no carregamento para verificar o estado inicial
handleScroll();